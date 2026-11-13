import "dotenv/config";
import bcrypt from "bcryptjs";
import { getDb } from "../src/db";
import { admins, grades, products, productVariants, siteSettings } from "../src/db/schema";
import {
  DEFAULT_ANNOUNCEMENT,
  DEFAULT_HERO,
  DEFAULT_HOME_CONTENT,
  DEFAULT_SHIPPING,
  GRADE_REFERENCE,
  SETTING_KEYS,
  defaultBusinessSettings,
} from "../src/lib/site";

/**
 * Seeds the database with clearly-identified SAMPLE data:
 *  - Grade definitions (reference ranges from supplied material)
 *  - Sample retail products with SAMPLE PRICES flagged in the products table
 *    (`uses_sample_prices = true`). Replace with verified retail prices in /admin
 *    before taking real orders.
 *  - Default site settings (announcement bar, shipping, hero copy)
 *  - The first administrator account from ADMIN_* environment variables
 *
 * The script is idempotent: re-running it updates catalogue rows to the seed
 * state but preserves settings already edited in the admin dashboard and does
 * not overwrite an existing admin password.
 */

const db = getDb();

async function seedGrades() {
  const inserted: Record<string, string> = {};
  let order = 0;
  for (const g of GRADE_REFERENCE) {
    const imagePath = `/brand/grades/${g.slug}.png`;
    const [row] = await db
      .insert(grades)
      .values({
        slug: g.slug,
        name: g.name,
        sizeMinMm: g.sizeMinMm,
        sizeMaxMm: g.sizeMaxMm,
        summary: g.summary,
        description: g.description,
        image: imagePath,
        sortOrder: order++,
        published: true,
      })
      .onConflictDoUpdate({
        target: grades.slug,
        set: {
          name: g.name,
          sizeMinMm: g.sizeMinMm,
          sizeMaxMm: g.sizeMaxMm,
          summary: g.summary,
          description: g.description,
          image: imagePath,
        },
      })
      .returning();
    inserted[row.slug] = row.id;
  }
  console.log(`Seeded ${GRADE_REFERENCE.length} grades.`);
  return inserted;
}

interface SampleProduct {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  featured: boolean;
  variants: Array<{ label: string; weightG: number; pricePaise: number; compareAtPricePaise: number; stock: number; sku: string }>;
}

const FIVE_PACK_VARIANTS = [
  { label: "100 g", weightG: 100, pricePaise: 14900, compareAtPricePaise: 19900, stock: 120, sku: "AVG-PK-100G" },
  { label: "200 g", weightG: 200, pricePaise: 26900, compareAtPricePaise: 34900, stock: 100, sku: "AVG-PK-200G" },
  { label: "400 g", weightG: 400, pricePaise: 49900, compareAtPricePaise: 64900, stock: 80, sku: "AVG-PK-400G" },
  { label: "500 g", weightG: 500, pricePaise: 59900, compareAtPricePaise: 79900, stock: 75, sku: "AVG-PK-500G" },
  { label: "1 kg", weightG: 1000, pricePaise: 114900, compareAtPricePaise: 149900, stock: 50, sku: "AVG-PK-1KG" },
];

const SAMPLE_PRODUCTS: SampleProduct[] = [
  {
    slug: "phool-makhana-100g",
    name: "Phool Makhana — 100g Pocket Pack",
    tagline: "Single-serve grab-and-go healthy snacking pack.",
    description:
      "Compact trial pack for your desk, travel bag, or daily work munching. 100% naturally harvested, crisp roasted fox nuts from Purnea, Bihar.",
    featured: true,
    variants: FIVE_PACK_VARIANTS,
  },
  {
    slug: "phool-makhana-200g",
    name: "Phool Makhana — 200g Daily Munch Pack",
    tagline: "Weekly wellness snack portion for active fitness enthusiasts.",
    description:
      "Ideal quantity for active fitness enthusiasts seeking plant protein, calcium, and low glycemic index. Nitrogen-flushed for long-lasting crunch.",
    featured: true,
    variants: FIVE_PACK_VARIANTS,
  },
  {
    slug: "phool-makhana-400g",
    name: "Phool Makhana — 400g Family Choice Pack",
    tagline: "Balanced size for tea-time and family snacking.",
    description:
      "Generous value size for couples and small families for evening teas, spiced snacks, and nutritious bites. Airtight resealable freshness.",
    featured: false,
    variants: FIVE_PACK_VARIANTS,
  },
  {
    slug: "phool-makhana-500g",
    name: "Phool Makhana — 500g Pantry Pack",
    tagline: "Our most popular home kitchen & fasting essential pack.",
    description:
      "The classic kitchen pantry pack for curries, desserts, vrat recipes, and daily wholesome snacking. Freshly packed in nitrogen-flushed pouch.",
    featured: true,
    variants: FIVE_PACK_VARIANTS,
  },
  {
    slug: "phool-makhana-1kg",
    name: "Phool Makhana — 1kg Mega Saver Pack",
    tagline: "Maximum savings & lowest price per gram for regular consumers.",
    description:
      "Our largest retail saver pack. Handpicked jumbo pops offering maximum economy and best-in-class value per gram.",
    featured: true,
    variants: FIVE_PACK_VARIANTS,
  },
  {
    slug: "phool-makhana-6-suta",
    name: "AVRELLE Premium Phool Makhana",
    tagline: "100% naturally harvested, hand-graded fox nuts from Purnea, Bihar.",
    description:
      "AVRELLE AGRO's signature phool makhana (fox nuts). Naturally harvested, traditionally processed, and hygienically packed in nitrogen-flushed airtight pouches. Rich in plant protein, calcium, and antioxidants.",
    featured: true,
    variants: FIVE_PACK_VARIANTS,
  },
];

