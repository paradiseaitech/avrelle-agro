"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { enquiryStatuses, type EnquiryStatus } from "@/db/schema";
import { requireManager } from "@/lib/auth";

const db = getDb();

export interface EnquiryActionResult {
  ok?: boolean;
  error?: string;
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

export async function updateEnquiryAction(
  _prev: EnquiryActionResult,
  formData: FormData,
): Promise<EnquiryActionResult> {
  await requireManager();

  const id = str(formData, "id");
  const status = str(formData, "status") as EnquiryStatus;
  const adminNotes = str(formData, "adminNotes").slice(0, 4000);

  if (!id) return { error: "Missing enquiry." };
  if (!enquiryStatuses.includes(status)) return { error: "Invalid enquiry status." };

  const [updated] = await db
    .update(schema.bulkEnquiries)
    .set({ status, adminNotes: adminNotes || null })
    .where(eq(schema.bulkEnquiries.id, id))
    .returning({ id: schema.bulkEnquiries.id });

  if (!updated) return { error: "Enquiry not found." };

  revalidatePath("/admin");
  revalidatePath("/admin/enquiries");
  revalidatePath(`/admin/enquiries/${id}`);
  return { ok: true };
}

export async function updateMessageStatusAction(formData: FormData): Promise<void> {
  await requireManager();
  const id = str(formData, "id");
  const status = str(formData, "status");
  if (!id || !["new", "handled"].includes(status)) return;

  await db
    .update(schema.contactMessages)
    .set({ status })
    .where(eq(schema.contactMessages.id, id));

  revalidatePath("/admin");
  revalidatePath("/admin/messages");
}
