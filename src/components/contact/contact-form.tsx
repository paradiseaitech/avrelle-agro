"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/actions/enquiries";

export function ContactForm({ whatsapp }: { whatsapp: string }) {
  const wa = whatsapp.replace(/\D/g, "");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const set =
    (name: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [name]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    const result = await submitContactMessage({
      name: form.name,
      email: form.email.trim() || undefined,
      phone: form.phone.trim() || undefined,
      subject: form.subject,
      message: form.message,
    });
    if (result.ok) {
      setSent(true);
      return;
    }
    setError(result.error);
    setBusy(false);
  }

  if (sent) {
    return (
      <div className="border border-forest-800/25 bg-forest-50 p-8 text-center" role="status">
        <h3 className="font-serif text-[24px] text-forest-900">Message sent</h3>
        <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-ink-600">
          Thank you for reaching out. We will respond as soon as possible. For anything urgent,
          please call or WhatsApp us.
        </p>
        {wa && (
          <a
            href={`https://wa.me/${wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold mt-6 inline-flex"
          >
            WhatsApp Us
          </a>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className="field-label">Name *</label>
          <input id="ct-name" required autoComplete="name" className="field" value={form.name} onChange={set("name")} />
        </div>
        <div>
          <label htmlFor="ct-phone" className="field-label">Phone (optional)</label>
          <input id="ct-phone" inputMode="tel" autoComplete="tel" className="field" value={form.phone} onChange={set("phone")} />
        </div>
      </div>
      <div>
        <label htmlFor="ct-email" className="field-label">Email (optional)</label>
        <input id="ct-email" type="email" autoComplete="email" className="field" value={form.email} onChange={set("email")} />
      </div>
      <div>
        <label htmlFor="ct-subject" className="field-label">Subject *</label>
        <input id="ct-subject" required className="field" value={form.subject} onChange={set("subject")} />
      </div>
      <div>
        <label htmlFor="ct-message" className="field-label">Message *</label>
        <textarea id="ct-message" required rows={5} className="field" value={form.message} onChange={set("message")} />
      </div>

      {error && (
        <p role="alert" className="border border-danger-600/30 bg-danger-100 p-3.5 text-[13.5px] leading-relaxed text-danger-600">
          {error}
        </p>
      )}

      <button type="submit" disabled={busy} className="btn-primary">
        {busy ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
