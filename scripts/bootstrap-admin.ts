import "dotenv/config";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb, schema } from "../src/db";

async function main() {
  const db = getDb();
  const email = (process.env.ADMIN_BOOTSTRAP_EMAIL || "admin@avrelle.com").trim().toLowerCase();
  const initialPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD || "admin123";
  const name = process.env.ADMIN_BOOTSTRAP_NAME || "AVRELLE Master Admin";

  console.log(`Checking bootstrap status for master administrator: ${email}...`);

  const [existing] = await db
    .select({
      id: schema.admins.id,
      email: schema.admins.email,
      role: schema.admins.role,
      mustChangePassword: schema.admins.mustChangePassword,
    })
    .from(schema.admins)
    .where(eq(schema.admins.email, email))
    .limit(1);

  if (existing) {
    console.log(`Master administrator ${email} already exists (ID: ${existing.id}, role: ${existing.role}, mustChangePassword: ${existing.mustChangePassword}). Preserving existing account without changes.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(initialPassword, 12);

  const [created] = await db
    .insert(schema.admins)
    .values({
      email,
      name,
      passwordHash,
      role: "admin",
      mustChangePassword: true,
    })
    .returning({ id: schema.admins.id, email: schema.admins.email, role: schema.admins.role });

  console.log(`Successfully bootstrapped master administrator: ${created.email} (ID: ${created.id}, role: ${created.role}, mustChangePassword: true).`);
  console.log("Initial password has been hashed with bcrypt and must be changed upon first login before accessing the dashboard.");
  process.exit(0);
}

main().catch(err => {
  console.error("Master admin bootstrap failed:", err);
  process.exit(1);
});
