import "server-only";
import { and, asc, count, desc, eq, ilike, inArray, lte, ne, or, sql } from "drizzle-orm";
import { getDb, schema } from "@/db";

const db = getDb();

/* ---------------------------------------------------------------- dashboard */

export interface DashboardStats {
  totalOrders: number;
  ordersToday: number;
  pendingOrders: number;
  awaitingDispatch: number;
  outForDelivery: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalOrderValuePaise: number;
  deliveredOrderValuePaise: number;
  codCollectedPaise: number;
  unfulfilledCodOrders: number;
  unfulfilledCodValuePaise: number;
  lowStockCount: number;
  outOfStockCount: number;
  newEnquiries: number;
  newMessages: number;
}

export async function getDashboardStats(dateRange?: { from?: string; to?: string }): Promise<DashboardStats> {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const fromFilter = dateRange?.from ? sql`${schema.orders.createdAt} >= ${new Date(dateRange.from).toISOString()}` : undefined;
  const toFilter = dateRange?.to ? sql`${schema.orders.createdAt} <= ${new Date(dateRange.to).toISOString()}` : undefined;
  const orderDateFilter = and(fromFilter, toFilter);

  const [
    totalOrdersRes,
    ordersTodayRes,
    pendingRes,
    awaitingDispatchRes,
    outForDeliveryRes,
    deliveredRes,
    cancelledRes,
    orderValueRes,
    deliveredValueRes,
    codCollectedRes,
    unfulfilledCodRes,
    lowStockRes,
    outOfStockRes,
    newEnquiriesRes,
    newMessagesRes,
  ] = await Promise.all([
    db.select({ n: count() }).from(schema.orders).where(orderDateFilter),
    db.select({ n: count() }).from(schema.orders).where(sql`${schema.orders.createdAt} >= ${startOfToday.toISOString()}`),
    db.select({ n: count() }).from(schema.orders).where(and(eq(schema.orders.fulfilmentStatus, "pending"), orderDateFilter)),
    db.select({ n: count() }).from(schema.orders).where(and(inArray(schema.orders.fulfilmentStatus, ["confirmed", "packed"]), orderDateFilter)),
    db.select({ n: count() }).from(schema.orders).where(and(inArray(schema.orders.fulfilmentStatus, ["shipped"]), orderDateFilter)),
    db.select({ n: count() }).from(schema.orders).where(and(eq(schema.orders.fulfilmentStatus, "delivered"), orderDateFilter)),
    db.select({ n: count() }).from(schema.orders).where(and(eq(schema.orders.fulfilmentStatus, "cancelled"), orderDateFilter)),
    // Exclude cancelled orders from total order value
    db
      .select({ total: sql<number>`coalesce(sum(${schema.orders.totalPaise}), 0)` })
      .from(schema.orders)
      .where(and(ne(schema.orders.fulfilmentStatus, "cancelled"), orderDateFilter)),
    // Delivered order value
    db
      .select({ total: sql<number>`coalesce(sum(${schema.orders.totalPaise}), 0)` })
      .from(schema.orders)
      .where(and(eq(schema.orders.fulfilmentStatus, "delivered"), orderDateFilter)),
    // Collected COD (strictly paid)
    db
      .select({ total: sql<number>`coalesce(sum(${schema.orders.totalPaise}), 0)` })
      .from(schema.orders)
      .where(and(eq(schema.orders.paymentStatus, "paid"), orderDateFilter)),
    // Unfulfilled COD
    db
      .select({
        n: count(),
        total: sql<number>`coalesce(sum(${schema.orders.totalPaise}), 0)`,
      })
      .from(schema.orders)
      .where(
        and(
          eq(schema.orders.paymentMethod, "cod"),
          eq(schema.orders.paymentStatus, "unpaid"),
          ne(schema.orders.fulfilmentStatus, "cancelled"),
          orderDateFilter,
        ),
      ),
    // Low stock variants (stock > 0 and stock <= lowStockThreshold)
    db
      .select({ n: count() })
      .from(schema.productVariants)
      .where(
        and(
          eq(schema.productVariants.active, true),
          sql`${schema.productVariants.stock} > 0 AND ${schema.productVariants.stock} <= ${schema.productVariants.lowStockThreshold}`,
        ),
      ),
    // Out of stock variants (stock <= 0)
    db
      .select({ n: count() })
      .from(schema.productVariants)
      .where(
        and(
          eq(schema.productVariants.active, true),
          sql`${schema.productVariants.stock} <= 0`,
        ),
      ),
    db.select({ n: count() }).from(schema.bulkEnquiries).where(eq(schema.bulkEnquiries.status, "new")),
    db.select({ n: count() }).from(schema.contactMessages).where(eq(schema.contactMessages.status, "new")),
  ]);

  return {
    totalOrders: Number(totalOrdersRes[0]?.n ?? 0),
    ordersToday: Number(ordersTodayRes[0]?.n ?? 0),
    pendingOrders: Number(pendingRes[0]?.n ?? 0),
    awaitingDispatch: Number(awaitingDispatchRes[0]?.n ?? 0),
    outForDelivery: Number(outForDeliveryRes[0]?.n ?? 0),
    deliveredOrders: Number(deliveredRes[0]?.n ?? 0),
    cancelledOrders: Number(cancelledRes[0]?.n ?? 0),
    totalOrderValuePaise: Number(orderValueRes[0]?.total ?? 0),
    deliveredOrderValuePaise: Number(deliveredValueRes[0]?.total ?? 0),
    codCollectedPaise: Number(codCollectedRes[0]?.total ?? 0),
    unfulfilledCodOrders: Number(unfulfilledCodRes[0]?.n ?? 0),
    unfulfilledCodValuePaise: Number(unfulfilledCodRes[0]?.total ?? 0),
    lowStockCount: Number(lowStockRes[0]?.n ?? 0),
    outOfStockCount: Number(outOfStockRes[0]?.n ?? 0),
    newEnquiries: Number(newEnquiriesRes[0]?.n ?? 0),
    newMessages: Number(newMessagesRes[0]?.n ?? 0),
  };
}

