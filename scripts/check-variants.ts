import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { getDb, schema } from "../src/db";

async function main() {
  const db = getDb();
  const products = await db.query.products.findMany({
    with: { variants: true },
  });

  console.log(`Products: ${products.length}`);
  for (const p of products) {
    console.log(`Product: [${p.id}] ${p.name} (slug: ${p.slug}, status: ${p.status}, featured: ${p.featured}, retail: ${p.retailAvailable})`);
    for (const v of p.variants) {
      console.log(`  Variant: [${v.id}] ${v.label} - weight: ${v.weightG}g - ₹${v.pricePaise / 100} (compare: ₹${(v.compareAtPricePaise || 0) / 100}) - stock: ${v.stock} - active: ${v.active}`);
    }
  }
}

main().catch(console.error);
