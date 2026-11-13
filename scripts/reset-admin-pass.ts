import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { getDb, schema } from "../src/db";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function main() {
  const db = getDb();
  const passwordHash = await bcrypt.hash("admin123", 12);

  await db
    .update(schema.admins)
    .set({
      passwordHash,
      mustChangePassword: false, // Set to false so they can log in immediately with admin123
    })
    .where(eq(schema.admins.email, "admin@avrelle.com"));

  console.log("Successfully set admin@avrelle.com password to admin123");
}

main().catch(console.error);
