import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

/* ==========================================================================
   AVRELLE AGRO — database schema (PostgreSQL / Supabase)
   Money is always stored in paise (integer) to avoid floating point errors.
   ========================================================================== */

export const orderStatuses = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
] as const;
export type OrderStatus = (typeof orderStatuses)[number];

export const paymentStatuses = ["unpaid", "paid", "refunded"] as const;
export type PaymentStatus = (typeof paymentStatuses)[number];

export const enquiryStatuses = ["new", "reviewing", "quoted", "closed"] as const;
export type EnquiryStatus = (typeof enquiryStatuses)[number];

export const productStatuses = ["draft", "published", "archived"] as const;
export type ProductStatus = (typeof productStatuses)[number];

/* ---------------------------------------------------------------- admins -- */

export const admins = pgTable("admins", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  mustChangePassword: boolean("must_change_password").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const adminSessions = pgTable(
  "admin_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tokenHash: text("token_hash").notNull().unique(),
    adminId: uuid("admin_id")
      .notNull()
      .references(() => admins.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("admin_sessions_admin_idx").on(t.adminId)],
);

/* ------------------------------------------------------------- customers -- */

export const customers = pgTable(
  "customers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    phone: text("phone"),
    passwordHash: text("password_hash").notNull(),
    role: text("role").notNull().default("customer"),
    emailVerified: boolean("email_verified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("customers_email_idx").on(t.email)],
);

export const customerSessions = pgTable(
  "customer_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    tokenHash: text("token_hash").notNull().unique(),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => customers.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("customer_sessions_customer_idx").on(t.customerId)],
);

export const customerAddresses = pgTable(
  "customer_addresses",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    customerId: uuid("customer_id")
      .notNull()
      .references(() => customers.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    addressLine1: text("address_line1").notNull(),
    addressLine2: text("address_line2"),
    landmark: text("landmark"),
    city: text("city").notNull(),
    state: text("state").notNull(),
    pincode: text("pincode").notNull(),
    isDefault: boolean("is_default").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("customer_addresses_customer_idx").on(t.customerId)],
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull(),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    used: boolean("used").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("password_reset_email_idx").on(t.email)],
);

/* ---------------------------------------------------------------- grades -- */

export const grades = pgTable(
  "grades",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    /** Indicative size range from supplied reference material (mm). */
    sizeMinMm: integer("size_min_mm"),
    sizeMaxMm: integer("size_max_mm"),
    /** Short plain-language explanation shown on cards. */
    summary: text("summary"),
    description: text("description"),
    image: text("image"),
    sortOrder: integer("sort_order").notNull().default(0),
    published: boolean("published").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("grades_sort_idx").on(t.sortOrder)],
);

/* -------------------------------------------------------------- products -- */

export const products = pgTable(
  "products",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    gradeId: uuid("grade_id").references(() => grades.id, { onDelete: "set null" }),
    category: text("category").notNull().default("Makhana"),
    makhanaGrade: text("makhana_grade"),
    tagline: text("tagline"),
    description: text("description"),
    storageInstructions: text("storage_instructions"),
    ingredients: text("ingredients"),
    /** Array of image paths/URLs; first entry is the primary image. */
    images: jsonb("images").$type<string[]>().notNull().default([]),
    status: text("status").$type<ProductStatus>().notNull().default("draft"),
    featured: boolean("featured").notNull().default(false),
    /** Allows a grade to be shown for awareness while retail buying is off. */
    retailAvailable: boolean("retail_available").notNull().default(true),
    /** Sample prices must be replaced with verified retail prices before launch. */
    usesSamplePrices: boolean("uses_sample_prices").notNull().default(true),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    index("products_status_idx").on(t.status),
    index("products_grade_idx").on(t.gradeId),
  ],
);

export const productVariants = pgTable(
  "product_variants",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    /** e.g. "500 g" */
    label: text("label").notNull(),
    weightG: integer("weight_g"),
    pricePaise: integer("price_paise").notNull(),
    compareAtPricePaise: integer("compare_at_price_paise"),
    stock: integer("stock").notNull().default(0),
    lowStockThreshold: integer("low_stock_threshold").notNull().default(10),
    sku: text("sku").unique(),
    active: boolean("active").notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("product_variants_product_idx").on(t.productId)],
);

/* ---------------------------------------------------------------- orders -- */

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    /** Public order reference, e.g. AVG-7K3QX9 */
    reference: text("reference").notNull().unique(),
    customerId: uuid("customer_id").references(() => customers.id, { onDelete: "set null" }),
    customerName: text("customer_name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    addressLine1: text("address_line1").notNull(),
    addressLine2: text("address_line2"),
    landmark: text("landmark"),
    city: text("city").notNull(),
    state: text("state").notNull(),
    pincode: text("pincode").notNull(),
    deliveryInstructions: text("delivery_instructions"),
    subtotalPaise: integer("subtotal_paise").notNull(),
    shippingPaise: integer("shipping_paise").notNull().default(0),
    discountPaise: integer("discount_paise").notNull().default(0),
    totalPaise: integer("total_paise").notNull(),
    paymentMethod: text("payment_method").notNull().default("cod"),
    paymentStatus: text("payment_status").$type<PaymentStatus>().notNull().default("unpaid"),
    codCollectedAt: timestamp("cod_collected_at", { withTimezone: true }),
    codCollectedBy: uuid("cod_collected_by").references(() => admins.id, { onDelete: "set null" }),
    fulfilmentStatus: text("fulfilment_status").$type<OrderStatus>().notNull().default("pending"),
    /** Chronological status events for the admin order timeline. */
    statusHistory: jsonb("status_history")
      .$type<Array<{ status: string; at: string; note?: string }>>()
      .notNull()
      .default([]),
    /** Unique key supplied by the client; prevents duplicate order submission. */
    idempotencyKey: text("idempotency_key").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    index("orders_phone_idx").on(t.phone),
    index("orders_created_idx").on(t.createdAt),
    index("orders_fulfilment_idx").on(t.fulfilmentStatus),
    index("orders_customer_idx").on(t.customerId),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    variantId: uuid("variant_id").references(() => productVariants.id, { onDelete: "set null" }),
    /** Snapshot of product data at time of order. */
    productName: text("product_name").notNull(),
    productSlug: text("product_slug").notNull(),
    gradeName: text("grade_name"),
    variantLabel: text("variant_label").notNull(),
    unitPricePaise: integer("unit_price_paise").notNull(),
    quantity: integer("quantity").notNull(),
    totalPaise: integer("total_paise").notNull(),
  },
  (t) => [index("order_items_order_idx").on(t.orderId)],
);

