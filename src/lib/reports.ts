import "server-only";
import { and, asc, desc, eq, inArray, ne, sql } from "drizzle-orm";
import { getDb, schema } from "@/db";

const db = getDb();

/**
 * Escapes values against Spreadsheet Formula Injection (CSV Injection).
 * Any cell beginning with '=', '+', '-', '@', '\t', or '\r' is prefixed
 * with a single quote (') so that spreadsheet programs treat it as plain text.
 */
export function escapeCsvCell(val: unknown): string {
  if (val === null || val === undefined) return "";
  const raw = String(val);
  let str = raw.trim();

  // Protect against formula execution on raw string or trimmed string
  if (/^[=+\-@\t\r]/.test(raw) || /^[=+\-@]/.test(str)) {
    str = `'${str}`;
  }

  // Quote if contains comma, double-quote, or newline
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  return str;
}

export function buildCsv(headers: string[], rows: (string | number | null | undefined)[][]): string {
  const headerLine = headers.map(escapeCsvCell).join(",");
  const dataLines = rows.map((row) => row.map(escapeCsvCell).join(","));
  return [headerLine, ...dataLines].join("\r\n");
}

export interface ReportFilterOptions {
  from?: string;
  to?: string;
  status?: string;
}

/**
 * Orders Report CSV Export
 */
export async function exportOrdersReportCsv(options: ReportFilterOptions = {}): Promise<string> {
  const fromFilter = options.from ? sql`${schema.orders.createdAt} >= ${new Date(options.from).toISOString()}` : undefined;
  const toFilter = options.to ? sql`${schema.orders.createdAt} <= ${new Date(options.to).toISOString()}` : undefined;
  const statusFilter = options.status ? eq(schema.orders.fulfilmentStatus, options.status as never) : undefined;

  const orders = await db
    .select()
    .from(schema.orders)
    .where(and(fromFilter, toFilter, statusFilter))
    .orderBy(desc(schema.orders.createdAt));

  const orderIds = orders.map((o) => o.id);
  const items = orderIds.length
    ? await db.select().from(schema.orderItems).where(inArray(schema.orderItems.orderId, orderIds))
    : [];

  const itemsByOrder = new Map<string, typeof items>();
  for (const item of items) {
    const list = itemsByOrder.get(item.orderId) || [];
    list.push(item);
    itemsByOrder.set(item.orderId, list);
  }

  const headers = [
    "Order Reference",
    "Date (IST)",
    "Customer Name",
    "Phone",
    "Email",
    "Delivery Address",
    "City",
    "State",
    "PIN Code",
    "Ordered Items Summary",
    "Items Count",
    "Subtotal (INR)",
    "Shipping (INR)",
    "Discount (INR)",
    "Total Amount (INR)",
    "Payment Method",
    "Payment Status",
    "Fulfilment Status",
  ];

  const rows = orders.map((o) => {
    const orderItems = itemsByOrder.get(o.id) || [];
    const itemsSummary = orderItems
      .map((i) => `${i.productName} (${i.variantLabel}) x${i.quantity}`)
      .join(" | ");
    const fullAddress = [o.addressLine1, o.addressLine2, o.landmark].filter(Boolean).join(", ");

    return [
      o.reference,
      new Date(o.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      o.customerName,
      o.phone,
      o.email || "",
      fullAddress,
      o.city,
      o.state,
      o.pincode,
      itemsSummary,
      orderItems.reduce((acc, i) => acc + i.quantity, 0),
      (o.subtotalPaise / 100).toFixed(2),
      (o.shippingPaise / 100).toFixed(2),
      (o.discountPaise / 100).toFixed(2),
      (o.totalPaise / 100).toFixed(2),
      o.paymentMethod.toUpperCase(),
      o.paymentStatus.toUpperCase(),
      o.fulfilmentStatus.toUpperCase(),
    ];
  });

  return buildCsv(headers, rows);
}

/**
 * Sales Report CSV Export (Aggregated by day or overall period)
 */
export async function exportSalesReportCsv(options: ReportFilterOptions = {}): Promise<string> {
  const fromFilter = options.from ? sql`${schema.orders.createdAt} >= ${new Date(options.from).toISOString()}` : undefined;
  const toFilter = options.to ? sql`${schema.orders.createdAt} <= ${new Date(options.to).toISOString()}` : undefined;

  const orders = await db
    .select()
    .from(schema.orders)
    .where(and(fromFilter, toFilter))
    .orderBy(desc(schema.orders.createdAt));

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter((o) => o.fulfilmentStatus === "delivered").length;
  const cancelledOrders = orders.filter((o) => o.fulfilmentStatus === "cancelled").length;
  const validOrders = orders.filter((o) => o.fulfilmentStatus !== "cancelled");

  const grossOrderValuePaise = validOrders.reduce((sum, o) => sum + o.totalPaise, 0);
  const deliveredOrderValuePaise = orders
    .filter((o) => o.fulfilmentStatus === "delivered")
    .reduce((sum, o) => sum + o.totalPaise, 0);
  const totalShippingPaise = validOrders.reduce((sum, o) => sum + o.shippingPaise, 0);
  const totalDiscountPaise = validOrders.reduce((sum, o) => sum + o.discountPaise, 0);
  const collectedPaymentsPaise = validOrders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.totalPaise, 0);
  const outstandingCodPaise = validOrders
    .filter((o) => o.paymentMethod === "cod" && o.paymentStatus === "unpaid")
    .reduce((sum, o) => sum + o.totalPaise, 0);

  const headers = [
    "Metric",
    "Value",
    "Notes & Methodology",
  ];

  const rows = [
    ["Report Period From", options.from || "Start of Data", "Filter start date"],
    ["Report Period To", options.to || "Present", "Filter end date"],
    ["Total Orders Count", totalOrders, "All orders placed in selected date range"],
    ["Delivered Orders Count", deliveredOrders, "Orders with status 'delivered'"],
    ["Cancelled Orders Count", cancelledOrders, "Orders cancelled and excluded from revenue totals"],
    [
      "Gross Order Value (INR)",
      (grossOrderValuePaise / 100).toFixed(2),
      "Sum of total amounts for all non-cancelled orders",
    ],
    [
      "Delivered Orders Value (INR)",
      (deliveredOrderValuePaise / 100).toFixed(2),
      "Sum of total amounts for successfully delivered orders",
    ],
    [
      "Total Collected Revenue (INR)",
      (collectedPaymentsPaise / 100).toFixed(2),
      "Actual verified payments received (excludes unpaid COD)",
    ],
    [
      "Outstanding COD Amount (INR)",
      (outstandingCodPaise / 100).toFixed(2),
      "Unpaid Cash-on-Delivery orders awaiting courier collection upon delivery",
    ],
    [
      "Shipping Totals (INR)",
      (totalShippingPaise / 100).toFixed(2),
      "Total shipping and courier fees included in orders",
    ],
    [
      "Discounts Applied (INR)",
      (totalDiscountPaise / 100).toFixed(2),
      "Total promotional deductions across orders",
    ],
  ];

  return buildCsv(headers, rows);
}

