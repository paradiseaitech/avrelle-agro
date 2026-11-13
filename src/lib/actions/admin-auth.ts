"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import {
  clientIp,
  createAdminSession,
  destroyAdminSession,
  requireAdmin,
  verifyAdminCredentials,
} from "@/lib/auth";
import { adminLoginSchema } from "@/lib/validation";
import { createRateLimiter } from "@/lib/site";

const db = getDb();

const loginLimiter = createRateLimiter(8, 10 * 60 * 1000);

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const ip = await clientIp();
  if (!loginLimiter(ip)) {
    return { error: "Too many attempts. Please wait a few minutes and try again." };
  }

  const parsed = adminLoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email address and password." };
  }

  const admin = await verifyAdminCredentials(parsed.data.email, parsed.data.password);
  if (!admin) {
    return { error: "Invalid email or password." };
  }

  await createAdminSession(admin.id);
  if (admin.mustChangePassword) {
    redirect("/admin/change-password");
  }
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}

export interface PasswordState {
  ok?: boolean;
  error?: string;
}

export async function changePasswordAction(
  _prev: PasswordState,
  formData: FormData,
): Promise<PasswordState> {
  const admin = await requireAdmin(undefined, { allowPasswordChange: true });
  const current = String(formData.get("currentPassword") ?? "");
  const next = String(formData.get("newPassword") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

  if (!current || !next) return { error: "All password fields are required." };
  if (next.length < 8) return { error: "New password must be at least 8 characters." };
  if (next !== confirm) return { error: "New passwords do not match." };
  if (next === current) return { error: "New password must be different from the temporary one." };

  const [row] = await db
    .select({ passwordHash: schema.admins.passwordHash })
    .from(schema.admins)
    .where(eq(schema.admins.id, admin.id))
    .limit(1);

  if (!row || !(await bcrypt.compare(current, row.passwordHash))) {
    return { error: "Current password is incorrect." };
  }

  await db
    .update(schema.admins)
    .set({
      passwordHash: await bcrypt.hash(next, 12),
      mustChangePassword: false,
    })
    .where(eq(schema.admins.id, admin.id));

  return { ok: true };
}