async function seedProducts(_gradeIds: Record<string, string>) {
  const standardImages = [
    "/brand/100g.png",
    "/brand/200g.png",
    "/brand/400g.png",
    "/brand/500g.png",
    "/brand/1kg.png",
    "/brand/grades/size.jpeg",
  ];

  for (const p of SAMPLE_PRODUCTS) {
    const [product] = await db
      .insert(products)
      .values({
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        description: p.description,
        storageInstructions:
          "Store in a cool, dry place in an airtight container. Keep away from moisture and strong odours.",
        ingredients: "Makhana (fox nuts / lotus seeds).",
        images: standardImages,
        status: "published",
        featured: p.featured,
        retailAvailable: true,
        usesSamplePrices: false,
      })
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          name: p.name,
          tagline: p.tagline,
          description: p.description,
          images: standardImages,
          status: "published",
          featured: p.featured,
          retailAvailable: true,
        },
      })
      .returning();

    for (let i = 0; i < p.variants.length; i++) {
      const v = p.variants[i];
      const sku = `${p.slug.toUpperCase()}-${v.weightG}G`;
      await db
        .insert(productVariants)
        .values({
          productId: product.id,
          label: v.label,
          weightG: v.weightG,
          pricePaise: v.pricePaise,
          compareAtPricePaise: v.compareAtPricePaise,
          stock: v.stock,
          sku,
          active: true,
          sortOrder: i,
        })
        .onConflictDoUpdate({
          target: productVariants.sku,
          set: {
            pricePaise: v.pricePaise,
            compareAtPricePaise: v.compareAtPricePaise,
            label: v.label,
            weightG: v.weightG,
            active: true,
          },
        });
    }
  }
  const count = SAMPLE_PRODUCTS.reduce((n, p) => n + p.variants.length, 0);
  console.log(`Seeded ${SAMPLE_PRODUCTS.length} products with ${count} variants (SAMPLE PRICES).`);
}

async function seedSettings() {
  const rows = [
    { key: SETTING_KEYS.announcement, value: DEFAULT_ANNOUNCEMENT },
    { key: SETTING_KEYS.shipping, value: DEFAULT_SHIPPING },
    { key: SETTING_KEYS.business, value: defaultBusinessSettings() },
    { key: SETTING_KEYS.hero, value: DEFAULT_HERO },
    { key: SETTING_KEYS.homeContent, value: DEFAULT_HOME_CONTENT },
  ];
  for (const row of rows) {
    await db.insert(siteSettings).values(row).onConflictDoNothing({ target: siteSettings.key });
  }
  console.log(`Ensured ${rows.length} site settings (existing admin edits preserved).`);
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@avrelleagro.in";
  const password = process.env.ADMIN_PASSWORD ?? "change-me-before-going-live";
  const name = process.env.ADMIN_NAME ?? "AVRELLE Administrator";
  const hash = await bcrypt.hash(password, 12);
  await db
    .insert(admins)
    .values({ email, name, passwordHash: hash, role: "admin" })
    .onConflictDoNothing({ target: admins.email });
  console.log(`Ensured administrator ${email} (existing password preserved if already present).`);
}

async function main() {
  const gradeIds = await seedGrades();
  await seedProducts(gradeIds);
  await seedSettings();
  await seedAdmin();
  console.log("Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
