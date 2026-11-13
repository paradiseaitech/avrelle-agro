import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { and, eq, gt, lt } from "drizzle-orm";
import { getDb, schema } from "@/db";

const db = getDb();

const SESSION_COOKIE = "avrelle_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

/** Roles that may change catalogue/order data. */
export const MANAGER_ROLES = ["owner", "admin"] as const;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/**
 * Constant-ish-time comparison for unknown emails: a real bcrypt hash is
 * checked so the response time does not reveal whether the account exists.
 */
const DUMMY_HASH = "$2b$12$JKrtP1BvKVeqUM5SH76C.ufgtc2nzaKBYaOCURMvrmLinm0gLlo9C";

export interface AdminIdentity {
  id: string;
  email: string;
  name: string;
  role: string;
  mustChangePassword: boolean;
}

export async function verifyAdminCredentials(
  email: string,
  password: string,
): Promise<AdminIdentity | null> {
  const normalised = email.trim().toLowerCase();
  const [admin] = await db
    .select()
    .from(schema.admins)
    .where(eq(schema.admins.email, normalised))
    .limit(1);

  if (!admin) {
    await bcrypt.compare(password, DUMMY_HASH);
    return null;
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return null;

  return {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    mustChangePassword: admin.mustChangePassword,
  };
}

export async function createAdminSession(adminId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  // House-keeping: remove this admin's expired sessions.
  await db
    .delete(schema.adminSessions)
    .where(
      and(
        eq(schema.adminSessions.adminId, adminId),
        lt(schema.adminSessions.expiresAt, new Date()),
      ),
    );

  await db.insert(schema.adminSessions).values({
    tokenHash: hashToken(token),
    adminId,
    expiresAt,
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroyAdminSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await db
      .delete(schema.adminSessions)
      .where(eq(schema.adminSessions.tokenHash, hashToken(token)));
  }
  store.delete(SESSION_COOKIE);
}

/** Reads the session cookie and returns the signed-in administrator, if any. */
export const getCurrentAdmin = cache(async (): Promise<AdminIdentity | null> => {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const [row] = await db
    .select({
      id: schema.admins.id,
      email: schema.admins.email,
      name: schema.admins.name,
      role: schema.admins.role,
      mustChangePassword: schema.admins.mustChangePassword,
    })
    .from(schema.adminSessions)
    .innerJoin(schema.admins, eq(schema.adminSessions.adminId, schema.admins.id))
    .where(
      and(
        eq(schema.adminSessions.tokenHash, hashToken(token)),
        gt(schema.adminSessions.expiresAt, new Date()),
      ),
    )
    .limit(1);

  return row ?? null;
});

import { getCurrentCustomer } from "@/lib/customer-auth";

/** Page/action guard: redirects unauthenticated visitors to the login page. */
export async function requireAdmin(
  roles?: readonly string[],
  options?: { allowPasswordChange?: boolean },
): Promise<AdminIdentity> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    const customer = await getCurrentCustomer();
    if (customer) {
      redirect("/account");
    }
    redirect("/admin/login");
  }
  if (admin.mustChangePassword && !options?.allowPasswordChange) {
    redirect("/admin/change-password");
  }
  if (roles && !roles.includes(admin.role)) {
    redirect("/admin?error=forbidden");
  }
  return admin;
}

/** Mutation guard: only owner/admin roles may write. */
export async function requireManager(): Promise<AdminIdentity> {
  return requireAdmin(MANAGER_ROLES);
}

/** Best-effort client IP for rate limiting (behind proxies). */
export async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
}
