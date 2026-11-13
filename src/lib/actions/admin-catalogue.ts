"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq, inArray, ne } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { requireManager } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const db = getDb();

export interface ActionResult {
  ok?: boolean;
  error?: string;
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

function optionalStr(fd: FormData, key: string): string | null {
  const v = str(fd, key);
  return v ? v : null;
}

function bool(fd: FormData, key: string): boolean {
  const v = fd.get(key);
  return v === "on" || v === "true" || v === "1";
}

function rupeesToPaise(value: FormDataEntryValue | null): number | null {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return Number.NaN;
  return Math.round(n * 100);
}

function refreshCatalogue() {
  revalidatePath("/", "layout");
}

/* ----------------------------------------------------------------- products */

const PRODUCT_STATUSES = ["draft", "published", "archived"] as const;

export async function saveProductAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireManager();

  const id = optionalStr(formData, "id");
  const name = str(formData, "name");
  if (name.length < 2) return { error: "Product name must be at least 2 characters." };

  const slug = slugify(str(formData, "slug") || name);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: "Slug may contain only lowercase letters, numbers, and hyphens." };
  }

  const status = str(formData, "status") || "draft";
  if (!PRODUCT_STATUSES.includes(status as (typeof PRODUCT_STATUSES)[number])) {
    return { error: "Invalid product status." };
  }

  const gradeId = optionalStr(formData, "gradeId");
  if (gradeId) {
    const [grade] = await db
      .select({ id: schema.grades.id })
      .from(schema.grades)
      .where(eq(schema.grades.id, gradeId))
      .limit(1);
    if (!grade) return { error: "Selected grade no longer exists." };
  }

  let images: string[] = [];
  try {
    const raw = str(formData, "images");
    const parsed = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      images = parsed.filter((v): v is string => typeof v === "string" && v.length > 0).slice(0, 6);
    }
  } catch {
    return { error: "Image data could not be read. Please re-upload the images." };
  }

  const [duplicate] = await db
    .select({ id: schema.products.id })
    .from(schema.products)
    .where(id ? and(eq(schema.products.slug, slug), ne(schema.products.id, id)) : eq(schema.products.slug, slug))
    .limit(1);
  if (duplicate) return { error: "That slug is already used by another product." };

  const values = {
    slug,
    name,
    gradeId,
    category: str(formData, "category") || "Makhana",
    makhanaGrade: optionalStr(formData, "makhanaGrade"),
    tagline: optionalStr(formData, "tagline"),
    description: optionalStr(formData, "description"),
    storageInstructions: optionalStr(formData, "storageInstructions"),
    ingredients: optionalStr(formData, "ingredients"),
    images,
    status: status as (typeof PRODUCT_STATUSES)[number],
    featured: bool(formData, "featured"),
    retailAvailable: bool(formData, "retailAvailable"),
    usesSamplePrices: bool(formData, "usesSamplePrices"),
    seoTitle: optionalStr(formData, "seoTitle"),
    seoDescription: optionalStr(formData, "seoDescription"),
  };

  if (id) {
    await db.update(schema.products).set(values).where(eq(schema.products.id, id));
    refreshCatalogue();
    revalidatePath(`/admin/products/${id}`);
    return { ok: true };
  }

  const [created] = await db.insert(schema.products).values(values).returning({ id: schema.products.id });
  refreshCatalogue();
  redirect(`/admin/products/${created.id}?created=1`);
}

export async function archiveProductAction(formData: FormData): Promise<void> {
  await requireManager();
  const id = str(formData, "id");
  if (id) {
    await db.update(schema.products).set({ status: "archived" }).where(eq(schema.products.id, id));
  }
  refreshCatalogue();
  redirect("/admin/products?archived=1");
}

export async function deleteProductAction(formData: FormData): Promise<void> {
  const admin = await requireManager();
  const id = str(formData, "id");
  if (!id) return;

  // Check if product or its variants appear in historical orders
  const variants = await db
    .select({ id: schema.productVariants.id })
    .from(schema.productVariants)
    .where(eq(schema.productVariants.productId, id));

  const variantIds = variants.map((v) => v.id);
  let hasOrders = false;
  if (variantIds.length > 0) {
    const [orderItem] = await db
      .select({ id: schema.orderItems.id })
      .from(schema.orderItems)
      .where(inArray(schema.orderItems.variantId, variantIds))
      .limit(1);
    if (orderItem) hasOrders = true;
  }

  if (hasOrders) {
    // Preserve historical order records by archiving instead of deleting
    await db
      .update(schema.products)
      .set({ status: "archived", retailAvailable: false })
      .where(eq(schema.products.id, id));
    refreshCatalogue();
    redirect("/admin/products?archived=1");
    return;
  }

  await db.delete(schema.products).where(eq(schema.products.id, id));
  refreshCatalogue();
  redirect("/admin/products?deleted=1");
}

