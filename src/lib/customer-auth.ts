import "server-only";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { and, eq, gt, lt } from "drizzle-orm";
import { getDb, schema } from "@/db";

const db = getDb();

export const CUSTOMER_SESSION_COOKIE = "avrelle_customer_session";
export const CUSTOMER_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export interface CustomerIdentity {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: string;
  emailVerified: boolean;
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

const DUMMY_HASH = "$2b$12$JKrtP1BvKVeqUM5SH76C.ufgtc2nzaKBYaOCURMvrmLinm0gLlo9C";

export async function verifyCustomerCredentials(
  email: string,
  password: string,
): Promise<CustomerIdentity | null> {
  const normalised = email.trim().toLowerCase();
  const [customer] = await db
    .select()
    .from(schema.customers)
    .where(eq(schema.customers.email, normalised))
    .limit(1);

  if (!customer) {
    await bcrypt.compare(password, DUMMY_HASH);
    return null;
  }

  const valid = await bcrypt.compare(password, customer.passwordHash);
  if (!valid) return null;

  return {
    id: customer.id,
    email: customer.email,
    name: customer.name,
    phone: customer.phone,
    role: customer.role,
    emailVerified: customer.emailVerified,
  };
}

export async function createCustomerSession(customerId: string): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + CUSTOMER_SESSION_TTL_MS);

  // Clean up customer's expired sessions
  await db
    .delete(schema.customerSessions)
    .where(
      and(
        eq(schema.customerSessions.customerId, customerId),
        lt(schema.customerSessions.expiresAt, new Date()),
      ),
    );

  await db.insert(schema.customerSessions).values({
    tokenHash: hashToken(token),
    customerId,
    expiresAt,
  });

  const store = await cookies();
  store.set(CUSTOMER_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  return token;
}

export async function destroyCustomerSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(CUSTOMER_SESSION_COOKIE)?.value;
  if (token) {
    await db
      .delete(schema.customerSessions)
      .where(eq(schema.customerSessions.tokenHash, hashToken(token)));
  }
  store.delete(CUSTOMER_SESSION_COOKIE);
}

/** Reads the customer session cookie and returns the authenticated customer, if any. */
export const getCurrentCustomer = cache(async (): Promise<CustomerIdentity | null> => {
  const store = await cookies();
  const token = store.get(CUSTOMER_SESSION_COOKIE)?.value;
  if (!token) return null;

  const [row] = await db
    .select({
      id: schema.customers.id,
      email: schema.customers.email,
      name: schema.customers.name,
      phone: schema.customers.phone,
      role: schema.customers.role,
      emailVerified: schema.customers.emailVerified,
    })
    .from(schema.customerSessions)
    .innerJoin(schema.customers, eq(schema.customerSessions.customerId, schema.customers.id))
    .where(
      and(
        eq(schema.customerSessions.tokenHash, hashToken(token)),
        gt(schema.customerSessions.expiresAt, new Date()),
      ),
    )
    .limit(1);

  return row ?? null;
});

/** Guard: requires customer authentication or redirects to login. */
export async function requireCustomer(redirectUrl = "/account"): Promise<CustomerIdentity> {
  const customer = await getCurrentCustomer();
  if (!customer) {
    const encoded = encodeURIComponent(redirectUrl);
    redirect(`/login?redirect=${encoded}`);
  }
  return customer;
}

/** Best-effort client IP for rate limiting. */
export async function getClientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
}
