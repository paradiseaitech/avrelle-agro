import "dotenv/config";
import { getDb, schema } from "../src/db";
import { sql } from "drizzle-orm";

async function main() {
  const db = getDb();
  console.log("Checking database connection...");
  const tables = await db.execute(sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name;
  `);
  console.log("Current tables in database:", tables.rows.map(r => r.table_name));

  const admins = await db.select().from(schema.admins);
  console.log("Current admins in database:", admins.map(a => ({ id: a.id, email: a.email, role: a.role })));

  const products = await db.select().from(schema.products);
  console.log("Current products count:", products.length);

  const orders = await db.select().from(schema.orders);
  console.log("Current orders count:", orders.length);

  process.exit(0);
}

main().catch(err => {
  console.error("Error checking db:", err);
  process.exit(1);
});
