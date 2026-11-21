import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { getDb, schema } from "../src/db";
import { eq } from "drizzle-orm";

async function main() {
  const db = getDb();
  console.log("Updating retail makhana prices in database: Rs 179 / 100g base rate...");

  // New pricing mapping by weight
  const priceMap: Record<number, { pricePaise: number; compareAtPricePaise: number }> = {
    100: { pricePaise: 17900, compareAtPricePaise: 22900 },
    200: { pricePaise: 32900, compareAtPricePaise: 42900 },
    400: { pricePaise: 59900, compareAtPricePaise: 77900 },
    500: { pricePaise: 71900, compareAtPricePaise: 94900 },
    1000: { pricePaise: 137900, compareAtPricePaise: 179900 },
  };

  const variants = await db.select().from(schema.productVariants);
  console.log(`Found ${variants.length} total variants across all products.`);

  let updatedCount = 0;
  for (const v of variants) {
    if (!v.weightG) continue;
    const target = priceMap[v.weightG];
    if (target) {
      await db
        .update(schema.productVariants)
        .set({
          pricePaise: target.pricePaise,
          compareAtPricePaise: target.compareAtPricePaise,
        })
        .where(eq(schema.productVariants.id, v.id));
      console.log(`Updated variant [${v.id}] (${v.label}, ${v.weightG}g): ₹${target.pricePaise / 100}`);
      updatedCount++;
    }
  }

  console.log(`Successfully updated ${updatedCount} product variants in database!`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error updating retail prices:", err);
    process.exit(1);
  });