/* ----------------------------------------------------------------- variants */

export async function addVariantAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireManager();

  const productId = str(formData, "productId");
  if (!productId) return { error: "Missing product." };

  const [product] = await db
    .select({ id: schema.products.id })
    .from(schema.products)
    .where(eq(schema.products.id, productId))
    .limit(1);
  if (!product) return { error: "Product not found." };

  const label = str(formData, "label");
  if (!label) return { error: "Variant label is required (e.g. 250 g)." };

  const pricePaise = rupeesToPaise(formData.get("priceRupees"));
  if (pricePaise === null) return { error: "Selling price is required." };
  if (Number.isNaN(pricePaise)) return { error: "Selling price must be a valid amount." };

  const compareRaw = formData.get("compareAtRupees");
  const compareAtPricePaise = rupeesToPaise(compareRaw);
  if (compareAtPricePaise !== null && Number.isNaN(compareAtPricePaise)) {
    return { error: "Compare-at price must be a valid amount." };
  }

  const stockRaw = Number(str(formData, "stock") || "0");
  if (!Number.isInteger(stockRaw) || stockRaw < 0) {
    return { error: "Stock must be a whole number of 0 or more." };
  }

  const weightRaw = str(formData, "weightG");
  const weightG = weightRaw ? Number(weightRaw) : null;
  if (weightG !== null && (!Number.isInteger(weightG) || weightG < 0)) {
    return { error: "Weight must be a whole number of grams." };
  }

  const sku = optionalStr(formData, "sku");
  if (sku) {
    const [dupe] = await db
      .select({ id: schema.productVariants.id })
      .from(schema.productVariants)
      .where(eq(schema.productVariants.sku, sku))
      .limit(1);
    if (dupe) return { error: "That SKU is already used by another variant." };
  }

  const lowStockThreshold = Number(str(formData, "lowStockThreshold") || "10") || 10;

  const [createdVariant] = await db
    .insert(schema.productVariants)
    .values({
      productId,
      label,
      weightG,
      pricePaise,
      compareAtPricePaise,
      stock: stockRaw,
      lowStockThreshold,
      sku,
      active: bool(formData, "active"),
      sortOrder: Number(str(formData, "sortOrder") || "0") || 0,
    })
    .returning({ id: schema.productVariants.id });

  if (stockRaw > 0) {
    const admin = await requireManager();
    await db.insert(schema.stockAdjustments).values({
      variantId: createdVariant.id,
      productId,
      changeQty: stockRaw,
      previousQty: 0,
      newQty: stockRaw,
      reason: "purchase_received",
      notes: "Initial stock quantity",
      adjustedBy: admin.email,
    });
  }

  refreshCatalogue();
  revalidatePath(`/admin/products/${productId}`);
  return { ok: true };
}

export async function updateVariantAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const admin = await requireManager();

  const id = str(formData, "id");
  if (!id) return { error: "Missing variant." };

  const [current] = await db
    .select()
    .from(schema.productVariants)
    .where(eq(schema.productVariants.id, id))
    .limit(1);

  if (!current) return { error: "Variant not found." };

  const label = str(formData, "label");
  if (!label) return { error: "Variant label is required." };

  const pricePaise = rupeesToPaise(formData.get("priceRupees"));
  if (pricePaise === null || Number.isNaN(pricePaise)) {
    return { error: "Selling price must be a valid amount." };
  }

  const compareAtPricePaise = rupeesToPaise(formData.get("compareAtRupees"));
  if (compareAtPricePaise !== null && Number.isNaN(compareAtPricePaise)) {
    return { error: "Compare-at price must be a valid amount." };
  }

  const stock = Number(str(formData, "stock") || "0");
  if (!Number.isInteger(stock) || stock < 0) {
    return { error: "Stock must be a whole number of 0 or more." };
  }

  const lowStockThreshold = Number(str(formData, "lowStockThreshold") || "10") || 10;

  const sku = optionalStr(formData, "sku");
  if (sku) {
    const [dupe] = await db
      .select({ id: schema.productVariants.id })
      .from(schema.productVariants)
      .where(and(eq(schema.productVariants.sku, sku), ne(schema.productVariants.id, id)))
      .limit(1);
    if (dupe) return { error: "That SKU is already used by another variant." };
  }

  const weightRaw = str(formData, "weightG");
  const weightG = weightRaw ? Number(weightRaw) : null;
  if (weightG !== null && (!Number.isInteger(weightG) || weightG < 0)) {
    return { error: "Weight must be a whole number of grams." };
  }

  await db
    .update(schema.productVariants)
    .set({
      label,
      weightG,
      pricePaise,
      compareAtPricePaise,
      stock,
      lowStockThreshold,
      sku,
      active: bool(formData, "active"),
      sortOrder: Number(str(formData, "sortOrder") || "0") || 0,
    })
    .where(eq(schema.productVariants.id, id));

  // Record inventory audit movement if stock changed
  if (current.stock !== stock) {
    const diff = stock - current.stock;
    const reason = str(formData, "reason") || "manual_correction";
    const notes = optionalStr(formData, "notes");
    await db.insert(schema.stockAdjustments).values({
      variantId: id,
      productId: current.productId,
      changeQty: diff,
      previousQty: current.stock,
      newQty: stock,
      reason,
      notes,
      adjustedBy: admin.email,
    });
  }

  refreshCatalogue();
  const productId = str(formData, "productId") || current.productId;
  if (productId) revalidatePath(`/admin/products/${productId}`);
  return { ok: true };
}

