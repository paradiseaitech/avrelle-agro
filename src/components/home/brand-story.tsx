import Link from "next/link";
import type { HomeContentSettings } from "@/lib/site";

export function BrandStory({ story }: { story: HomeContentSettings }) {
  return (
    <section aria-labelledby="story-heading" className="border-t border-beige-200 bg-ivory-50">
      <div className="section-shell grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative">
          <div className="absolute -left-3 -top-3 h-full w-full border border-gold-500/40" aria-hidden="true" />
          <img
            src="/brand/500g.png"
            alt="AVRELLE AGRO makhana pack"
            loading="lazy"
            className="relative mx-auto w-2/3 max-w-[280px] lg:w-full lg:max-w-none lg:px-10 drop-shadow-xl"
          />
        </div>

        <div>
          <p className="text-eyebrow">Our Story</p>
          <h2 id="story-heading" className="mt-3 font-serif text-[30px] text-forest-900 sm:text-[36px]">
            {story.storyHeading}
          </h2>
          <span className="ornament-line mt-5 block" aria-hidden="true" />
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-700">{story.storyBody}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-600">
            Every listing on this site states the grade, pack size, and availability plainly, so
            retail customers and business buyers know exactly what they are ordering. When you need
            guidance on which grade suits your purpose, we are a call or message away.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="btn-outline">
              About Us
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
