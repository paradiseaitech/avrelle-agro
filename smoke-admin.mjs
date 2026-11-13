import "dotenv/config";
import { chromium } from "playwright";

const base = "http://localhost:3100";
const executablePath =
  process.env.CHROME_PATH ??
  "C:/Users/piyus/AppData/Local/ms-playwright/chromium-1208/chrome-win64/chrome.exe";

const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
const page = await context.newPage();
const issues = [];
page.on("pageerror", (e) => issues.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error" && !/favicon/.test(m.text())) issues.push(`console: ${m.text()}`);
});

try {
  // Unauthenticated /admin must redirect.
  await page.goto(`${base}/admin`);
  console.log("unauth /admin ->", page.url());

  // Wrong password should show a generic error.
  await page.goto(`${base}/admin/login`);
  await page.fill("#admin-email", process.env.ADMIN_EMAIL);
  await page.fill("#admin-password", "definitely-wrong-password");
  await page.click('button[type="submit"]');
  await page.waitForSelector("text=Invalid email or password.", { timeout: 20000 });
  console.log("bad login alert shown");

  // Correct login without reloading (retry after failure).
  console.log("email preserved after failure:", JSON.stringify(await page.inputValue("#admin-email")));
  await page.fill("#admin-password", process.env.ADMIN_PASSWORD);
  await page.locator("#admin-password").press("Enter");
  await page.waitForURL(`${base}/admin`, { timeout: 30000 });
  console.log("signed in ->", page.url());

  for (const path of [
    "/admin",
    "/admin/orders",
    "/admin/enquiries",
    "/admin/messages",
    "/admin/products",
    "/admin/grades",
    "/admin/settings",
  ]) {
    const response = await page.goto(`${base}${path}`);
    console.log(path, response?.status(), "|", (await page.title()).trim());
  }

  // Open the first real product edit screen.
  await page.goto(`${base}/admin/products`);
  const href = await page
    .locator('a[href^="/admin/products/"]:not([href="/admin/products/new"])')
    .first()
    .getAttribute("href");
  if (href) {
    const response = await page.goto(`${base}${href}`);
    console.log(href, response?.status(), "|", (await page.title()).trim());
    const heading = await page.locator("h1").first().textContent();
    console.log("edit heading:", heading?.trim());
  }

  // Sign out.
  await page.goto(`${base}/admin`);
  await page.locator('button:text-is("Sign out"):visible').first().click();
  await page.waitForURL("**/admin/login", { timeout: 15000 });
  console.log("signed out ->", page.url());

  const after = await page.goto(`${base}/admin`);
  console.log("post-logout /admin ->", after?.url());
} catch (error) {
  console.error("TEST FAILURE:", error);
  process.exitCode = 1;
} finally {
  console.log("console/page issues:", issues.length ? issues : "none");
  await browser.close();
}
