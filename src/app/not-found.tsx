import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-950 botanical-grid px-5 py-12">
      <div className="max-w-lg text-center">
        <img
          src="/brand/logo-lockup-light.svg"
          alt="AVRELLE AGRO PVT LTD"
          className="mx-auto h-16 w-auto"
        />
        <p className="mt-8 text-[10.5px] font-semibold uppercase tracking-luxe text-gold-400">
          Error 404
        </p>
        <h1 className="mt-3 font-serif text-[32px] leading-tight text-ivory-50 sm:text-[40px]">
          This page could not be found.
        </h1>
        <p className="mt-4 text-[14.5px] leading-relaxed text-ivory-100/70">
          The page may have moved, or the link may be incorrect.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-gold">
            Return Home
          </Link>
          <Link
            href="/shop"
            className="btn-outline-gold !border-ivory-100/30 !text-ivory-100 hover:!border-gold-400 hover:!bg-ivory-100/5"
          >
            Shop Makhana
          </Link>
        </div>
      </div>
    </div>
  );
}
