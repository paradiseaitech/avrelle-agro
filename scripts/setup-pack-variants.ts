import { config } from "dotenv";
config({ path: ".env.local" });
config();

import { getDb, schema } from "../src/db";
import { eq, or } from "drizzle-orm";

async function main() {
  const db = getDb();
  console.log("Checking products and adding 100g, 200g, 400g, 500g, 1kg pack variants...");

  // Find or create the primary flagship retail product
  const products = await db.select().from(schema.products);
  console.log(`Found ${products.length} products.`);

  // Find published retail products
  let primaryProduct = products.find((p) => p.retailAvailable);
  if (!primaryProduct && products.length > 0) {
    primaryProduct = products[0];
  }

  if (!primaryProduct) {
    console.log("No products found, creating flagship retail product...");
    const [newP] = await db
      .insert(schema.products)
      .values({
        name: "AVRELLE Premium Phool Makhana",
        slug: "avrelle-premium-phool-makhana",
        tagline: "Hand-graded, 100% naturally harvested fox nuts from Purnea, Bihar.",
        description:
          "AVRELLE AGRO's signature phool makhana (fox nuts). Naturally harvested, traditionally processed, and hygienically packed in nitrogen-flushed airtight pouches. Rich in plant protein, calcium, and antioxidants.",
        status: "published",
        featured: true,
        retailAvailable: true,
        category: "retail",
        storageInstructions: "Store in an airtight container in a cool, dry place away from direct sunlight.",
        ingredients: "100% Phool Makhana (Fox Nuts / Gorgon Nuts)",
      })
      .returning();
    primaryProduct = newP;
  }

  // Define the 5 requested pack sizes
  const requiredPacks = [
    {
      label: "100 g",
      weightG: 100,
      pricePaise: 14900, // ₹149
      compareAtPricePaise: 19900, // ₹199 (save 25%)
      stock: 120,
      lowStockThreshold: 15,
      skuSuffix: "100G",
      sortOrder: 1,
    },
    {
      label: "200 g",
      weightG: 200,
      pricePaise: 26900, // ₹269
      compareAtPricePaise: 34900, // ₹349 (save 23%)
      stock: 100,
      lowStockThreshold: 15,
      skuSuffix: "200G",
      sortOrder: 2,
    },
    {
      label: "400 g",
      weightG: 400,
      pricePaise: 49900, // ₹499
      compareAtPricePaise: 64900, // ₹649 (save 23%)
      stock: 80,
      lowStockThreshold: 10,
      skuSuffix: "400G",
      sortOrder: 3,
    },
    {
      label: "500 g",
      weightG: 500,
      pricePaise: 59900, // ₹599
      compareAtPricePaise: 79900, // ₹799 (save 25%)
      stock: 75,
      lowStockThreshold: 10,
      skuSuffix: "500G",
      sortOrder: 4,
    },
    {
      label: "1 kg",
      weightG: 1000,
      pricePaise: 114900, // ₹1,149
      compareAtPricePaise: 149900, // ₹1,499 (save 23%)
      stock: 50,
      lowStockThreshold: 8,
      skuSuffix: "1KG",
      sortOrder: 5,
    },
  ];

  for (const pack of requiredPacks) {
    // Check if variant already exists for this product and weight
    const [existing] = await db
      .select()
      .from(schema.productVariants)
      .where(
        eq(schema.productVariants.productId, primaryProduct.id) &&
          eq(schema.productVariants.weightG, pack.weightG),
      )
      .limit(1);

    const sku = `AVR-PK-${pack.skuSuffix}`;

    if (existing) {
      await db
        .update(schema.productVariants)
        .set({
          label: pack.label,
          pricePaise: pack.pricePaise,
          compareAtPricePaise: pack.compareAtPricePaise,
          stock: existing.stock < 10 ? pack.stock : existing.stock,
          active: true,
          sortOrder: pack.sortOrder,
        })
        .where(eq(schema.productVariants.id, existing.id));
      console.log(`Updated variant ${pack.label} (ID: ${existing.id})`);
    } else {
      const [inserted] = await db
        .insert(schema.productVariants)
        .values({
          productId: primaryProduct.id,
          sku,
          label: pack.label,
          weightG: pack.weightG,
          pricePaise: pack.pricePaise,
          compareAtPricePaise: pack.compareAtPricePaise,
          stock: pack.stock,
          lowStockThreshold: pack.lowStockThreshold,
          active: true,
          sortOrder: pack.sortOrder,
        })
        .returning();
      console.log(`Inserted new pack variant ${pack.label} (ID: ${inserted.id})`);
    }
  }

  console.log("Successfully ensured 100g, 200g, 400g, 500g, 1kg pack variants!");
}

main().catch(console.error);
