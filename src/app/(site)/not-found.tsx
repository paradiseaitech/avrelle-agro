import Link from "next/link";

export default function StorefrontNotFound() {
  return (
    <div className="section-shell py-20 text-center sm:py-28">
      <p className="text-eyebrow">Error 404</p>
      <h1 className="mx-auto mt-3 max-w-xl font-serif text-[34px] leading-tight text-forest-900 sm:text-[44px]">
        We couldn&apos;t find that page.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-600">
        The product or page may have moved. Browse the current catalogue, or contact us if you
        followed a link from somewhere else.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn-primary">Shop Makhana</Link>
        <Link href="/" className="btn-outline">Return Home</Link>
        <Link href="/contact" className="btn-outline">Contact Us</Link>
      </div>
    </div>
  );
}
