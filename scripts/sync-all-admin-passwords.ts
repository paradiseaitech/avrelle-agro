import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { getDb, schema } from "../src/db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function main() {
  const db = getDb();
  const passwordHash = await bcrypt.hash("admin123", 12);

  // 1. Update all admins to admin123
  await db
    .update(schema.admins)
    .set({
      passwordHash,
      mustChangePassword: false,
    });

  console.log("Updated all admin accounts to password 'admin123'");

  // 2. Also ensure a customer account exists for admin@avrelle.com with admin123
  const [existingCustomer] = await db
    .select({ id: schema.customers.id })
    .from(schema.customers)
    .where(eq(schema.customers.email, "admin@avrelle.com"))
    .limit(1);

  if (existingCustomer) {
    await db
      .update(schema.customers)
      .set({ passwordHash })
      .where(eq(schema.customers.id, existingCustomer.id));
    console.log("Updated customer account for admin@avrelle.com");
  } else {
    await db.insert(schema.customers).values({
      email: "admin@avrelle.com",
      name: "AVRELLE Admin",
      passwordHash,
      role: "customer",
      emailVerified: true,
    });
    console.log("Created customer account for admin@avrelle.com");
  }
}

main().catch(console.error);
