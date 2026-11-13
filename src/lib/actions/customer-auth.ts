"use server";

import { redirect } from "next/navigation";
import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { and, desc, eq, gt } from "drizzle-orm";
import { getDb, schema } from "@/db";
import {
  createCustomerSession,
  destroyCustomerSession,
  getClientIp,
  getCurrentCustomer,
  requireCustomer,
} from "@/lib/customer-auth";
import { createAdminSession } from "@/lib/auth";
import { createRateLimiter } from "@/lib/site";
import { notifyAccountCreated, notifyPasswordReset } from "@/lib/notifications";
import { z } from "zod";

const db = getDb();

const customerLoginLimiter = createRateLimiter(10, 10 * 60 * 1000);
const signupLimiter = createRateLimiter(5, 10 * 60 * 1000);
const resetLimiter = createRateLimiter(5, 10 * 60 * 1000);

function sanitizeRedirect(url: unknown): string {
  if (typeof url !== "string") return "/account";
  const trimmed = url.trim();
  // Ensure it's an internal relative path and prevent protocol-relative redirects
  if (trimmed.startsWith("/") && !trimmed.startsWith("//") && !trimmed.startsWith("/\\")) {
    return trimmed;
  }
  return "/account";
}

export interface AuthState {
  ok?: boolean;
  error?: string;
}

const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Full name must be at least 2 characters."),
    email: z.string().trim().email("Please provide a valid email address.").toLowerCase(),
    phone: z.string().trim().optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long.")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter.")
      .regex(/[0-9]/, "Password must contain at least one number."),
    confirmPassword: z.string(),
    consent: z.literal("on", {
      message: "You must accept the terms and privacy policy to continue.",
    }),
    redirect: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export async function customerSignupAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const ip = await getClientIp();
  if (!signupLimiter(ip)) {
    return { error: "Too many registration attempts. Please wait a few minutes." };
  }

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    consent: formData.get("consent"),
    redirect: formData.get("redirect") || undefined,
  };

  const parsed = signupSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Please check your input." };
  }

  const { name, email, phone, password } = parsed.data;

  // Enforce unique email addresses
  const [existing] = await db
    .select({ id: schema.customers.id })
    .from(schema.customers)
    .where(eq(schema.customers.email, email))
    .limit(1);

  if (existing) {
    return {
      error: "An account with this email address already exists. Please sign in instead.",
    };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // Hardcode role to customer; public registration can NEVER create administrators
  const [newCustomer] = await db
    .insert(schema.customers)
    .values({
      name,
      email,
      phone: phone || null,
      passwordHash,
      role: "customer",
      emailVerified: false,
    })
    .returning({ id: schema.customers.id, email: schema.customers.email, name: schema.customers.name });

  await createCustomerSession(newCustomer.id);

  // Send transactional notification (non-blocking)
  notifyAccountCreated({ name: newCustomer.name, email: newCustomer.email }).catch((err) =>
    console.error("[signup notification error]:", err),
  );

  const dest = sanitizeRedirect(parsed.data.redirect);
  redirect(dest);
}

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address.").toLowerCase(),
  password: z.string().min(1, "Password is required."),
  redirect: z.string().optional(),
});

export async function customerLoginAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const ip = await getClientIp();
  if (!customerLoginLimiter(ip)) {
    return { error: "Too many sign-in attempts. Please wait a few minutes." };
  }

  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: formData.get("redirect") || undefined,
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid credentials." };
  }

  const { email, password } = parsed.data;

  // 1. Check if this is an administrator signing in
  const [admin] = await db
    .select()
    .from(schema.admins)
    .where(eq(schema.admins.email, email))
    .limit(1);

  if (admin) {
    const validAdmin = await bcrypt.compare(password, admin.passwordHash);
    if (validAdmin) {
      await createAdminSession(admin.id);
      if (admin.mustChangePassword) {
        redirect("/admin/change-password");
      }
      redirect("/admin");
    }
  }

  // 2. Check if this is a registered customer
  const [customer] = await db
    .select()
    .from(schema.customers)
    .where(eq(schema.customers.email, email))
    .limit(1);

  const DUMMY_HASH = "$2b$12$JKrtP1BvKVeqUM5SH76C.ufgtc2nzaKBYaOCURMvrmLinm0gLlo9C";
  if (!customer) {
    await bcrypt.compare(password, DUMMY_HASH);
    return { error: "Invalid email or password." };
  }

  const valid = await bcrypt.compare(password, customer.passwordHash);
  if (!valid) {
    return { error: "Invalid email or password." };
  }

  await createCustomerSession(customer.id);

  const dest = sanitizeRedirect(parsed.data.redirect);
  redirect(dest);
}

export async function customerLogoutAction(): Promise<void> {
  await destroyCustomerSession();
  redirect("/");
}

