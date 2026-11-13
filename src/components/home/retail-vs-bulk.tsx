import Link from "next/link";

export function RetailVsBulk() {
  return (
    <section aria-labelledby="retail-bulk-heading" className="bg-ivory-100">
      <div className="section-shell py-16 sm:py-20">
        <h2 id="retail-bulk-heading" className="sr-only">
          Retail shopping and bulk supply
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-luxe flex flex-col p-8 sm:p-10">
            <p className="text-eyebrow">For Everyone</p>
            <h3 className="mt-3 font-serif text-[26px] text-forest-900 sm:text-[30px]">
              Shop for Everyday Enjoyment
            </h3>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-600">
              Select clearly described grades in retail pack sizes, with transparent pricing and
              Cash on Delivery available for serviceable PIN codes across India.
            </p>
            <ul className="mt-6 space-y-2.5 text-[13.5px] text-ink-700">
              {[
                "Retail packs in 100g, 200g, 400g, 500g & 1 kg",
                "Nitrogen-flushed, vacuum-sealed freshness pouches",
                "Cash on Delivery & online checkout across India",
                "Direct order reference & instant tracking lookup",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <Link href="/shop" className="btn-primary mt-8 w-fit">
              Shop Makhana
            </Link>
          </div>

          <div className="relative overflow-hidden bg-forest-900 p-8 text-ivory-100 botanical-grid sm:p-10">
            <div className="pointer-events-none absolute inset-4 border border-gold-500/20" aria-hidden="true" />
            <div className="relative">
              <p className="text-eyebrow !text-gold-400">For Businesses</p>
              <h3 className="mt-3 font-serif text-[26px] text-ivory-50 sm:text-[30px]">
                Source Makhana in Bulk
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-ivory-100/85">
                Official wholesale supply direct from Purnea, Bihar. Transparent 8-tier quotation
                starting from ₹350/kg up to ₹1,275/kg for 6+ HP. Packed in standard 8 kg White PP bags
                with 100μ liners for industrial distributors, exporters, and manufacturers.
              </p>
              <ul className="mt-6 space-y-2.5 text-[13.5px] text-ivory-100/90">
                {[
                  "8 commercial tiers: 3 Suta to 6+ HP (Ref: AVA/QTN/2026/038)",
                  "Standard 8 kg White PP bags with 100μ moisture liner",
                  "5% GST extra · Ex-Purnea freight · 7–10 days dispatch",
                  "Instant quotation calculator & letterhead download",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/bulk-orders" className="btn-gold mt-8">
                View Bulk Rate Card & Quotation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
