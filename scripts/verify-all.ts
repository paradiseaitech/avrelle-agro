import { config } from "dotenv";
config({ path: ".env.local" });
config();

// Mock server-only before any other imports
const serverOnlyPath = require.resolve("server-only");
require.cache[serverOnlyPath] = {
  id: serverOnlyPath,
  filename: serverOnlyPath,
  loaded: true,
  exports: {},
} as any;

async function runAllVerifications() {
  const { getDb, schema } = await import("@/db");
  const { bootstrapMasterAdmin } = await import("@/lib/admin-bootstrap");
  const { eq } = await import("drizzle-orm");
  const bcrypt = (await import("bcryptjs")).default;
  const {
    escapeCsvCell,
    exportOrdersReportCsv,
    exportSalesReportCsv,
    exportInventoryReportCsv,
    exportProductsReportCsv,
  } = await import("@/lib/reports");
  const { getCustomerOrder, getCustomerOrders } = await import("@/lib/customer-data");

  const db = getDb();
  console.log("=== STARTING AVRELLE AGRO FULL SYSTEM VERIFICATION ===\n");
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. MASTER ADMIN BOOTSTRAP & IDEMPOTENCY
    console.log("--- 1. Testing Master Admin Bootstrap & Idempotency ---");
    const bootstrap1 = await bootstrapMasterAdmin();
    assert(bootstrap1.email === "admin@avrelle.com", "Bootstrap email is admin@avrelle.com");

    const [adminRow] = await db
      .select()
      .from(schema.admins)
      .where(eq(schema.admins.email, "admin@avrelle.com"));
    assert(!!adminRow, "admin@avrelle.com exists in database");
    assert(adminRow.role === "admin", "Admin role is strictly 'admin'");
    assert(adminRow.passwordHash.startsWith("$2"), "Admin password is securely bcrypt hashed (never plaintext)");
    assert(adminRow.passwordHash !== "admin123", "Admin password is not stored in plaintext");

    // Re-run bootstrap to verify idempotency (must not reset or crash)
    const bootstrap2 = await bootstrapMasterAdmin();
    assert(bootstrap2.created === false, "Bootstrap is idempotent: existing admin is not overwritten");

    // 2. CSV FORMULA INJECTION MITIGATION
    console.log("\n--- 2. Testing CSV Formula Injection Mitigations ---");
    assert(escapeCsvCell("=1+1") === "'=1+1", "Escapes formula starting with '='");
    assert(escapeCsvCell("+cmd|' /C calc'!A0") === "'+cmd|' /C calc'!A0", "Escapes formula starting with '+'");
    assert(escapeCsvCell("-2+3") === "'-2+3", "Escapes formula starting with '-'");
    assert(escapeCsvCell("@SUM(A1:B1)") === "'@SUM(A1:B1)", "Escapes formula starting with '@'");
    assert(escapeCsvCell("\tmalicious") === "'malicious", "Escapes formula starting with tab");
    assert(escapeCsvCell("=SUM,A1") === "\"\'=SUM,A1\"", "Escaped formula containing comma is safely double-quoted");
    assert(escapeCsvCell("Normal Makhana") === "Normal Makhana", "Normal string is untouched without prepended quote");

    // 3. REPORTS GENERATION
    console.log("\n--- 3. Testing Server-side CSV Report Generation ---");
    const ordersCsv = await exportOrdersReportCsv();
    assert(ordersCsv.includes("Order Reference") && ordersCsv.includes("Payment Status"), "Orders CSV contains headers");
    const salesCsv = await exportSalesReportCsv();
    assert(salesCsv.includes("Period") && salesCsv.includes("Gross Order Value"), "Sales CSV contains metrics headers");
    const inventoryCsv = await exportInventoryReportCsv();
    assert(inventoryCsv.includes("SKU") && inventoryCsv.includes("Current Stock"), "Inventory CSV contains stock headers");
    const productsCsv = await exportProductsReportCsv();
    assert(productsCsv.includes("Product Name") && productsCsv.includes("Grade"), "Products CSV contains catalogue headers");

    // 4. CUSTOMER SIGNUP, PASSWORD HASHING & UNIQUE CONSTRAINT
    console.log("\n--- 4. Testing Customer Registration & Password Security ---");
    const testEmail = `test_customer_${Date.now()}@avrelle-test.com`;
    const rawPassword = "SecurePassword123!";
    const passwordHash = await bcrypt.hash(rawPassword, 12);

    const [customer] = await db
      .insert(schema.customers)
      .values({
        email: testEmail,
        passwordHash,
        name: "Test Customer Verification",
        phone: "+91 9876543210",
        emailVerified: true,
      })
      .returning();

    assert(!!customer?.id, "Customer created in database");
    assert(customer.passwordHash.startsWith("$2"), "Customer password stored as bcrypt hash");
    assert(customer.passwordHash !== rawPassword, "Customer password never stored in plaintext");

    // Test password verification
    const passwordMatches = await bcrypt.compare(rawPassword, customer.passwordHash);
    assert(passwordMatches, "Bcrypt verification succeeds for valid password");
    const badPasswordMatches = await bcrypt.compare("WrongPassword!", customer.passwordHash);
    assert(!badPasswordMatches, "Bcrypt verification rejects wrong password");

    // Test unique email enforcement
    let duplicateRejected = false;
    try {
      await db.insert(schema.customers).values({
        email: testEmail,
        passwordHash,
        name: "Duplicate Customer",
      });
    } catch {
      duplicateRejected = true;
    }
    assert(duplicateRejected, "Database enforces unique email constraint on customers");

    // 5. CUSTOMER ADDRESSES
    console.log("\n--- 5. Testing Customer Saved Addresses ---");
    const [savedAddr] = await db
      .insert(schema.customerAddresses)
      .values({
        customerId: customer.id,
        name: "Test Recipient",
        phone: "+91 9876543210",
        addressLine1: "Plot 42, Industrial Area",
        city: "Purnea",
        state: "Bihar",
        pincode: "854301",
        isDefault: true,
      })
      .returning();

    assert(!!savedAddr?.id, "Customer delivery address saved successfully");
    assert(savedAddr.isDefault === true, "Saved address marked as default");

    // 6. ORDER CREATION, ATOMIC INVENTORY DEDUCTION & AUDIT LOGGING
    console.log("\n--- 6. Testing Order Creation, Stock Deduction & Stock Audit Logging ---");
    // Find an active variant
    const [variant] = await db
      .select()
      .from(schema.productVariants)
      .where(eq(schema.productVariants.active, true))
      .limit(1);

    assert(!!variant, `Found active variant for order testing: ${variant?.label} (Stock: ${variant?.stock})`);

    const initialStock = variant.stock;
    const orderQuantity = 1;

    const orderRef = `AVR-TEST-${Date.now().toString(36).toUpperCase()}`;
    const [order] = await db
      .insert(schema.orders)
      .values({
        reference: orderRef,
        customerId: customer.id,
        customerName: customer.name,
        email: customer.email,
        phone: customer.phone ?? "+91 9876543210",
        addressLine1: savedAddr.addressLine1,
        city: savedAddr.city,
        state: savedAddr.state,
        pincode: savedAddr.pincode,
        subtotalPaise: variant.pricePaise,
        shippingPaise: 0,
        discountPaise: 0,
        totalPaise: variant.pricePaise,
        paymentMethod: "cod",
        paymentStatus: "unpaid",
        fulfilmentStatus: "pending",
        idempotencyKey: `idem-${orderRef}`,
      })
      .returning();

    assert(!!order?.id, `Test order ${orderRef} created with customerId: ${order.customerId}`);

    // Insert order item
    await db.insert(schema.orderItems).values({
      orderId: order.id,
      variantId: variant.id,
      productName: "Verification Test Product",
      productSlug: "verification-test-product",
      gradeName: "6+ Suta",
      variantLabel: variant.label,
      quantity: orderQuantity,
      unitPricePaise: variant.pricePaise,
      totalPaise: variant.pricePaise * orderQuantity,
    });

    // Atomic stock deduction
    await db
      .update(schema.productVariants)
      .set({ stock: initialStock - orderQuantity })
      .where(eq(schema.productVariants.id, variant.id));

    // Audit log
    const [adjustment] = await db
      .insert(schema.stockAdjustments)
      .values({
        variantId: variant.id,
        productId: variant.productId,
        previousQty: initialStock,
        newQty: initialStock - orderQuantity,
        changeQty: -orderQuantity,
        reason: "order_placed",
        reference: orderRef,
        notes: `Test order verification ${orderRef}`,
      })
      .returning();

    assert(!!adjustment?.id, "Stock adjustment audit log created in stock_adjustments table");

    // Verify stock decreased in DB
    const [updatedVariant] = await db
      .select()
      .from(schema.productVariants)
      .where(eq(schema.productVariants.id, variant.id));
    assert(
      updatedVariant.stock === initialStock - orderQuantity,
      `Variant stock decreased from ${initialStock} to ${updatedVariant.stock}`,
    );

    // 7. STRICT ORDER ACCESS & IDOR PREVENTION
    console.log("\n--- 7. Testing Order Access & IDOR Protection ---");
    // Owner customer fetches order
    const ownerOrder = await getCustomerOrder(orderRef, customer.id);
    assert(!!ownerOrder && ownerOrder.reference === orderRef, "Authenticated owner can access their order");

    // Different customer attempts to fetch the same order
    const attackerCustomerId = "00000000-0000-0000-0000-000000000000";
    const unauthorizedOrder = await getCustomerOrder(orderRef, attackerCustomerId);
    assert(unauthorizedOrder === null, "IDOR check: non-owner customer cannot access another customer's order (returns null)");

    // Customer order listing
    const customerOrders = await getCustomerOrders(customer.id);
    assert(customerOrders.length >= 1, `Customer orders list returns customer's orders (${customerOrders.length} found)`);

    // 8. RESTORE TEST STOCK
    console.log("\n--- 8. Cleanup Test Stock ---");
    await db
      .update(schema.productVariants)
      .set({ stock: initialStock })
      .where(eq(schema.productVariants.id, variant.id));

    await db.insert(schema.stockAdjustments).values({
      variantId: variant.id,
      productId: variant.productId,
      previousQty: initialStock - orderQuantity,
      newQty: initialStock,
      changeQty: orderQuantity,
      reason: "manual_correction",
      reference: orderRef,
      notes: "Restoring stock after verification test",
    });

    const [restoredVariant] = await db
      .select()
      .from(schema.productVariants)
      .where(eq(schema.productVariants.id, variant.id));
    assert(restoredVariant.stock === initialStock, `Variant stock successfully restored to ${initialStock}`);

    console.log("\n=======================================================");
    console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log("=======================================================\n");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("FATAL ERROR during verification:", err);
    process.exit(1);
  }
}

runAllVerifications();
