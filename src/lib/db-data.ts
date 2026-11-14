import "server-only";
import { and, eq } from "drizzle-orm";
import { cache } from "react";
import { getDb, schema } from "@/db";
import {
  DEFAULT_ANNOUNCEMENT,
  DEFAULT_HERO,
  DEFAULT_HOME_CONTENT,
  DEFAULT_SHIPPING,
  SETTING_KEYS,
  defaultBusinessSettings,
  type AnnouncementSettings,
  type BusinessSettings,
  type HeroSettings,
  type HomeContentSettings,
  type ShippingSettings,
} from "@/lib/site";

const db = getDb();

/* --------------------------------------------------------------- settings */

export interface PincodeResult {
  pincode: string;
  serviceable: boolean;
  shippingPaise: number | null;
  estDaysMin: number | null;
  estDaysMax: number | null;
  codAvailable: boolean;
}

export const getSettings = cache(async () => {
  try {
    const rows = await db.select().from(schema.siteSettings);
    const map = new Map(rows.map((r) => [r.key, r.value]));

    const announcement = {
      ...DEFAULT_ANNOUNCEMENT,
      ...(map.get(SETTING_KEYS.announcement) as Partial<AnnouncementSettings> | undefined),
    };
    const shipping = {
      ...DEFAULT_SHIPPING,
      ...(map.get(SETTING_KEYS.shipping) as Partial<ShippingSettings> | undefined),
    };
    const business = {
      ...defaultBusinessSettings(),
      ...(map.get(SETTING_KEYS.business) as Partial<BusinessSettings> | undefined),
    };
    const hero = {
      ...DEFAULT_HERO,
      ...(map.get(SETTING_KEYS.hero) as Partial<HeroSettings> | undefined),
    };
    const homeContent = {
      ...DEFAULT_HOME_CONTENT,
      ...(map.get(SETTING_KEYS.homeContent) as Partial<HomeContentSettings> | undefined),
    };

    return { announcement, shipping, business, hero, homeContent };
  } catch (err) {
    console.warn("getSettings fallback to defaults:", err);
    return {
      announcement: DEFAULT_ANNOUNCEMENT,
      shipping: DEFAULT_SHIPPING,
      business: defaultBusinessSettings(),
      hero: DEFAULT_HERO,
      homeContent: DEFAULT_HOME_CONTENT,
    };
  }
});

/* ----------------------------------------------------------------- grades */

export const listPublishedGrades = cache(async () => {
  try {
    return await db
      .select()
      .from(schema.grades)
      .where(eq(schema.grades.published, true))
      .orderBy(schema.grades.sortOrder);
  } catch {
    return [];
  }
});

export const getGradeBySlug = cache(async (slug: string) => {
  try {
    const [row] = await db
      .select()
      .from(schema.grades)
      .where(and(eq(schema.grades.slug, slug), eq(schema.grades.published, true)));
    return row ?? null;
  } catch {
    return null;
  }
});

/* --------------------------------------------------------------- products */

export interface ProductVariantItem {
  id: string;
  label: string;
  weightG?: number | null;
  pricePaise: number;
  compareAtPricePaise: number | null;
  stock: number;
  active: boolean;
  sku: string | null;
  image?: string;
}

export interface ProductListItem {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  image: string | null;
  gradeId: string | null;
  gradeName: string | null;
  gradeSlug: string | null;
  featured: boolean;
  retailAvailable: boolean;
  usesSamplePrices: boolean;
  minPricePaise: number | null;
  maxPricePaise: number | null;
  totalStock: number;
  variants: ProductVariantItem[];
}

/**
 * Maps a pack size/weight to its respective packaging PNG in /brand/.
 * Matches filenames: 100g.png, 200g.png, 400g.png, 500g.png, 1kg.png.
 */
export function getVariantPackagingImage(
  _gradeSlug: string | null | undefined,
  label: string,
  weightG?: number | null,
): string {
  if (weightG === 100 || /100\s*g/i.test(label)) {
    return "/brand/100g.png";
  }
  if (weightG === 200 || /200\s*g/i.test(label)) {
    return "/brand/200g.png";
  }
  if (weightG === 400 || /400\s*g/i.test(label)) {
    return "/brand/400g.png";
  }
  if (weightG === 500 || /500\s*g/i.test(label)) {
    return "/brand/500g.png";
  }
  if (weightG === 1000 || /1\s*kg/i.test(label) || /1000/i.test(label)) {
    return "/brand/1kg.png";
  }
  return "/brand/500g.png";
}

async function fetchProductRows() {
  try {
    return await db.query.products.findMany({
      where: and(eq(schema.products.status, "published"), eq(schema.products.retailAvailable, true)),
      with: { variants: true, grade: true },
    });
  } catch {
    return [];
  }
}

