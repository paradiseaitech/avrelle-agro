import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { getDb, schema } from "../src/db";
import bcrypt from "bcryptjs";

async function main() {
  const db = getDb();
  const admins = await db
    .select({
      id: schema.admins.id,
      email: schema.admins.email,
      role: schema.admins.role,
      mustChangePassword: schema.admins.mustChangePassword,
      hash: schema.admins.passwordHash,
    })
    .from(schema.admins);

  for (const a of admins) {
    const is123 = await bcrypt.compare("admin123", a.hash);
    const is2026 = await bcrypt.compare("Admin@Avrelle2026!", a.hash);
    const isSeed = await bcrypt.compare("change-me-before-going-live", a.hash);
    console.log(a.email, {
      role: a.role,
      mustChangePassword: a.mustChangePassword,
      is123,
      is2026,
      isSeed,
    });
  }
}

main().catch(console.error);
