"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/inventory", label: "Inventory & Stock" },
  { href: "/admin/reports", label: "Reports & CSV" },
  { href: "/admin/enquiries", label: "Bulk Enquiries" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/grades", label: "Grades" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminNav({ badges }: { badges?: Record<string, number> }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Administration" className="no-scrollbar overflow-x-auto">
      <ul className="flex min-w-max gap-1 lg:min-w-0 lg:flex-col">
        {LINKS.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
          const badge = badges?.[link.href];
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between gap-2 whitespace-nowrap px-3.5 py-2.5 text-[13px] transition-colors lg:px-4 ${
                  active
                    ? "bg-ivory-50 font-semibold text-forest-900"
                    : "text-ivory-100/75 hover:bg-ivory-100/10 hover:text-ivory-50"
                }`}
              >
                <span>{link.label}</span>
                {badge ? (
                  <span
                    className={`inline-flex min-w-5 items-center justify-center px-1.5 py-0.5 text-[10px] font-semibold ${
                      active ? "bg-gold-500 text-forest-950" : "bg-ivory-100/20 text-ivory-50"
                    }`}
                  >
                    {badge}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
