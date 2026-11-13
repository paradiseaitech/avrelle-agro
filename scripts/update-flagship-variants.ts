import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { getDb, schema } from "../src/db";
import { eq } from "drizzle-orm";

async function main() {
  const db = getDb();
  
  // Update 500g variant on product 0762ae61-3f8f-4c4f-8238-7314e378182c
  await db
    .update(schema.productVariants)
    .set({
      pricePaise: 59900,
      compareAtPricePaise: 79900,
    })
    .where(eq(schema.productVariants.id, "70b7cae0-a494-4d42-8aef-b4a64c24c0b5"));

  // Update 1kg variant on product 0762ae61-3f8f-4c4f-8238-7314e378182c
  await db
    .update(schema.productVariants)
    .set({
      pricePaise: 114900,
      compareAtPricePaise: 149900,
    })
    .where(eq(schema.productVariants.id, "d0fc9c3e-8dd3-488c-8421-4633504fd5a7"));

  console.log("Updated 500g and 1kg variants on primary product!");
}

main().catch(console.error);
