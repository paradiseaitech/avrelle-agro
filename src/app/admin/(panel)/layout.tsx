import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/admin-auth";
import { getNavBadges } from "@/lib/admin-badges";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const badges = await getNavBadges();

  return (
    <div className="min-h-screen bg-ivory-50 lg:grid lg:grid-cols-[248px_1fr]">
      {/* Sidebar (desktop) */}
      <aside className="hidden bg-forest-950 botanical-grid lg:flex lg:min-h-screen lg:flex-col">
        <div className="border-b border-ivory-100/10 px-5 py-6">
          <Link href="/admin" className="block">
            <img
              src="/brand/logo-lockup-light.svg"
              alt="AVRELLE AGRO PVT LTD"
              className="h-11 w-auto"
            />
          </Link>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-luxe text-gold-400">
            Administration
          </p>
        </div>

        <div className="flex-1 py-4">
          <AdminNav badges={badges} />
        </div>

        <div className="border-t border-ivory-100/10 px-4 py-5">
          <p className="truncate text-[13px] font-medium text-ivory-50">{admin.name}</p>
          <p className="mt-0.5 truncate text-[11.5px] text-ivory-100/55">{admin.email}</p>
          <div className="mt-3 flex items-center gap-3">
            <Link
              href="/"
              className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 hover:text-gold-300"
            >
              View store
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="text-[11px] font-semibold uppercase tracking-wider text-ivory-100/60 hover:text-ivory-50"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        {/* Mobile bar */}
        <header className="bg-forest-950 lg:hidden">
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <Link href="/admin" className="shrink-0">
              <img
                src="/brand/logo-lockup-light.svg"
                alt="AVRELLE AGRO"
                className="h-8 w-auto"
              />
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-[10.5px] font-semibold uppercase tracking-wider text-gold-400"
              >
                Store
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-[10.5px] font-semibold uppercase tracking-wider text-ivory-100/65"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-ivory-100/10 px-2 pb-1">
            <AdminNav badges={badges} />
          </div>
        </header>

        {/* Desktop top bar */}
        <div className="hidden items-center justify-between border-b border-beige-200 bg-white px-8 py-3.5 lg:flex">
          <p className="text-[11px] font-semibold uppercase tracking-luxe text-ink-500">
            Store operations
          </p>
          <p className="text-[12px] text-ink-500">
            Signed in as <span className="font-medium text-forest-800">{admin.name}</span> ·{" "}
            <span className="uppercase tracking-wider">{admin.role}</span>
          </p>
        </div>

        <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </div>
    </div>
  );
}
