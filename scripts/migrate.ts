import "dotenv/config";
import path from "node:path";
import type { PoolConfig } from "pg";

/**
 * Applies SQL migrations from ./drizzle to the configured database.
 * Uses Supabase/Postgres when DATABASE_URL is set, otherwise the local
 * embedded PGlite instance.
 */
async function main() {
  const migrationsFolder = path.join(process.cwd(), "drizzle");

  if (process.env.DATABASE_URL) {
    const { Pool } = await import("pg");
    const { drizzle } = await import("drizzle-orm/node-postgres");
    const { migrate } = await import("drizzle-orm/node-postgres/migrator");
    const isSupabase = /supabase/i.test(new URL(process.env.DATABASE_URL).hostname);
    const poolConfig: PoolConfig & { prepare?: boolean } = {
      connectionString: process.env.DATABASE_URL,
      prepare: false,
      ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
      connectionTimeoutMillis: 20_000,
    };
    const pool = new Pool(poolConfig);
    const db = drizzle(pool);
    await migrate(db, { migrationsFolder });
    await pool.end();
    console.log("Migrations applied to DATABASE_URL database.");
  } else {
    const { PGlite } = await import("@electric-sql/pglite");
    const { drizzle } = await import("drizzle-orm/pglite");
    const { migrate } = await import("drizzle-orm/pglite/migrator");
    const client = new PGlite(path.join(process.cwd(), ".data", "pglite"));
    const db = drizzle(client);
    await migrate(db, { migrationsFolder });
    await client.close();
    console.log("Migrations applied to local PGlite database.");
  }
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
