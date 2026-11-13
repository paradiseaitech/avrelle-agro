const HIGHLIGHTS = [
  {
    title: "Sourced from Bihar",
    body: "Makhana (fox nuts) from Purnea, Bihar — one of India's established makhana regions.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" strokeLinejoin="round" />
        <circle cx="12" cy="10" r="2.4" />
      </svg>
    ),
  },
  {
    title: "Clearly Graded Sizes",
    body: "Choose from 3 Suta, 4 Suta, 5 Suta and 6+ Suta grades, with reference size ranges published openly.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <circle cx="7" cy="15" r="4" />
        <circle cx="15" cy="11" r="5.4" />
        <circle cx="18.5" cy="6" r="2.6" />
      </svg>
    ),
  },
  {
    title: "Retail & Wholesale",
    body: "Everyday packs for households and clearly separated bulk supply for businesses — pricing handled separately.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <path d="M4 7h16l-1.2 13H5.2L4 7Z" strokeLinejoin="round" />
        <path d="M8.5 7V5.5a3.5 3.5 0 0 1 7 0V7" />
      </svg>
    ),
  },
  {
    title: "Direct Communication",
    body: "Reach us by phone, email, or WhatsApp for orders, quotations, and grade guidance.",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
        <path d="M4 6h16v12H4z" strokeLinejoin="round" />
        <path d="m4 7 8 6 8-6" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export function TrustHighlights() {
  return (
    <section aria-labelledby="trust-heading" className="border-b border-beige-200 bg-ivory-100">
      <div className="section-shell py-14 sm:py-16">
        <h2 id="trust-heading" className="sr-only">
          Why buy from AVRELLE AGRO
        </h2>
        <div className="grid gap-px overflow-hidden border border-beige-200 bg-beige-200 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="bg-ivory-50 p-6 transition-colors hover:bg-white sm:p-7">
              <span className="inline-flex text-gold-600">{h.icon}</span>
              <h3 className="mt-4 font-serif text-[17px] text-forest-900">{h.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{h.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
