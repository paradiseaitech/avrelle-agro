import "server-only";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";

/**
 * Master administrator secure bootstrap service.
 *
 * Requirements:
 * - Email: admin@avrelle.com
 * - Initial temporary setup password from server-side environment variable (defaults to admin123).
 * - Never stores plaintext passwords.
 * - Idempotent: Does NOT overwrite existing administrator or reset passwords.
 * - Enforces mandatory password change (mustChangePassword = true) on first login.
 */
export async function bootstrapMasterAdmin(): Promise<{ created: boolean; email: string }> {
  const db = getDb();
  const email = (process.env.ADMIN_BOOTSTRAP_EMAIL || "admin@avrelle.com").trim().toLowerCase();
  const initialPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || "admin123";
  const name = process.env.ADMIN_BOOTSTRAP_NAME || "AVRELLE Master Admin";

  const [existing] = await db
    .select({ id: schema.admins.id, email: schema.admins.email, mustChangePassword: schema.admins.mustChangePassword })
    .from(schema.admins)
    .where(eq(schema.admins.email, email))
    .limit(1);

  if (existing) {
    return { created: false, email };
  }

  const passwordHash = await bcrypt.hash(initialPassword, 12);

  await db.insert(schema.admins).values({
    email,
    name,
    passwordHash,
    role: "admin",
    mustChangePassword: true,
  });

  return { created: true, email };
}