export async function requestPasswordResetAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const ip = await getClientIp();
  if (!resetLimiter(ip)) {
    return { error: "Too many password reset requests. Please try again later." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  const [customer] = await db
    .select({ id: schema.customers.id, email: schema.customers.email })
    .from(schema.customers)
    .where(eq(schema.customers.email, email))
    .limit(1);

  // Respond with success message even if email not found to prevent user enumeration
  if (!customer) {
    return {
      ok: true,
      error: undefined,
    };
  }

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await db.insert(schema.passwordResetTokens).values({
    email: customer.email,
    tokenHash,
    expiresAt,
    used: false,
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const resetUrl = `${baseUrl}/reset-password?token=${rawToken}&email=${encodeURIComponent(customer.email)}`;

  await notifyPasswordReset(customer.email, resetUrl);

  return { ok: true };
}

export async function resetPasswordAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const token = String(formData.get("token") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!token || !email) return { error: "Invalid or expired password reset link." };
  if (password.length < 8) return { error: "Password must be at least 8 characters long." };
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return { error: "Password must contain both letters and numbers." };
  }
  if (password !== confirmPassword) return { error: "Passwords do not match." };

  const tokenHash = createHash("sha256").update(token).digest("hex");

  const [resetRecord] = await db
    .select()
    .from(schema.passwordResetTokens)
    .where(
      and(
        eq(schema.passwordResetTokens.tokenHash, tokenHash),
        eq(schema.passwordResetTokens.email, email),
        eq(schema.passwordResetTokens.used, false),
        gt(schema.passwordResetTokens.expiresAt, new Date()),
      ),
    )
    .limit(1);

  if (!resetRecord) {
    return { error: "This password reset link is invalid or has expired. Please request a new one." };
  }

  const newHash = await bcrypt.hash(password, 12);

  await db
    .update(schema.customers)
    .set({ passwordHash: newHash })
    .where(eq(schema.customers.email, email));

  await db
    .update(schema.passwordResetTokens)
    .set({ used: true })
    .where(eq(schema.passwordResetTokens.id, resetRecord.id));

  return { ok: true };
}

export async function updateCustomerProfileAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const customer = await requireCustomer();
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!name || name.length < 2) {
    return { error: "Full name must be at least 2 characters." };
  }

  await db
    .update(schema.customers)
    .set({
      name,
      phone: phone || null,
    })
    .where(eq(schema.customers.id, customer.id));

  return { ok: true };
}

export async function saveCustomerAddressAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const customer = await requireCustomer();
  const id = formData.get("id") ? String(formData.get("id")) : undefined;
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const addressLine1 = String(formData.get("addressLine1") ?? "").trim();
  const addressLine2 = formData.get("addressLine2") ? String(formData.get("addressLine2")).trim() : null;
  const landmark = formData.get("landmark") ? String(formData.get("landmark")).trim() : null;
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const pincode = String(formData.get("pincode") ?? "").trim();
  const isDefault = formData.get("isDefault") === "on";

  if (!name || !phone || !addressLine1 || !city || !state || !pincode) {
    return { error: "Please fill in all required address fields." };
  }
  if (!/^\d{6}$/.test(pincode)) {
    return { error: "PIN code must be a 6-digit number." };
  }

  if (isDefault) {
    // Unset current default
    await db
      .update(schema.customerAddresses)
      .set({ isDefault: false })
      .where(eq(schema.customerAddresses.customerId, customer.id));
  }

  if (id) {
    // Verify ownership before updating
    const [existing] = await db
      .select({ id: schema.customerAddresses.id })
      .from(schema.customerAddresses)
      .where(
        and(
          eq(schema.customerAddresses.id, id),
          eq(schema.customerAddresses.customerId, customer.id),
        ),
      );

    if (!existing) {
      return { error: "Address not found." };
    }

    await db
      .update(schema.customerAddresses)
      .set({
        name,
        phone,
        addressLine1,
        addressLine2,
        landmark,
        city,
        state,
        pincode,
        isDefault,
      })
      .where(eq(schema.customerAddresses.id, id));
  } else {
    // Check if this is the first address; if so, make it default automatically
    const [existingCount] = await db
      .select({ id: schema.customerAddresses.id })
      .from(schema.customerAddresses)
      .where(eq(schema.customerAddresses.customerId, customer.id))
      .limit(1);

    const makeDefault = isDefault || !existingCount;

    await db.insert(schema.customerAddresses).values({
      customerId: customer.id,
      name,
      phone,
      addressLine1,
      addressLine2,
      landmark,
      city,
      state,
      pincode,
      isDefault: makeDefault,
    });
  }

  return { ok: true };
}

export async function deleteCustomerAddressAction(addressId: string): Promise<AuthState> {
  const customer = await requireCustomer();

  await db
    .delete(schema.customerAddresses)
    .where(
      and(
        eq(schema.customerAddresses.id, addressId),
        eq(schema.customerAddresses.customerId, customer.id),
      ),
    );

  return { ok: true };
}

export async function setDefaultCustomerAddressAction(addressId: string): Promise<AuthState> {
  const customer = await requireCustomer();

  await db
    .update(schema.customerAddresses)
    .set({ isDefault: false })
    .where(eq(schema.customerAddresses.customerId, customer.id));

  await db
    .update(schema.customerAddresses)
    .set({ isDefault: true })
    .where(
      and(
        eq(schema.customerAddresses.id, addressId),
        eq(schema.customerAddresses.customerId, customer.id),
      ),
    );

  return { ok: true };
}

export async function listCustomerAddresses(customerId: string) {
  return db
    .select()
    .from(schema.customerAddresses)
    .where(eq(schema.customerAddresses.customerId, customerId))
    .orderBy(desc(schema.customerAddresses.isDefault), desc(schema.customerAddresses.createdAt));
}
