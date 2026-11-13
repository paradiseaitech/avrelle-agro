# AVRELLE AGRO PVT LTD — Makhana Storefront

A complete, production-oriented e-commerce website for **AVRELLE AGRO PVT LTD**, a
makhana (fox nut / phool makhana) business based in Purnea, Bihar, India.

The site covers two distinct sales motions:

1. **Retail** — browse graded makhana, add to cart, place a Cash-on-Delivery order,
   and track it with the order reference.
2. **Bulk / wholesale** — submit a detailed enquiry, receive a reference number,
   and let the team follow up with a written quotation. Bulk flow is deliberately
   separate from retail checkout and never reuses retail prices.

A password-protected admin dashboard manages the catalogue, stock, orders,
enquiries, contact messages, homepage content, shipping rules, and PIN-code
serviceability.

Tagline used across the site: **Quality. Consistency. Trust.**

---

## Contents

- [Customer authentication & account portal](#customer-authentication--account-portal)
- [Mandatory login before checkout](#mandatory-login-before-checkout)
- [Master administrator bootstrap](#master-administrator-bootstrap)
- [Role-based access control](#role-based-access-control)
- [Inventory & stock management](#inventory--stock-management)
- [Admin dashboard](#admin-dashboard)
- [Business reports & CSV exports](#business-reports--csv-exports)
- [Storefront map](#storefront-map)
- [Sample data and launch checklist](#sample-data-and-launch-checklist)
- [Image storage](#image-storage)
- [Security notes](#security-notes)
- [Testing & automated verification](#testing--automated-verification)
- [Deployment](#deployment)

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, custom design tokens in `src/app/globals.css` |
| Fonts | Fraunces (serif headings) + Inter (body) via `next/font` |
| Database | PostgreSQL (Supabase) via Drizzle ORM; embedded PGlite for local dev |
| Customer Auth | Dedicated `customers` & `customer_sessions` tables, bcrypt hashing, httpOnly session cookies |
| Admin Auth | `admins` & `admin_sessions` tables, bcrypt hashing, mandatory first-login password change |
| Validation | Zod schemas shared across client forms and server actions |
| Images | Local disk (`.data/uploads`) or Supabase Storage |
| Reports | Server-side streaming CSV with Spreadsheet Formula Injection escaping |

Money is stored everywhere as **integer paise** to avoid floating-point errors.

---

## Customer authentication & account portal

Customers have a dedicated authentication and portal experience matching AVRELLE AGRO's luxury branding:

- **Signup** (`/signup`): Full name, email, optional mobile, password validation (min 8 chars, letter + number), and terms & privacy policy consent. Duplicate emails are strictly rejected.
- **Login** (`/login`): Email/password with show/hide password toggle, rate-limiting protection, and redirect preservation (`?redirect=...`).
- **Password Reset** (`/forgot-password` and `/reset-password`): Cryptographic one-time token generation, SHA-256 token hashing, 1-hour expiration, and password update flow.
- **Account Portal** (`/account`):
  - Personal Information management (name, phone).
  - Saved Delivery Addresses with 1-click default address selection.
  - Complete Order History with live status tags.
- **Order Tracking** (`/account/orders/[reference]`):
  - Visual milestone timeline: `Order Placed` → `Confirmed` → `Processing & Packed` → `Shipped` → `Out for Delivery` → `Delivered`.
  - Cancelled order state representation.
  - Real-time timestamp tracking and strict customer IDOR protection (customers can only view their own orders).

---

## Mandatory login before checkout

Guest checkout is disabled for order placement:
- Attempting to checkout unauthenticated presents an authentication modal preserving cart contents.
- Cart items and variant quantities survive authentication seamlessly.
- Upon successful login or signup, the user is immediately returned to `/checkout`.
- Direct API calls to `placeOrder` without a valid customer session are rejected on the server.
- Stock availability and prices are revalidated server-side before order creation.

---

## Master administrator bootstrap

A secure bootstrap mechanism provisions the initial master administrator:
- **Email**: `admin@avrelle.com`
- **Initial Setup Password**: `admin123` (configured via server environment variable `ADMIN_BOOTSTRAP_PASSWORD`).
- **Security Protections**:
  - Passwords are never stored in plaintext (stored using bcrypt with 12 salt rounds).
  - Credentials are never exposed in frontend bundles or client code.
  - **Mandatory First-Login Password Change**: `mustChangePassword: true` forces the administrator to set a new password at `/admin/change-password` before granting access to dashboard operations.
  - **Idempotent**: Re-running the bootstrap process (`npx tsx scripts/bootstrap-admin.ts`) does not overwrite an existing admin or reset an already modified password.

To manually run bootstrap:
```bash
npx --env-file=.env.local tsx scripts/bootstrap-admin.ts
```

---

## Role-based access control

The application strictly enforces server-side RBAC across routes, actions, and API endpoints:
- `CUSTOMER`: Can manage personal profile, saved addresses, and access their own orders. Cannot access `/admin`, modify catalogue, or alter order statuses.
- `ADMIN`: Full access to the admin dashboard, catalogue CRUD, inventory adjustments, order management, and downloadable reports.
- Non-admin attempts to access `/admin` automatically redirect authenticated customers to `/account` and unauthenticated users to `/admin/login`.

---

## Inventory & stock management

- Variant stock quantities and configurable `lowStockThreshold` values.
- Low-stock and out-of-stock badges and alerts in both admin and storefront.
- Atomic stock reservation and deduction upon order placement.
- Complete stock movement audit log in `stock_adjustments` table recording previous quantity, new quantity, change amount, reason (`order_placed`, `manual_correction`, `restock`, `damage`), reference, and actor.
- Dedicated admin inventory view at `/admin/inventory` with quick stock adjustment modals.

---

## Admin dashboard

- URL: `/admin` (guarded by `requireAdmin`).
- Key Operational Metrics:
  - Total Orders, Orders Today, Pending Confirmation, Awaiting Dispatch, Out for Delivery, Delivered, and Cancelled counts.
  - Total Order Value (excluding cancelled orders).
  - Delivered Orders Value.
  - Collected COD (verified cash collections).
  - Unfulfilled COD orders and values.
  - Low-stock variants and out-of-stock indicators.
- Date filters: `Today`, `7 Days`, `30 Days`, and `All Time`.
- Order Management (`/admin/orders`):
  - Order search by reference, customer name, phone, or email.
  - Status filters and sorting.
  - Order status transitions with timeline logging.
  - Separate payment status (`UNPAID`, `PAID`, `FAILED`, `REFUNDED`) and COD collection recording.
  - Packing slip / printable order receipt view.
- Catalogue CRUD (`/admin/products`):
  - Add/edit products with slug, description, category, makhana grade, SEO meta titles/descriptions.
  - Variant pack sizes (250g, 500g, 1kg), SKU, and pricing.
  - Safe deletion / archiving: products with existing order history are archived rather than cascaded, preserving historical receipts.

---

## Business reports & CSV exports

Located at `/admin/reports` (and authenticated download API at `/api/admin/reports`):
- **Orders Report**: Comprehensive register with references, customer contact, delivery destination, item breakdown, and financial totals.
- **Sales Summary Report**: Financial reconciliation distinguishing gross order value, delivered value, collected COD revenue, and outstanding transit COD.
- **Warehouse Inventory Report**: Real-time stock levels, low-stock thresholds, and replenishment status.
- **Product Catalogue Report**: Slugs, grades, variant pricing ranges, total stock, and SEO metadata.
- **Spreadsheet Security**: Implements CSV formula injection mitigation (`escapeCsvCell`) prefixing any value starting with `=`, `+`, `-`, `@`, `\t`, or `\r` with a single quote (`'`). Sensitive credentials and session tokens are strictly excluded from exports.

---

## Testing & automated verification

Automated integration test suite verifying 33 critical release criteria:
```bash
# Run TypeScript compilation check
npm run typecheck

# Run full integration test suite against database
npx tsx scripts/verify-all.ts
```

What `verify-all.ts` validates:
1. Master admin bootstrap & idempotency.
2. CSV formula injection mitigation and cell formatting.
3. Server-side CSV report generation for all 4 report types.
4. Customer registration, bcrypt password hashing, and unique email constraints.
5. Customer saved address creation and default setting.
6. Order placement, atomic stock deduction, and `stock_adjustments` audit logging.
7. Strict customer order ownership checks and IDOR prevention.
8. Restoration of test stock.
| Messages | Read contact-form submissions and mark them handled |
| Settings | Announcement bar, hero copy, brand story, shipping charges, business details, PIN rules, password change |

Roles: `owner` and `admin` may mutate data; the guard checks the session and role
on the server for every action.

---

## Storefront map

| Route | Purpose |
| --- | --- |
| `/` | Hero, trust highlights, grade categories, featured products, grade education, retail vs bulk, brand story |
| `/shop` | Full catalogue with grade and sort filters |
| `/grades`, `/grades/[slug]` | Grade reference (indicative size ranges) and per-grade detail |
| `/product/[slug]` | Product detail, pack-size picker, add to cart |
| `/cart` | Cart with quantity controls |
| `/checkout` | Address + COD checkout with PIN serviceability |
| `/order-confirmation/[reference]` | Post-order confirmation |
| `/order-status` | Track an order by reference + mobile number |
| `/bulk-orders` | Bulk enquiry form |
| `/about`, `/contact`, `/faqs` | Company, contact form, FAQ |
| `/shipping-policy`, `/returns-policy`, `/privacy`, `/terms` | Policies |

Published grade reference ranges (indicative, batch-dependent):

| Grade | Approx. size |
| --- | --- |
| 6+ Suta | ~19–24 mm |
| 5 Suta | ~15.7–19 mm |
| 4 Suta | ~12.5–15.5 mm |
| 3 Suta | ~9–12.3 mm |
| Thurr(i) | ~6–8 mm |

Thurr(i) is published for awareness but has no retail product line; its page
routes buyers to the bulk enquiry form.

---

## Sample data and launch checklist

The seed inserts **clearly labelled sample data**:

- 4 products across 6+, 5, 4 and 3 Suta, each with `uses_sample_prices = true`.
- A storefront banner (`SampleDataNotice`) appears while any product still uses
  sample prices, so live prices are never confused with placeholders.

Before going live:

1. Replace every sample retail price in `/admin/products` and clear the
   **uses sample prices** flag on each product. The banner disappears once no
   product has the flag set.
2. Confirm real stock quantities for every variant.
3. Upload real product photography and a real logo (see
   [Image storage](#image-storage)); replace the placeholder files in
   `public/brand/`.
4. Set `NEXT_PUBLIC_SITE_URL` to the real domain and update the business details
   in `/admin/settings` (phone, email, WhatsApp).
5. Replace the seeded admin password with a unique one via `/admin/settings`.
6. Review the shipping charge, free-shipping threshold, COD fee, delivery
   estimates, and any PIN-code rules.
7. Publish GST details only after they are independently verified — the settings
   form deliberately keeps GST unpublished until you enable it.
8. Do not add certifications, lab claims, health claims, review counts, ratings,
   export/farmer claims, or social profiles until the business can substantiate
   them. None are present in the current content.

---

## Image storage

Set `IMAGE_STORAGE_PROVIDER` to choose where admin uploads go:

- **`local`** (default) — files are written to `.data/uploads` and served from
  `/api/files/<name>`. Suitable for development and single-server hosting with a
  persistent volume. `.data/` is git-ignored.
- **`supabase`** — uploads go to the configured Supabase Storage bucket and the
  public URL is stored on the product. Recommended for serverless hosting.

Allowed upload types are JPG, PNG, WebP and AVIF, up to 5 MB. Uploads require an
authenticated admin session.

---

## Security notes

- **Server-authoritative pricing.** The cart sends only variant IDs and
  quantities; the server reloads products, recomputes subtotal, shipping, COD
  fee, and totals from the database before writing an order.
- **Transactional stock.** Stock is reserved with a conditional
  `UPDATE ... WHERE stock >= quantity` inside a transaction, so concurrent
  checkouts cannot oversell. Cancelling an order returns the stock.
- **Idempotency.** Each checkout session generates one idempotency key; retrying
  the same submission returns the original order instead of creating a duplicate
  (enforced by a unique constraint).
- **Abuse prevention.** Rate limiters protect order placement, order lookup,
  login, and the PIN lookup endpoint.
- **PIN serviceability** and COD eligibility are verified server-side, not just
  in the browser.
- **Admin auth** uses bcrypt, hashed session tokens, httpOnly cookies, 7-day
  expiry, and server-side role checks on every mutating action.

---

## Testing

Automated checks used during development (Playwright scripts live at the repo
root and are not part of the production bundle):

- `smoke-admin.mjs` — admin login failure/success, all panel pages, sign-out,
  and post-logout redirect protection.
- `smoke-flow.mjs` — the full retail + admin path (see results below).
- `responsive-check.mjs` — every storefront and admin route at 390 px and
  1440 px, checking status codes, horizontal overflow, the mobile menu, and
  capturing screenshots to `.data/screenshots`.

The scripts need a dev server on port 3100 and Playwright's Chromium:

```bash
npm install --no-save playwright
npm run dev -- --port 3100
node smoke-flow.mjs
node responsive-check.mjs
```

### Recorded results

`smoke-flow.mjs` — **28/28 checks passed**:

- Product page loads; pack size selectable; add-to-cart confirmation.
- Cart line rendered on checkout; PIN `800001` returns a serviceable response.
- COD order placed; reference matches `AVG-######`.
- Order persisted with method `cod`, status `pending`, payment `unpaid`.
- Server-computed total equals subtotal + shipping (COD fee folded in).
- Stock decremented atomically by the ordered quantity.
- Order-item snapshot stored (variant id + quantity).
- A duplicate idempotency key is rejected at the database level.
- Order lookup by reference + mobile finds the order.
- Admin login works; order detail renders.
- Status change to `confirmed` is persisted with an appended history entry.
- COD collection recorded (payment `paid`, timestamp set).
- Cancelling the order restores stock to its original value.
- Bulk enquiry submitted; reference matches `BME-#####`; visible and updatable
  in the admin panel.
- Product created via admin; variant added with rupee→paise conversion; variant
  stock edit saved.
- Image uploaded, served over HTTP, persisted on the product, and deleted with it.
- PIN rule saved with correct paise conversion.

`responsive-check.mjs` — **28/28 checks passed**: all storefront routes return
200 (unknown URL returns 404), all admin panel routes fit a 390 px viewport with
zero horizontal overflow, the mobile menu opens/lists/closes correctly, and no
uncaught browser errors were recorded.

`npm run lint` — 0 errors (remaining warnings are `next/image` suggestions for
SVG placeholders and content images). `npm run build` — production build
succeeds and type-checks cleanly.

---

## Deployment

1. Provision Postgres (Supabase) and set `DATABASE_URL` plus the Supabase and
   site-URL variables in your host's environment settings.
2. Run migrations against production once: `npm run db:migrate`, then
   `npm run db:seed` if you want the sample catalogue to start from.
3. Set `IMAGE_STORAGE_PROVIDER="supabase"` (and the storage variables) if you
   are deploying to a serverless platform without a persistent disk.
4. Build and start: `npm run build && npm run start` (or deploy to Vercel and let
   it run the build).
5. Log in at `/admin`, change the password, and finish the
   [launch checklist](#sample-data-and-launch-checklist).

---

## Known limitations / unfinished work

- **Retail prices are placeholders.** All products ship with
  `uses_sample_prices = true` and the storefront shows a sample-data notice until
  you replace them.
- **Online payments are not enabled.** Checkout is Cash on Delivery only. The
  order model already separates `payment_method` from `payment_status` and has a
  `discount_paise` column, so a payment gateway can be added without a schema
  redesign. No card details are ever collected.
- **Rate limiters are in-memory per process.** They are effective on a single
  server; a multi-instance deployment should back them with Redis or a database.
- **Local image storage needs a persistent volume.** Use Supabase Storage on
  serverless hosts.
- **Brand assets are placeholders.** The SVGs in `public/brand/` are sized and
  named as drop-in slots for the real logo, hero, pack mockups, and grade
  illustrations.
- **Tracking is status-based.** There is no courier API integration; fulfilment
  status and notes are updated manually in the admin panel.
- **Order status emails/SMS are not sent.** Confirmation is shown on-screen and
  orders are look-up-able by reference + mobile. Notifications would be a
  follow-up integration.
- **Single admin role set.** `owner` and `admin` behave identically today; the
  role column exists for finer-grained permissions later.
- **GST details are intentionally unpublished** until verified.
