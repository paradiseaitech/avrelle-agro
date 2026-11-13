import type { Metadata } from "next";
import Link from "next/link";
import { listContactMessages } from "@/lib/admin-data";
import { formatDateTime } from "@/lib/utils";
import { updateMessageStatusAction } from "@/lib/actions/admin-enquiries";

export const metadata: Metadata = { title: "Messages" };

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = ["new", "handled"].includes(params.status ?? "") ? params.status : undefined;
  const messages = await listContactMessages(status);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-eyebrow">Contact</p>
          <h1 className="mt-2 font-serif text-[30px] text-forest-900">Contact Messages</h1>
          <p className="mt-1 text-[13px] text-ink-500">
            {messages.length} message{messages.length === 1 ? "" : "s"} shown.
          </p>
        </div>
        <Link href="/admin" className="btn-outline btn-sm">Dashboard</Link>
      </header>

      <nav aria-label="Filter messages" className="flex flex-wrap gap-2">
        {[
          { href: "/admin/messages", label: "All", active: !status },
          { href: "/admin/messages?status=new", label: "New", active: status === "new" },
          { href: "/admin/messages?status=handled", label: "Handled", active: status === "handled" },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`border px-3.5 py-1.5 text-[12px] font-medium ${
              tab.active
                ? "border-forest-800 bg-forest-800 text-ivory-100"
                : "border-beige-300 bg-white text-ink-700 hover:border-forest-600"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      {messages.length === 0 ? (
        <p className="border border-beige-200 bg-white px-5 py-10 text-center text-[13.5px] text-ink-500">
          No messages match this filter.
        </p>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li key={m.id} className="border border-beige-200 bg-white">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-beige-200 px-5 py-3.5">
                <div>
                  <p className="text-[14px] font-medium text-forest-900">{m.subject}</p>
                  <p className="mt-0.5 text-[12px] text-ink-500">
                    {m.name}
                    {m.phone ? ` · ${m.phone}` : ""}
                    {m.email ? ` · ${m.email}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider ${
                      m.status === "new"
                        ? "border-amber-500/30 bg-amber-50 text-amber-800"
                        : "border-ink-400/30 bg-ivory-100 text-ink-600"
                    }`}
                  >
                    {m.status}
                  </span>
                  <span className="text-[11px] text-ink-400">{formatDateTime(m.createdAt)}</span>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-ink-700">
                  {m.message}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {m.email && (
                    <a
                      href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`}
                      className="btn-primary btn-sm"
                    >
                      Reply by Email
                    </a>
                  )}
                  {m.phone && (
                    <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="btn-outline btn-sm">
                      Call
                    </a>
                  )}
                  <form action={updateMessageStatusAction}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="status" value={m.status === "new" ? "handled" : "new"} />
                    <button type="submit" className="btn-outline btn-sm">
                      Mark {m.status === "new" ? "Handled" : "New"}
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
