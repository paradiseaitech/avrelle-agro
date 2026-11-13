import path from "node:path";
import type { PoolConfig } from "pg";
import { Pool } from "pg";
import { PGlite } from "@electric-sql/pglite";
import { drizzle as drizzleNodePg, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle as drizzlePglite } from "drizzle-orm/pglite";
import * as schema from "./schema";

/**
 * Database access for the whole application.
 *
 * - When `DATABASE_URL` is set (development against Supabase, or production
 *   Postgres), node-postgres is used with a pooled connection.
 * - Otherwise a zero-install embedded PostgreSQL (PGlite) is used so the
 *   full application runs locally without any external services.
 */

/**
 * Both adapters expose the same Drizzle query builder API for the operations
 * this application uses. We type against the node-postgres adapter so call
 * signatures (e.g. `.returning({...})`, transactions) stay consistent, and
 * cast the PGlite adapter at the boundary.
 */
export type AppDatabase = NodePgDatabase<typeof schema>;

type GlobalWithDb = typeof globalThis & {
  __avrellePool?: Pool;
  __avrellePgDb?: NodePgDatabase<typeof schema>;
  __avrellePglite?: PGlite;
  __avrellePgliteDb?: AppDatabase;
};

const g = globalThis as GlobalWithDb;

function createPgPool(): Pool {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  const isSupabaseHost = /supabase/i.test(new URL(url).hostname);
  const config: PoolConfig & { prepare?: boolean } = {
    connectionString: url,
    max: 10,
    // Transaction-mode poolers (Supabase pgbouncer) do not support prepared statements.
    prepare: false,
    ssl: isSupabaseHost ? { rejectUnauthorized: false } : undefined,
    connectionTimeoutMillis: 20_000,
    idleTimeoutMillis: 30_000,
  };
  return new Pool(config);
}

export function getDb(): AppDatabase {
  if (process.env.DATABASE_URL) {
    if (!g.__avrellePgDb) {
      g.__avrellePool = createPgPool();
      g.__avrellePgDb = drizzleNodePg(g.__avrellePool, { schema });
    }
    return g.__avrellePgDb;
  }

  if (!g.__avrellePgliteDb) {
    const dir = path.join(process.cwd(), ".data", "pglite");
    g.__avrellePglite = new PGlite(dir);
    g.__avrellePgliteDb = drizzlePglite(g.__avrellePglite, {
      schema,
    }) as unknown as AppDatabase;
  }
  return g.__avrellePgliteDb;
}

export { schema };