export async function listRecentOrders(limit = 8) {
  return db
    .select({
      id: schema.orders.id,
      reference: schema.orders.reference,
      customerName: schema.orders.customerName,
      phone: schema.orders.phone,
      totalPaise: schema.orders.totalPaise,
      fulfilmentStatus: schema.orders.fulfilmentStatus,
      paymentStatus: schema.orders.paymentStatus,
      createdAt: schema.orders.createdAt,
    })
    .from(schema.orders)
    .orderBy(desc(schema.orders.createdAt))
    .limit(limit);
}

export async function listLowStock(limit = 8) {
  return db
    .select({
      id: schema.productVariants.id,
      label: schema.productVariants.label,
      stock: schema.productVariants.stock,
      sku: schema.productVariants.sku,
      productId: schema.products.id,
      productName: schema.products.name,
      productSlug: schema.products.slug,
    })
    .from(schema.productVariants)
    .innerJoin(schema.products, eq(schema.productVariants.productId, schema.products.id))
    .where(and(eq(schema.productVariants.active, true), lte(schema.productVariants.stock, 5)))
    .orderBy(asc(schema.productVariants.stock))
    .limit(limit);
}

export async function listRecentEnquiries(limit = 5) {
  return db
    .select()
    .from(schema.bulkEnquiries)
    .orderBy(desc(schema.bulkEnquiries.createdAt))
    .limit(limit);
}

/* ------------------------------------------------------------------- orders */

export interface OrderFilters {
  status?: string;
  payment?: string;
  q?: string;
}

