import "dotenv/config";
import { chromium } from "playwright";
import { Pool } from "pg";
import { unlink } from "node:fs/promises";
import path from "node:path";

const base = "http://localhost:3100";
const executablePath =
  process.env.CHROME_PATH ??
  "C:/Users/piyus/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const suffix = String(Date.now()).slice(-6);
const results = [];
async function waitUntil(fn, label, timeout = 20000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await fn()) return;
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Timed out waiting for: ${label}`);
}

function check(name, condition, detail = "") {
  results.push({ name, ok: Boolean(condition), detail });
  console.log(`${condition ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
  if (!condition) process.exitCode = 1;
}

const [variant] = (
  await pool.query(
    `select v.id, v.label, v.stock, v.price_paise, p.slug, p.name
       from product_variants v
       join products p on p.id = v.product_id
      where p.status = 'published' and p.retail_available = true
        and v.active = true and v.stock >= 10
      order by v.sort_order, v.created_at
      limit 1`,
  )
).rows;

if (!variant) {
  console.error("No sellable variant with stock >= 10 to test with.");
  process.exit(1);
}

const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
const page = await context.newPage();
page.on("dialog", (d) => d.accept());
const issues = [];
page.on("pageerror", (e) => issues.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error" && !/favicon|Download the React DevTools/.test(m.text())) {
    issues.push(`console: ${m.text()}`);
  }
});

let orderReference = null;
let enquiryReference = null;
let productId = null;
let uploadedUrl = null;
let pincodeRuleAdded = false;

