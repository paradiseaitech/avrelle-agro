"use server";

import { headers } from "next/headers";
import { getDb, schema } from "@/db";
import { createRateLimiter, enquiryReference } from "@/lib/site";
import { bulkEnquirySchema, contactSchema } from "@/lib/validation";

const db = getDb();

const enquiryRateLimit = createRateLimiter(4, 60_000);
const contactRateLimit = createRateLimiter(4, 60_000);

async function clientIp(): Promise<string> {
  const h = await headers();
  return (h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "unknown").split(",")[0].trim();
}

export type EnquiryResult = { ok: true; reference: string } | { ok: false; error: string };

/**
 * Saves a wholesale/bulk enquiry. Enquiries are stored separately from retail
 * orders and never create prices — quotations are issued by the business.
 */
export async function submitBulkEnquiry(input: unknown): Promise<EnquiryResult> {
  const parsed = bulkEnquirySchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return {
      ok: false,
      error: first ? `${first.path.join(".")}: ${first.message}` : "Please check the form entries.",
    };
  }

  const ip = await clientIp();
  if (!enquiryRateLimit(`enquiry:${ip}`)) {
    return { ok: false, error: "Too many enquiries from your network. Please try again shortly." };
  }

  const data = parsed.data;
  for (let attempt = 0; attempt < 3; attempt++) {
    const reference = enquiryReference();
    try {
      await db.insert(schema.bulkEnquiries).values({
        reference,
        businessName: data.businessName,
        contactPerson: data.contactPerson,
        mobile: data.mobile,
        email: data.email,
        buyerType: data.buyerType,
        grades: data.grades,
        quantityKg: data.quantityKg,
        packagingPreference: data.packagingPreference,
        deliveryCity: data.deliveryCity,
        deliveryState: data.deliveryState,
        requirements: data.requirements,
        status: "new",
      });
      return { ok: true, reference };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes("duplicate key") && message.includes("reference")) continue;
      console.error("[submitBulkEnquiry] failed:", err);
      return {
        ok: false,
        error: "We could not save your enquiry right now. Please try again or contact us by phone.",
      };
    }
  }
  return { ok: false, error: "Could not allocate an enquiry reference. Please try again." };
}

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function submitContactMessage(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Please fill in all required fields correctly." };
  }

  const ip = await clientIp();
  if (!contactRateLimit(`contact:${ip}`)) {
    return { ok: false, error: "Too many messages from your network. Please try again shortly." };
  }

  try {
    await db.insert(schema.contactMessages).values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      subject: parsed.data.subject,
      message: parsed.data.message,
      status: "new",
    });
    return { ok: true };
  } catch (err) {
    console.error("[submitContactMessage] failed:", err);
    return { ok: false, error: "We could not send your message. Please try again or email us." };
  }
}