function toListItem(p: {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  images: string[];
  featured: boolean;
  retailAvailable: boolean;
  usesSamplePrices: boolean;
  gradeId: string | null;
  grade: { name: string; slug: string } | null;
  variants: schema.ProductVariant[];
}): ProductListItem {
  // Clean product name to remove any internal suta grading from retail purchasing
  const cleanName = p.name
    .replace(/\s*—\s*[0-9+]+.*Suta/gi, "")
    .replace(/\s*[0-9+]+.*Suta/gi, "")
    .trim() || "AVRELLE Premium Phool Makhana";

  // Filter only the 5 standard retail pack variants (100g, 200g, 400g, 500g, 1kg)
  const active: ProductVariantItem[] = p.variants
    .filter((v) => v.active && v.weightG !== 250 && !/250/i.test(v.label))
    .sort((a, b) => (a.weightG ?? a.sortOrder) - (b.weightG ?? b.sortOrder))
    .map((v) => ({
      id: v.id,
      label: v.label,
      weightG: v.weightG,
      pricePaise: v.pricePaise,
      compareAtPricePaise: v.compareAtPricePaise,
      stock: v.stock,
      active: v.active,
      sku: v.sku,
      image: getVariantPackagingImage(null, v.label, v.weightG),
    }));

  const prices = active.map((v) => v.pricePaise);

  // Default to 500g (most popular) or first active variant
  const defaultVariant =
    active.find((v) => v.weightG === 500 || /500/i.test(v.label)) ??
    active[0];

  const primaryImage =
    defaultVariant?.image ??
    (p.images.length && !p.images[0].includes("pack-mockup") ? p.images[0] : null) ??
    "/brand/500g.png";

  return {
    id: p.id,
    slug: p.slug,
    name: cleanName,
    tagline: p.tagline?.replace(/[0-9+]+.*Suta/gi, "Premium Hand-graded") ?? "100% naturally harvested fox nuts from Purnea, Bihar.",
    image: primaryImage,
    gradeId: p.gradeId,
    gradeName: null,
    gradeSlug: null,
    featured: p.featured,
    retailAvailable: p.retailAvailable,
    usesSamplePrices: p.usesSamplePrices,
    minPricePaise: prices.length ? Math.min(...prices) : null,
    maxPricePaise: prices.length ? Math.max(...prices) : null,
    totalStock: active.reduce((n, v) => n + v.stock, 0),
    variants: active,
  };
}

export interface ShopFilters {
  packWeight?: number;
  gradeSlug?: string;
  q?: string;
  sort?: "featured" | "price-asc" | "price-desc" | "newest";
}

export async function listPublishedProducts(filters: ShopFilters = {}): Promise<ProductListItem[]> {
  const rows = await fetchProductRows();
  let items = rows.map(toListItem);

  // If filtered by grade, show products linked to this grade if any, or return all retail products
  if (filters.gradeSlug) {
    const matching = items.filter((p) => {
      const row = rows.find((r) => r.id === p.id);
      return row?.grade?.slug === filters.gradeSlug;
    });
    if (matching.length > 0) {
      items = matching;
    }
  }

  // If a pack size filter is active, filter products that contain that pack size
  if (filters.packWeight) {
    items = items.filter((p) => p.variants.some((v) => v.weightG === filters.packWeight));
  }

  if (filters.q) {
    const q = filters.q.toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.tagline ?? "").toLowerCase().includes(q),
    );
  }

  switch (filters.sort) {
    case "price-asc":
      items.sort((a, b) => (a.minPricePaise ?? Infinity) - (b.minPricePaise ?? Infinity));
      break;
    case "price-desc":
      items.sort((a, b) => (b.minPricePaise ?? 0) - (a.minPricePaise ?? 0));
      break;
    case "newest":
      items.sort((a, b) => b.id.localeCompare(a.id));
      break;
    default:
      items.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
  return items;
}

export const listFeaturedProducts = cache(async (): Promise<ProductListItem[]> => {
  const all = await listPublishedProducts({ sort: "featured" });
  const inStock = all.filter((p) => p.totalStock > 0);
  const featured = inStock.filter((p) => p.featured);
  const items = [...featured];
  for (const p of inStock) {
    if (items.length >= 5) break;
    if (!items.some((item) => item.id === p.id)) {
      items.push(p);
    }
  }
  return items.slice(0, 5);
});

export interface ProductDetail extends ProductListItem {
  description: string | null;
  storageInstructions: string | null;
  ingredients: string | null;
  images: string[];
}

export const getProductBySlug = cache(async (slug: string): Promise<ProductDetail | null> => {
  try {
    const [row] = await db.query.products.findMany({
      where: and(eq(schema.products.slug, slug), eq(schema.products.status, "published")),
      with: { variants: true, grade: true },
    });
    if (!row) return null;

    const item = toListItem(row);

    // Build the complete array of images starting with active variant images in order of weight
    const variantImages = item.variants
      .map((v) => v.image)
      .filter((img): img is string => Boolean(img));

    const standardPackImages = [
      "/brand/100g.png",
      "/brand/200g.png",
      "/brand/400g.png",
      "/brand/500g.png",
      "/brand/1kg.png",
    ];

    const images = Array.from(
      new Set([
        ...(variantImages.length ? variantImages : standardPackImages),
        "/brand/grades/size.jpeg",
      ]),
    );

    return {
      ...item,
      description: row.description,
      storageInstructions: row.storageInstructions,
      ingredients: row.ingredients,
      images,
    };
  } catch {
    return null;
  }
});