export async function deleteVariantAction(formData: FormData): Promise<void> {
  await requireManager();
  const id = str(formData, "id");
  const productId = str(formData, "productId");
  if (!id) return;

  // Check if variant appears in historical orders
  const [hasOrders] = await db
    .select({ id: schema.orderItems.id })
    .from(schema.orderItems)
    .where(eq(schema.orderItems.variantId, id))
    .limit(1);

  if (hasOrders) {
    // Deactivate instead of deleting to protect order history integrity
    await db.update(schema.productVariants).set({ active: false }).where(eq(schema.productVariants.id, id));
  } else {
    await db.delete(schema.productVariants).where(eq(schema.productVariants.id, id));
  }

  refreshCatalogue();
  if (productId) revalidatePath(`/admin/products/${productId}`);
}

/* ------------------------------------------------------------------- grades */

export async function saveGradeAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  await requireManager();

  const id = optionalStr(formData, "id");
  const name = str(formData, "name");
  if (name.length < 2) return { error: "Grade name must be at least 2 characters." };

  const slug = slugify(str(formData, "slug") || name);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return { error: "Slug may contain only lowercase letters, numbers, and hyphens." };
  }

  const minRaw = str(formData, "sizeMinMm");
  const maxRaw = str(formData, "sizeMaxMm");
  const sizeMinMm = minRaw ? Number(minRaw) : null;
  const sizeMaxMm = maxRaw ? Number(maxRaw) : null;
  if (
    (sizeMinMm !== null && (!Number.isFinite(sizeMinMm) || sizeMinMm < 0)) ||
    (sizeMaxMm !== null && (!Number.isFinite(sizeMaxMm) || sizeMaxMm < 0))
  ) {
    return { error: "Size values must be non-negative numbers." };
  }
  if (sizeMinMm !== null && sizeMaxMm !== null && sizeMinMm > sizeMaxMm) {
    return { error: "Minimum size cannot exceed maximum size." };
  }

  const [duplicate] = await db
    .select({ id: schema.grades.id })
    .from(schema.grades)
    .where(id ? and(eq(schema.grades.slug, slug), ne(schema.grades.id, id)) : eq(schema.grades.slug, slug))
    .limit(1);
  if (duplicate) return { error: "That slug is already used by another grade." };

  const values = {
    slug,
    name,
    sizeMinMm: sizeMinMm === null ? null : Math.round(sizeMinMm),
    sizeMaxMm: sizeMaxMm === null ? null : Math.round(sizeMaxMm),
    summary: optionalStr(formData, "summary"),
    description: optionalStr(formData, "description"),
    image: optionalStr(formData, "image"),
    sortOrder: Number(str(formData, "sortOrder") || "0") || 0,
    published: bool(formData, "published"),
  };

  if (id) {
    await db.update(schema.grades).set(values).where(eq(schema.grades.id, id));
  } else {
    await db.insert(schema.grades).values(values);
  }

  refreshCatalogue();
  revalidatePath("/admin/grades");
  return { ok: true };
}

export async function deleteGradeAction(formData: FormData): Promise<void> {
  await requireManager();
  const id = str(formData, "id");
  if (id) await db.delete(schema.grades).where(eq(schema.grades.id, id));
  refreshCatalogue();
  revalidatePath("/admin/grades");
  redirect("/admin/grades?deleted=1");
}
