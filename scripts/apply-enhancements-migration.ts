import "dotenv/config";
import { getDb } from "../src/db";
import { sql } from "drizzle-orm";

async function main() {
  const db = getDb();
  console.log("Applying schema enhancements safely...");

  await db.execute(sql`
    ALTER TABLE "admins" ADD COLUMN IF NOT EXISTS "must_change_password" boolean DEFAULT false NOT NULL;
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "customers" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "name" text NOT NULL,
      "email" text NOT NULL UNIQUE,
      "phone" text,
      "password_hash" text NOT NULL,
      "role" text DEFAULT 'customer' NOT NULL,
      "email_verified" boolean DEFAULT false NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "customer_sessions" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "token_hash" text NOT NULL UNIQUE,
      "customer_id" uuid NOT NULL REFERENCES "customers"("id") ON DELETE CASCADE,
      "expires_at" timestamp with time zone NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "customer_addresses" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "customer_id" uuid NOT NULL REFERENCES "customers"("id") ON DELETE CASCADE,
      "name" text NOT NULL,
      "phone" text NOT NULL,
      "address_line1" text NOT NULL,
      "address_line2" text,
      "landmark" text,
      "city" text NOT NULL,
      "state" text NOT NULL,
      "pincode" text NOT NULL,
      "is_default" boolean DEFAULT false NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "password_reset_tokens" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "email" text NOT NULL,
      "token_hash" text NOT NULL UNIQUE,
      "expires_at" timestamp with time zone NOT NULL,
      "used" boolean DEFAULT false NOT NULL,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `);

  await db.execute(sql`
    ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "category" text DEFAULT 'Makhana' NOT NULL;
    ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "makhana_grade" text;
    ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "seo_title" text;
    ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "seo_description" text;
  `);

  await db.execute(sql`
    ALTER TABLE "product_variants" ADD COLUMN IF NOT EXISTS "low_stock_threshold" integer DEFAULT 10 NOT NULL;
  `);

  await db.execute(sql`
    ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "customer_id" uuid REFERENCES "customers"("id") ON DELETE SET NULL;
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "stock_adjustments" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "variant_id" uuid NOT NULL REFERENCES "product_variants"("id") ON DELETE CASCADE,
      "product_id" uuid REFERENCES "products"("id") ON DELETE SET NULL,
      "change_qty" integer NOT NULL,
      "previous_qty" integer NOT NULL,
      "new_qty" integer NOT NULL,
      "reason" text NOT NULL,
      "notes" text,
      "reference" text,
      "adjusted_by" text,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "customers_email_idx" ON "customers" ("email");
    CREATE INDEX IF NOT EXISTS "customer_sessions_customer_idx" ON "customer_sessions" ("customer_id");
    CREATE INDEX IF NOT EXISTS "customer_addresses_customer_idx" ON "customer_addresses" ("customer_id");
    CREATE INDEX IF NOT EXISTS "password_reset_email_idx" ON "password_reset_tokens" ("email");
    CREATE INDEX IF NOT EXISTS "orders_customer_idx" ON "orders" ("customer_id");
    CREATE INDEX IF NOT EXISTS "stock_adj_variant_idx" ON "stock_adjustments" ("variant_id");
    CREATE INDEX IF NOT EXISTS "stock_adj_created_idx" ON "stock_adjustments" ("created_at");
  `);

  console.log("Safe migration completed successfully!");
  process.exit(0);
}

main().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