export async function listOrders(filters: OrderFilters = {}) {
  const term = filters.q?.trim();
  const where = and(
    filters.status ? eq(schema.orders.fulfilmentStatus, filters.status as never) : undefined,
    filters.payment ? eq(schema.orders.paymentStatus, filters.payment as never) : undefined,
    term
      ? or(
          ilike(schema.orders.reference, `%${term}%`),
          ilike(schema.orders.customerName, `%${term}%`),
          ilike(schema.orders.phone, `%${term}%`),
          ilike(schema.orders.pincode, `%${term}%`),
        )
      : undefined,
  );

  return db
    .select()
    .from(schema.orders)
    .where(where)
    .orderBy(desc(schema.orders.createdAt))
    .limit(200);
}

export async function getOrderByReference(reference: string) {
  return db.query.orders.findFirst({
    where: eq(schema.orders.reference, reference.toUpperCase()),
    with: { items: true, collectedBy: true },
  });
}

/* ---------------------------------------------------------------- enquiries */

export async function listEnquiries(status?: string) {
  return db
    .select()
    .from(schema.bulkEnquiries)
    .where(status ? eq(schema.bulkEnquiries.status, status as never) : undefined)
    .orderBy(desc(schema.bulkEnquiries.createdAt))
    .limit(200);
}

export async function getEnquiry(id: string) {
  return db.query.bulkEnquiries.findFirst({
    where: eq(schema.bulkEnquiries.id, id),
  });
}

export async function listContactMessages(status?: string) {
  return db
    .select()
    .from(schema.contactMessages)
    .where(status ? eq(schema.contactMessages.status, status) : undefined)
    .orderBy(desc(schema.contactMessages.createdAt))
    .limit(200);
}

/* ---------------------------------------------------------------- catalogue */

export async function listAdminProducts() {
  return db.query.products.findMany({
    with: { variants: true, grade: true },
    orderBy: [desc(schema.products.createdAt)],
  });
}

export async function getAdminProduct(id: string) {
  return db.query.products.findFirst({
    where: eq(schema.products.id, id),
    with: { variants: true, grade: true },
  });
}

export async function listAllGradesAdmin() {
  return db.select().from(schema.grades).orderBy(asc(schema.grades.sortOrder));
}

export async function listPincodeRules() {
  return db.select().from(schema.pincodeRules).orderBy(asc(schema.pincodeRules.pincode));
}

/* ------------------------------------------------------------- stock movements */

export async function listStockAdjustments(limit = 100) {
  return db
    .select({
      id: schema.stockAdjustments.id,
      changeQty: schema.stockAdjustments.changeQty,
      previousQty: schema.stockAdjustments.previousQty,
      newQty: schema.stockAdjustments.newQty,
      reason: schema.stockAdjustments.reason,
      notes: schema.stockAdjustments.notes,
      reference: schema.stockAdjustments.reference,
      adjustedBy: schema.stockAdjustments.adjustedBy,
      createdAt: schema.stockAdjustments.createdAt,
      variantLabel: schema.productVariants.label,
      productName: schema.products.name,
      sku: schema.productVariants.sku,
    })
    .from(schema.stockAdjustments)
    .innerJoin(schema.productVariants, eq(schema.stockAdjustments.variantId, schema.productVariants.id))
    .leftJoin(schema.products, eq(schema.stockAdjustments.productId, schema.products.id))
    .orderBy(desc(schema.stockAdjustments.createdAt))
    .limit(limit);
}

/* ------------------------------------------------------------------ customers */

export async function listCustomersAdmin(limit = 100) {
  return db
    .select({
      id: schema.customers.id,
      name: schema.customers.name,
      email: schema.customers.email,
      phone: schema.customers.phone,
      role: schema.customers.role,
      emailVerified: schema.customers.emailVerified,
      createdAt: schema.customers.createdAt,
    })
    .from(schema.customers)
    .orderBy(desc(schema.customers.createdAt))
    .limit(limit);
}