/* -------------------------------------------------------- bulk enquiries -- */

export const bulkEnquiries = pgTable(
  "bulk_enquiries",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    reference: text("reference").notNull().unique(),
    businessName: text("business_name").notNull(),
    contactPerson: text("contact_person").notNull(),
    mobile: text("mobile").notNull(),
    email: text("email"),
    buyerType: text("buyer_type").notNull(),
    /** Selected grade slugs; buyers often need several grades. */
    grades: jsonb("grades").$type<string[]>().notNull().default([]),
    quantityKg: integer("quantity_kg").notNull(),
    packagingPreference: text("packaging_preference"),
    deliveryCity: text("delivery_city").notNull(),
    deliveryState: text("delivery_state").notNull(),
    requirements: text("requirements"),
    status: text("status").$type<EnquiryStatus>().notNull().default("new"),
    adminNotes: text("admin_notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [index("bulk_enquiries_status_idx").on(t.status)],
);

/* -------------------------------------------------------- contact forms -- */

export const contactMessages = pgTable(
  "contact_messages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    subject: text("subject").notNull(),
    message: text("message").notNull(),
    status: text("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("contact_messages_status_idx").on(t.status)],
);

/* ------------------------------------------------------------- settings -- */

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

/* ------------------------------------------------ pincode serviceability -- */

export const pincodeRules = pgTable("pincode_rules", {
  /** Exact 6-digit PIN code. */
  pincode: text("pincode").primaryKey(),
  serviceable: boolean("serviceable").notNull().default(true),
  /** Override shipping charge; falls back to the default when null. */
  shippingPaise: integer("shipping_paise"),
  estDaysMin: integer("est_days_min"),
  estDaysMax: integer("est_days_max"),
  codAvailable: boolean("cod_available").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

/* --------------------------------------------------- stock adjustments -- */

export const stockAdjustments = pgTable(
  "stock_adjustments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    variantId: uuid("variant_id")
      .notNull()
      .references(() => productVariants.id, { onDelete: "cascade" }),
    productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
    changeQty: integer("change_qty").notNull(),
    previousQty: integer("previous_qty").notNull(),
    newQty: integer("new_qty").notNull(),
    reason: text("reason").notNull(),
    notes: text("notes"),
    reference: text("reference"),
    adjustedBy: text("adjusted_by"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("stock_adj_variant_idx").on(t.variantId),
    index("stock_adj_created_idx").on(t.createdAt),
  ],
);

export type Admin = typeof admins.$inferSelect;
export type Customer = typeof customers.$inferSelect;
export type CustomerSession = typeof customerSessions.$inferSelect;
export type CustomerAddress = typeof customerAddresses.$inferSelect;
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type Grade = typeof grades.$inferSelect;
export type Product = typeof products.$inferSelect;
export type ProductVariant = typeof productVariants.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type StockAdjustment = typeof stockAdjustments.$inferSelect;
export type BulkEnquiry = typeof bulkEnquiries.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type PincodeRule = typeof pincodeRules.$inferSelect;

/* ------------------------------------------------------------- relations -- */

export const adminsRelations = relations(admins, ({ many }) => ({
  sessions: many(adminSessions),
}));

export const adminSessionsRelations = relations(adminSessions, ({ one }) => ({
  admin: one(admins, { fields: [adminSessions.adminId], references: [admins.id] }),
}));

export const customersRelations = relations(customers, ({ many }) => ({
  sessions: many(customerSessions),
  addresses: many(customerAddresses),
  orders: many(orders),
}));

export const customerSessionsRelations = relations(customerSessions, ({ one }) => ({
  customer: one(customers, { fields: [customerSessions.customerId], references: [customers.id] }),
}));

export const customerAddressesRelations = relations(customerAddresses, ({ one }) => ({
  customer: one(customers, { fields: [customerAddresses.customerId], references: [customers.id] }),
}));

export const gradesRelations = relations(grades, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  grade: one(grades, { fields: [products.gradeId], references: [grades.id] }),
  variants: many(productVariants),
}));

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
  product: one(products, { fields: [productVariants.productId], references: [products.id] }),
  stockAdjustments: many(stockAdjustments),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  items: many(orderItems),
  collectedBy: one(admins, { fields: [orders.codCollectedBy], references: [admins.id] }),
  customer: one(customers, { fields: [orders.customerId], references: [customers.id] }),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  variant: one(productVariants, {
    fields: [orderItems.variantId],
    references: [productVariants.id],
  }),
}));

export const stockAdjustmentsRelations = relations(stockAdjustments, ({ one }) => ({
  variant: one(productVariants, {
    fields: [stockAdjustments.variantId],
    references: [productVariants.id],
  }),
  product: one(products, {
    fields: [stockAdjustments.productId],
    references: [products.id],
  }),
}));

// Keep sql import referenced for future raw queries.
void sql;