export const listRelatedProducts = cache(
  async (_gradeId: string | null, excludeProductId: string): Promise<ProductListItem[]> => {
    const rows = await fetchProductRows();
    return rows
      .map(toListItem)
      .filter((p) => p.id !== excludeProductId)
      .slice(0, 4);
  },
);

/* ------------------------------------------------------- pincode & shipping */

export const getPincodeRule = cache(async (pincode: string) => {
  try {
    const [rule] = await db
      .select()
      .from(schema.pincodeRules)
      .where(eq(schema.pincodeRules.pincode, pincode));
    return rule ?? null;
  } catch {
    return null;
  }
});

export async function checkPincode(
  pincode: string,
): Promise<PincodeResult & { message: string }> {
  const { shipping } = await getSettings();
  if (!/^[1-9]\d{5}$/.test(pincode)) {
    return {
      pincode,
      serviceable: false,
      shippingPaise: null,
      estDaysMin: null,
      estDaysMax: null,
      codAvailable: false,
      message: "Please enter a valid 6-digit Indian PIN code.",
    };
  }

  const rule = await getPincodeRule(pincode);
  if (rule && !rule.serviceable) {
    return {
      pincode,
      serviceable: false,
      shippingPaise: null,
      estDaysMin: null,
      estDaysMax: null,
      codAvailable: false,
      message: "We do not currently deliver to this PIN code. Please contact us for assistance.",
    };
  }

  if (!shipping.serviceable) {
    return {
      pincode,
      serviceable: false,
      shippingPaise: null,
      estDaysMin: null,
      estDaysMax: null,
      codAvailable: false,
      message: "Retail delivery is currently paused. Bulk enquiries are still welcome.",
    };
  }

  return {
    pincode,
    serviceable: true,
    shippingPaise: rule?.shippingPaise ?? shipping.defaultPaise,
    estDaysMin: rule?.estDaysMin ?? shipping.estDaysMin,
    estDaysMax: rule?.estDaysMax ?? shipping.estDaysMax,
    codAvailable: rule?.codAvailable ?? true,
    message: `Delivery available — expected in ${rule?.estDaysMin ?? shipping.estDaysMin}–${
      rule?.estDaysMax ?? shipping.estDaysMax
    } days.`,
  };
}

/* --------------------------------------------------- authoritative pricing */

export interface CartLineInput {
  variantId: string;
  quantity: number;
}

export interface PricedLine {
  variantId: string;
  productId: string;
  productSlug: string;
  productName: string;
  gradeName: string | null;
  variantLabel: string;
  unitPricePaise: number;
  quantity: number;
  totalPaise: number;
  availableStock: number;
}

/**
 * Recomputes the authoritative cart from the database. Prices submitted by
 * the browser are never trusted; only variant ids and quantities are used.
 */
export async function priceCart(lines: CartLineInput[]): Promise<{
  lines: PricedLine[];
  subtotalPaise: number;
}> {
  const variantIds = [...new Set(lines.map((l) => l.variantId).filter(Boolean))];
  if (!variantIds.length || variantIds.length > 30) return { lines: [], subtotalPaise: 0 };

  const rows = await db.query.productVariants.findMany({
    where: (v, { inArray }) => inArray(v.id, variantIds),
    with: { product: { with: { grade: true } } },
  });
  const byId = new Map(rows.map((r) => [r.id, r]));

  const merged = new Map<string, number>();
  for (const line of lines) {
    if (!line.variantId || !Number.isInteger(line.quantity) || line.quantity < 1) continue;
    const qty = Math.min((merged.get(line.variantId) ?? 0) + line.quantity, 20);
    merged.set(line.variantId, qty);
  }

  const priced: PricedLine[] = [];
  for (const [variantId, quantity] of merged) {
    const v = byId.get(variantId);
    if (!v || !v.active) continue;
    if (v.product.status !== "published" || !v.product.retailAvailable) continue;
    priced.push({
      variantId: v.id,
      productId: v.productId,
      productSlug: v.product.slug,
      productName: v.product.name,
      gradeName: v.product.grade?.name ?? null,
      variantLabel: v.label,
      unitPricePaise: v.pricePaise,
      quantity,
      totalPaise: v.pricePaise * quantity,
      availableStock: v.stock,
    });
  }

  return {
    lines: priced,
    subtotalPaise: priced.reduce((n, l) => n + l.totalPaise, 0),
  };
}

export function computeShippingPaise(subtotalPaise: number, shipping: ShippingSettings): number {
  if (shipping.freeShippingAbovePaise > 0 && subtotalPaise >= shipping.freeShippingAbovePaise) {
    return 0;
  }
  return shipping.defaultPaise;
}
