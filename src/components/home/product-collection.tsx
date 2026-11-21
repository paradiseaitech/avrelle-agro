import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductCollectionItem {
  id: string;
  name: string;
  category: string;
  description: string;
  priceNote: string;
  rateLabel: string;
  image: string;
  href: string;
  ctaText: string;
}

const COLLECTIONS: ProductCollectionItem[] = [
  {
    id: "raw-makhana",
    name: "Raw Makhana",
    category: "Primary Commodity",
    description:
      "Naturally sun-dried and popped fox nuts sourced directly from seasonal wetland harvest.",
    rateLabel: "Approved Rate Card",
    priceNote: "Wholesale from ₹350 / kg",
    image: "/brand/grades/size.jpeg",
    href: "/products#raw-makhana",
    ctaText: "Explore Raw Makhana",
  },
  {
    id: "graded-makhana",
    name: "Graded Makhana",
    category: "Precision Sizing",
    description:
      "Calibrated hand-picked tiers from 3 Suta to 6+ Suta Jumbo with uniform diameter and pop.",
    rateLabel: "8 Commercial Tiers",
    priceNote: "₹350 – ₹1,275 / kg",
    image: "/brand/grades/5-suta.png",
    href: "/grades",
    ctaText: "Explore Grades",
  },
  {
    id: "roasted-makhana",
    name: "Roasted Makhana",
    category: "Crisp & Light",
    description:
      "Slow hot-air roasted to sub-3% moisture for enduring crunch without chemical additives.",
    rateLabel: "Retail & Pantry",
    priceNote: "Retail from ₹179 / pack",
    image: "/brand/500g.png",
    href: "/shop",
    ctaText: "Shop Roasted",
  },
  {
    id: "flavoured-makhana",
    name: "Flavoured Makhana",
    category: "Gourmet Healthy Snacking",
    description:
      "Seasoned with natural Indian spices and delicate herbs for wholesome daily wellness.",
    rateLabel: "Specialty Line",
    priceNote: "Artisanal Seasonings",
    image: "/brand/100g.png",
    href: "/products#flavoured-makhana",
    ctaText: "Discover Flavours",
  },
];

export function ProductCollection() {
  return (
    <section className="bg-ivory-50 py-16 sm:py-20 lg:py-24 border-b border-beige-200">
      <div className="section-shell">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-eyebrow">Curated Offerings</p>
          <h2 className="mt-2 font-serif text-[28px] sm:text-[36px] lg:text-[40px] font-bold text-charcoal-900 tracking-tight">
            Discover Our Makhana Collection
          </h2>
          <span className="ornament-line mt-3 block mx-auto" aria-hidden="true" />
          <p className="mt-4 text-[15px] sm:text-[16px] text-muted-grey">
            Authentic Mithila Makhana across four signature presentations, tailored for both retail consumers and commercial wholesale buyers.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-12 sm:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTIONS.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl border border-beige-300 bg-white p-4 sm:p-5 shadow-xs transition-all duration-300 hover:border-gold-500 hover:shadow-md hover:-translate-y-0.5"
            >
              <div>
                {/* Product Image Frame */}
                <div className="relative overflow-hidden rounded-xl bg-ivory-50 aspect-[4/3] border border-beige-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal-900 border border-beige-200">
                    {item.category}
                  </span>
                </div>

                {/* Title & Short Description */}
                <h3 className="mt-4 font-serif text-[19px] font-bold text-charcoal-900 group-hover:text-gold-700 transition-colors">
                  {item.name}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-grey line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Price & CTA */}
              <div className="mt-5 pt-4 border-t border-beige-200">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-[10.5px] uppercase font-semibold text-muted-grey tracking-wider">
                    {item.rateLabel}
                  </span>
                  <span className="font-serif text-[15.5px] font-bold text-charcoal-900">
                    {item.priceNote}
                  </span>
                </div>

                <Link
                  href={item.href}
                  className="btn-outline w-full flex items-center justify-center gap-1.5 !py-2.5 !text-[12px] group-hover:border-gold-500 group-hover:text-gold-700"
                >
                  <span>{item.ctaText}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Global Catalog Link */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-gold-700 hover:text-gold-600 underline underline-offset-4"
          >
            <span>Explore Complete Specifications &amp; Technical Portfolio</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