try {
  /* ---------------------------------------------------------------- storefront */
  await page.goto(`${base}/product/${variant.slug}`);
  check("product page loads", (await page.locator("h1").first().textContent())?.includes(variant.name));

  await page.locator("fieldset button", { hasText: variant.label }).first().click();
  await page.fill("#pdp-qty", "2");
  await page.getByRole("button", { name: /Add to Cart/i }).click();
  await page.waitForTimeout(400);
  check("add to cart shows confirmation", await page.getByText(/Added to Cart/).isVisible());

  await page.goto(`${base}/checkout`);
  await page.getByText(variant.name, { exact: false }).first().waitFor({ timeout: 15000 });
  check("checkout shows cart line", true);

  await page.fill("#co-name", "Smoke Test Customer");
  await page.fill("#co-phone", "9876501234");
  await page.fill("#co-email", "smoke@example.com");
  await page.fill("#co-a1", "12 Test House");
  await page.fill("#co-a2", "MG Road");
  await page.fill("#co-city", "Patna");
  await page.selectOption("#co-state", "Bihar");
  await page.fill("#co-pin", "800001");
  await page.waitForTimeout(1600);
  await page.getByText(/Delivery available/).first().waitFor({ timeout: 15000 });
  const pinText = await page.getByText(/Delivery available/).first().innerText();
  check("PIN code serviceability response", /delivery available/i.test(pinText), pinText.trim());

  const placeButton = page.getByRole("button", { name: /Place Order/i });
  await placeButton.click();
  await page.waitForURL(/\/order-confirmation\//, { timeout: 30000 });
  orderReference = decodeURIComponent(page.url().split("/").pop() ?? "");
  check("order confirmation page reached", /^AVG-[A-Z0-9]+$/.test(orderReference), orderReference);

  const afterOrder = (
    await pool.query(
      `select o.*, (select stock from product_variants where id = $2) as stock_now
         from orders o where o.reference = $1`,
      [orderReference, variant.id],
    )
  ).rows[0];

  check("order persisted with COD method", afterOrder?.payment_method === "cod");
  check("order total is server-computed sum", afterOrder?.total_paise === afterOrder?.subtotal_paise + afterOrder?.shipping_paise);
  check("order status pending / unpaid", afterOrder?.fulfilment_status === "pending" && afterOrder?.payment_status === "unpaid");
  check("stock decremented atomically by 2", afterOrder?.stock_now === variant.stock - 2, `${variant.stock} -> ${afterOrder?.stock_now}`);

  const [item] = (await pool.query("select * from order_items where order_id = $1", [afterOrder.id])).rows;
  check("order item snapshot stored", item?.variant_id === variant.id && item?.quantity === 2);

  // Duplicate order key is unique at the database level.
  let duplicateBlocked = false;
  try {
    await pool.query(
      `insert into orders (reference, customer_name, phone, address_line1, city, state, pincode,
         subtotal_paise, total_paise, idempotency_key)
       values ('AVG-TEST01', 'Dup', '9876501234', 'x', 'Patna', 'Bihar', '800001', 1, 1, $1)`,
      [afterOrder.idempotency_key],
    );
  } catch {
    duplicateBlocked = true;
  }
  check("duplicate idempotency key rejected by DB", duplicateBlocked);

  /* ------------------------------------------------------------- order lookup */
  await page.goto(`${base}/order-status`);
  await page.fill("#os-ref", orderReference);
  await page.fill("#os-phone", "9876501234");
  await page.getByRole("button", { name: "Check Status" }).click();
  await page.waitForTimeout(1500);
  const lookupBody = await page.locator("body").innerText();
  check("order lookup finds order", lookupBody.includes(orderReference) && /pending/i.test(lookupBody));

  /* ------------------------------------------------------------------- admin */
  await page.goto(`${base}/admin/login`);
  await page.fill("#admin-email", process.env.ADMIN_EMAIL);
  await page.fill("#admin-password", process.env.ADMIN_PASSWORD);
  await page.locator("#admin-password").press("Enter");
  await page.waitForURL(`${base}/admin`, { timeout: 30000 });
  check("admin signed in", page.url() === `${base}/admin`);

  await page.goto(`${base}/admin/orders/${orderReference}`);
  check("admin order detail renders", await page.getByText(orderReference).first().isVisible());

  await page.selectOption("#next-status", "confirmed");
  await page.fill("#status-note", "Smoke test confirmation");
  await page.getByRole("button", { name: "Save Status" }).click();
  await page.waitForSelector("text=Status updated.", { timeout: 15000 });
  const confirmed = (await pool.query("select * from orders where reference = $1", [orderReference])).rows[0];
  check("order status updated to confirmed", confirmed.fulfilment_status === "confirmed");
  check("status history appended", Array.isArray(confirmed.status_history) && confirmed.status_history.length >= 2);

  await page.getByRole("button", { name: /Record COD Collected/i }).click();
  await page.waitForSelector("text=COD collection recorded.", { timeout: 15000 });
  const paid = (await pool.query("select * from orders where reference = $1", [orderReference])).rows[0];
  check("COD collection recorded", paid.payment_status === "paid" && Boolean(paid.cod_collected_at));

  await page.selectOption("#next-status", "cancelled");
  await page.getByRole("button", { name: "Save Status" }).click();
  await waitUntil(async () => {
    const row = (await pool.query("select fulfilment_status from orders where reference = $1", [orderReference])).rows[0];
    return row?.fulfilment_status === "cancelled";
  }, "order cancellation");
  const cancelled = (await pool.query("select * from orders where reference = $1", [orderReference])).rows[0];
  const stockRestored = (await pool.query("select stock from product_variants where id = $1", [variant.id])).rows[0].stock;
  check("cancelling restores stock", cancelled.fulfilment_status === "cancelled" && stockRestored === variant.stock, `stock ${stockRestored}`);

  /* --------------------------------------------------------- bulk enquiries */
  await page.goto(`${base}/bulk-orders`);
  await page.fill("#be-biz", `Smoke Foods ${suffix}`);
  await page.fill("#be-person", "Smoke Buyer");
  await page.fill("#be-mobile", "9876505678");
  await page.fill("#be-email", "buyer@example.com");
  await page.selectOption("#be-buyer", { index: 1 });
  await page.getByRole("button", { name: /4 Suta|6\+ Suta/ }).first().click();
  await page.fill("#be-qty", "500");
  await page.selectOption("#be-pack", { index: 1 });
  await page.fill("#be-city", "Mumbai");
  await page.fill("#be-state", "Maharashtra");
  await page.fill("#be-req", "Smoke test enquiry — please ignore.");
  await page.getByRole("button", { name: "Submit Enquiry" }).click();
  await page.waitForSelector("text=Enquiry received", { timeout: 20000 });
  const refEl = page.locator("text=/^BME-[A-Z0-9]+$/").first();
  enquiryReference = (await refEl.textContent())?.trim() ?? null;
  check("bulk enquiry reference generated", Boolean(enquiryReference && /^BME-/.test(enquiryReference)), enquiryReference);

  const enquiryRow = (
    await pool.query("select id from bulk_enquiries where reference = $1", [enquiryReference])
  ).rows[0];
  await page.goto(`${base}/admin/enquiries/${enquiryRow.id}`);
  await page.selectOption("#enquiry-status", "quoted");
  await page.fill("#enquiry-notes", "Smoke test note");
  await page.getByRole("button", { name: "Save Enquiry" }).click();
  await page.waitForSelector("text=Enquiry updated.", { timeout: 15000 });
  const enquiry = (await pool.query("select * from bulk_enquiries where reference = $1", [enquiryReference])).rows[0];
  check("enquiry persisted and updated in admin", enquiry?.status === "quoted" && enquiry?.admin_notes === "Smoke test note");

  /* ------------------------------------------------------------ product CRUD */
  const productName = `Smoke Test Makhana ${suffix}`;
  const productSlug = `smoke-test-makhana-${suffix}`;
  await page.goto(`${base}/admin/products/new`);
  await page.fill("#p-name", productName);
  await page.fill("#p-slug", productSlug);
  await page.selectOption("#p-status", "draft");
  await page.fill("#p-tagline", "Smoke test product");
  await page.getByRole("button", { name: "Create Product" }).click();
  await page.waitForURL(/\/admin\/products\/[0-9a-f-]+\?created=1/, { timeout: 30000 });
  productId = page.url().split("/admin/products/")[1].split("?")[0];
  const created = (await pool.query("select * from products where id = $1", [productId])).rows[0];
  check("product created via admin", created?.slug === productSlug && created?.status === "draft");

  await page.fill("#new-v-label", "100 g");
  await page.fill("#new-v-weight", "100");
  await page.fill("#new-v-price", "199");
  await page.fill("#new-v-stock", "7");
  await page.getByRole("button", { name: "Add Variant" }).click();
  await page.waitForSelector("text=Variant added.", { timeout: 15000 });
  const [newVariant] = (await pool.query("select * from product_variants where product_id = $1", [productId])).rows;
  check("variant added with rupee->paise conversion", newVariant?.price_paise === 19900 && newVariant?.stock === 7);

  await page.locator('input[name="stock"]').first().fill("9");
  await page.getByRole("button", { name: "Save Variant" }).first().click();
  await page.waitForSelector("text=Variant saved.", { timeout: 15000 });
  const editedStock = (await pool.query("select stock from product_variants where product_id = $1", [productId])).rows[0].stock;
  check("variant stock edit saved", editedStock === 9, String(editedStock));

  // Upload a 1x1 transparent PNG through the admin upload route.
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    "base64",
  );
  await page.setInputFiles('input[type="file"]', { name: "smoke.png", mimeType: "image/png", buffer: png });
  await page.waitForSelector('img[src^="/api/files/"]', { timeout: 20000 });
  uploadedUrl = await page.locator('img[src^="/api/files/"]').first().getAttribute("src");
  check("image upload returns served URL", Boolean(uploadedUrl?.startsWith("/api/files/")), uploadedUrl ?? "");

  await page.getByRole("button", { name: "Save Changes" }).click();
  await page.waitForSelector("text=Saved. Storefront pages have been refreshed.", { timeout: 15000 });
  const withImage = (await pool.query("select images from products where id = $1", [productId])).rows[0];
  check("product image persisted", Array.isArray(withImage?.images) && withImage.images[0] === uploadedUrl);

  const imageResponse = await page.request.get(`${base}${uploadedUrl}`);
  check("uploaded image served over HTTP", imageResponse.status() === 200);

  await page.getByRole("button", { name: "Delete Product" }).click();
  await page.waitForURL(/\/admin\/products\?deleted=1/, { timeout: 20000 });
  const deleted = (await pool.query("select count(*)::int as n from products where id = $1", [productId])).rows[0].n;
  check("product deleted via admin", deleted === 0);

  /* -------------------------------------------------------------- PIN rules */
  await page.goto(`${base}/admin/settings`);
  await page.fill("#new-pin-pin", "110001");
  await page.fill("#new-pin-ship", "99");
  await page.getByRole("button", { name: "Add PIN Rule" }).click();
  await page.waitForSelector("text=PIN rule saved.", { timeout: 15000 });
  const pinRule = (await pool.query("select * from pincode_rules where pincode = '110001'")).rows[0];
  pincodeRuleAdded = Boolean(pinRule);
  check("PIN rule saved with paise conversion", pinRule?.shipping_paise === 9900 && pinRule?.serviceable === true);
} catch (error) {
  console.error("FLOW FAILURE:", error);
  process.exitCode = 1;
} finally {
  console.log("browser issues:", issues.length ? issues : "none");

  /* ---------------------------------------------------------------- cleanup */
  try {
    if (orderReference) {
      const order = (
        await pool.query("select id, fulfilment_status from orders where reference = $1", [orderReference])
      ).rows[0];
      if (order) {
        // If the test stopped before cancellation, put reserved stock back before deleting.
        if (order.fulfilment_status !== "cancelled") {
          const items = (
            await pool.query("select variant_id, quantity from order_items where order_id = $1", [order.id])
          ).rows;
          for (const item of items) {
            if (!item.variant_id) continue;
            await pool.query("update product_variants set stock = stock + $2 where id = $1", [
              item.variant_id,
              item.quantity,
            ]);
          }
        }
        await pool.query("delete from order_items where order_id = $1", [order.id]);
        await pool.query("delete from orders where id = $1", [order.id]);
      }
      await pool.query("delete from orders where reference = 'AVG-TEST01'");
    }
    if (enquiryReference) {
      await pool.query("delete from bulk_enquiries where reference = $1", [enquiryReference]);
    }
    if (pincodeRuleAdded) {
      await pool.query("delete from pincode_rules where pincode = '110001'");
    }
    if (productId) {
      await pool.query("delete from products where id = $1", [productId]);
    }
    if (uploadedUrl) {
      await unlink(path.join(process.cwd(), ".data", "uploads", path.basename(uploadedUrl))).catch(() => {});
    }
    console.log("cleanup complete");
  } catch (cleanupError) {
    console.error("CLEANUP ERROR:", cleanupError);
  }

  await browser.close();
  await pool.end();

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  if (failed.length) {
    console.log("failed checks:", failed.map((f) => f.name).join(", "));
  }
}
