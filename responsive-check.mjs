import "dotenv/config";
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = "http://localhost:3100";
const executablePath =
  process.env.CHROME_PATH ??
  "C:/Users/piyus/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe";
const shots = ".data/screenshots";
await mkdir(shots, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
const results = [];
function check(name, ok, detail = "") {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
}

const storefront = [
  "/",
  "/shop",
  "/shop?grade=6-suta&sort=price-asc",
  "/grades",
  "/grades/6-suta",
  "/product/phool-makhana-6-suta",
  "/cart",
  "/checkout",
  "/bulk-orders",
  "/about",
  "/contact",
  "/faqs",
  "/shipping-policy",
  "/returns-policy",
  "/privacy",
  "/terms",
  "/order-status",
  "/this-page-does-not-exist",
];

const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await mobile.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));

for (const route of storefront) {
  const res = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  check(`mobile ${route}`, res.status() < 500 && overflow <= 1, `status ${res.status()}, overflow ${overflow}px`);
}

// Mobile menu opens, is keyboard labelled, and closes on link click.
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Open navigation menu" }).click();
const dialog = page.getByRole("dialog", { name: "Navigation menu" });
check("mobile nav opens", await dialog.isVisible());
check("mobile nav lists all sections", (await dialog.getByRole("link").count()) >= 8);
await dialog.getByRole("link", { name: "Shop Makhana" }).click();
await page.waitForURL(/\/shop/);
check("mobile nav closes after navigation", !(await page.getByRole("dialog").isVisible().catch(() => false)));

// Screenshots for visual review.
for (const [name, route] of [
  ["home-mobile", "/"],
  ["shop-mobile", "/shop"],
  ["product-mobile", "/product/phool-makhana-6-suta"],
  ["grades-mobile", "/grades"],
  ["checkout-mobile", "/checkout"],
]) {
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `${shots}/${name}.png`, fullPage: true });
}

// Admin on mobile: login, confirm chrome/pages fit.
await page.goto(`${base}/admin/login`, { waitUntil: "networkidle" });
await page.fill("#admin-email", process.env.ADMIN_EMAIL);
await page.fill("#admin-password", process.env.ADMIN_PASSWORD);
await page.locator("#admin-password").press("Enter");
await page.waitForURL(`${base}/admin`, { timeout: 30000 });
for (const route of ["/admin", "/admin/orders", "/admin/enquiries", "/admin/products", "/admin/grades", "/admin/settings"]) {
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  check(`admin mobile ${route}`, overflow <= 1, `overflow ${overflow}px`);
}
await page.goto(`${base}/admin/products`, { waitUntil: "networkidle" });
await page.screenshot({ path: `${shots}/admin-products-mobile.png`, fullPage: true });

// Desktop screenshots.
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const dpage = await desktop.newPage();
for (const [name, route] of [
  ["home-desktop", "/"],
  ["shop-desktop", "/shop"],
  ["product-desktop", "/product/phool-makhana-6-suta"],
  ["grades-desktop", "/grades"],
  ["bulk-desktop", "/bulk-orders"],
  ["about-desktop", "/about"],
]) {
  await dpage.goto(`${base}${route}`, { waitUntil: "networkidle" });
  await dpage.screenshot({ path: `${shots}/${name}.png`, fullPage: true });
}

check("no uncaught browser errors", errors.length === 0, errors.slice(0, 3).join(" | "));

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) process.exitCode = 1;