/**
 * Inventory Report CSV Export
 */
export async function exportInventoryReportCsv(): Promise<string> {
  const variants = await db
    .select({
      variantId: schema.productVariants.id,
      label: schema.productVariants.label,
      sku: schema.productVariants.sku,
      pricePaise: schema.productVariants.pricePaise,
      compareAtPricePaise: schema.productVariants.compareAtPricePaise,
      stock: schema.productVariants.stock,
      lowStockThreshold: schema.productVariants.lowStockThreshold,
      active: schema.productVariants.active,
      productName: schema.products.name,
      productSlug: schema.products.slug,
      productCategory: schema.products.category,
      gradeName: schema.grades.name,
    })
    .from(schema.productVariants)
    .innerJoin(schema.products, eq(schema.productVariants.productId, schema.products.id))
    .leftJoin(schema.grades, eq(schema.products.gradeId, schema.grades.id))
    .orderBy(asc(schema.products.name), asc(schema.productVariants.sortOrder));

  const headers = [
    "Product Name",
    "Category",
    "Grade",
    "Pack Size / Variant",
    "SKU",
    "Selling Price (INR)",
    "Compare Price (INR)",
    "Current Stock",
    "Low Stock Threshold",
    "Stock Status",
    "Active in Store",
  ];

  const rows = variants.map((v) => {
    let stockStatus = "In Stock";
    if (v.stock <= 0) stockStatus = "Out of Stock";
    else if (v.stock <= v.lowStockThreshold) stockStatus = "Low Stock";

    return [
      v.productName,
      v.productCategory,
      v.gradeName || "Standard",
      v.label,
      v.sku || "—",
      (v.pricePaise / 100).toFixed(2),
      v.compareAtPricePaise ? (v.compareAtPricePaise / 100).toFixed(2) : "",
      v.stock,
      v.lowStockThreshold,
      stockStatus,
      v.active ? "YES" : "NO",
    ];
  });

  return buildCsv(headers, rows);
}

/**
 * Products Catalogue Report CSV Export
 */
export async function exportProductsReportCsv(): Promise<string> {
  const products = await db.query.products.findMany({
    with: { variants: true, grade: true },
    orderBy: [asc(schema.products.name)],
  });

  const headers = [
    "Product Name",
    "Slug",
    "Category",
    "Grade",
    "Status",
    "Featured",
    "Retail Available",
    "Variants Count",
    "Price Range (INR)",
    "Total Available Stock",
    "SEO Title",
    "SEO Description",
  ];

  const rows = products.map((p) => {
    const prices = p.variants.map((v) => v.pricePaise / 100);
    const minPrice = prices.length ? Math.min(...prices).toFixed(2) : "0.00";
    const maxPrice = prices.length ? Math.max(...prices).toFixed(2) : "0.00";
    const priceRange = minPrice === maxPrice ? `₹${minPrice}` : `₹${minPrice} - ₹${maxPrice}`;
    const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);

    return [
      p.name,
      p.slug,
      p.category,
      p.grade?.name || "Standard",
      p.status.toUpperCase(),
      p.featured ? "YES" : "NO",
      p.retailAvailable ? "YES" : "NO",
      p.variants.length,
      priceRange,
      totalStock,
      p.seoTitle || "",
      p.seoDescription || "",
    ];
  });

  return buildCsv(headers, rows);
}
