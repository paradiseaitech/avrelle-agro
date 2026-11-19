"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { requireManager } from "@/lib/auth";
import { SETTING_KEYS } from "@/lib/site";

const db = getDb();

export interface SettingsResult {
  ok?: boolean;
  error?: string;
}

function str(fd: FormData, key: string): string {
  return String(fd.get(key) ?? "").trim();
}

function bool(fd: FormData, key: string): boolean {
  return fd.get(key) === "on" || fd.get(key) === "true";
}

function rupeesToPaise(value: FormDataEntryValue | null): number | null {
  const raw = String(value ?? "").trim();
  if (!raw) return null;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return Number.NaN;
  return Math.round(n * 100);
}

async function saveSetting(key: string, value: unknown) {
  await db
    .insert(schema.siteSettings)
    .values({ key, value })
    .onConflictDoUpdate({
      target: schema.siteSettings.key,
      set: { value, updatedAt: new Date() },
    });
}

function refreshSite() {
  revalidatePath("/", "layout");
}

/* ------------------------------------------------------------- announcement */

export async function saveAnnouncementAction(
  _prev: SettingsResult,
  formData: FormData,
): Promise<SettingsResult> {
  await requireManager();
  const text = str(formData, "text").slice(0, 180);
  if (text.length < 2) return { error: "Announcement text is required." };

  await saveSetting(SETTING_KEYS.announcement, {
    enabled: bool(formData, "enabled"),
    text,
  });
  refreshSite();
  revalidatePath("/admin/settings");
  return { ok: true };
}

/* --------------------------------------------------------------------- hero */

export async function saveHeroAction(
  _prev: SettingsResult,
  formData: FormData,
): Promise<SettingsResult> {
  await requireManager();
  const headline = str(formData, "headline").slice(0, 160);
  const subheadline = str(formData, "subheadline").slice(0, 320);
  if (headline.length < 4) return { error: "Hero headline is too short." };
  if (subheadline.length < 4) return { error: "Hero subheadline is too short." };

  await saveSetting(SETTING_KEYS.hero, { headline, subheadline });
  refreshSite();
  revalidatePath("/admin/settings");
  return { ok: true };
}

/* ------------------------------------------------------------- home content */

export async function saveHomeContentAction(
  _prev: SettingsResult,
  formData: FormData,
): Promise<SettingsResult> {
  await requireManager();
  const storyHeading = str(formData, "storyHeading").slice(0, 160);
  const storyBody = str(formData, "storyBody").slice(0, 2000);
  if (storyHeading.length < 4) return { error: "Story heading is too short." };
  if (storyBody.length < 20) return { error: "Story body is too short." };

  await saveSetting(SETTING_KEYS.homeContent, {
    storyHeading,
    storyBody,
    showSampleNotice: bool(formData, "showSampleNotice"),
  });
  refreshSite();
  revalidatePath("/admin/settings");
  return { ok: true };
}

/* -------------------------------------------------------- GI recognition */

export async function saveGIRecognitionAction(
  _prev: SettingsResult,
  formData: FormData,
): Promise<SettingsResult> {
  await requireManager();
  const certNumber = str(formData, "certNumber").slice(0, 100) || "AU/48155/GI/696/76";
  const giNumber = str(formData, "giNumber").slice(0, 50) || "GI-696";
  const authorizedUserName =
    str(formData, "authorizedUserName").slice(0, 200) || "AVRELLE AGRO PRODUCTS PRIVATE LIMITED";
  const certificateFileUrl = str(formData, "certificateFileUrl") || null;
  const announcementHeadline =
    str(formData, "announcementHeadline").slice(0, 200) ||
    "An Officially Recognized Authorized User of Mithila Makhana";
  const announcementText =
    str(formData, "announcementText").slice(0, 1000) ||
    "AVRELLE AGRO PRODUCTS PRIVATE LIMITED is proud to be recognized as an Authorized User of Mithila Makhana (GI-696), celebrating the authentic heritage, geographical identity, and agricultural legacy of Bihar.";

  await saveSetting(SETTING_KEYS.giRecognition, {
    enabled: bool(formData, "enabled"),
    certNumber,
    giNumber,
    authorizedUserName,
    certificateFileUrl,
    badgeVisible: bool(formData, "badgeVisible"),
    heroAnnouncementEnabled: bool(formData, "heroAnnouncementEnabled"),
    productDisplayEnabled: bool(formData, "productDisplayEnabled"),
    announcementHeadline,
    announcementText,
  });

  refreshSite();
  revalidatePath("/admin/settings");
  revalidatePath("/mithila-makhana-gi-recognition");
  return { ok: true };
}

/* ----------------------------------------------------- company history */

export async function saveCompanyHistoryAction(
  _prev: SettingsResult,
  formData: FormData,
): Promise<SettingsResult> {
  await requireManager();
  const beginningHeadline = str(formData, "beginningHeadline").slice(0, 150) || "Beginning";
  const beginningText = str(formData, "beginningText").slice(0, 3000);
  const foundationHeadline = str(formData, "foundationHeadline").slice(0, 150) || "Our Foundation";
  const foundationText = str(formData, "foundationText").slice(0, 3000);
  const growthHeadline = str(formData, "growthHeadline").slice(0, 150) || "Our Growth and Capabilities";
  const growthText = str(formData, "growthText").slice(0, 3000);
  const todayHeadline = str(formData, "todayHeadline").slice(0, 150) || "Where We Stand Today";
  const todayText = str(formData, "todayText").slice(0, 3000);

  if (beginningText.length < 10) return { error: "Beginning text cannot be empty." };
  if (foundationText.length < 10) return { error: "Foundation text cannot be empty." };
  if (growthText.length < 10) return { error: "Growth text cannot be empty." };
  if (todayText.length < 10) return { error: "Where We Stand Today text cannot be empty." };

  await saveSetting(SETTING_KEYS.companyHistory, {
    beginningHeadline,
    beginningText,
    foundationHeadline,
    foundationText,
    growthHeadline,
    growthText,
    todayHeadline,
    todayText,
  });

  refreshSite();
  revalidatePath("/admin/settings");
  revalidatePath("/about");
  return { ok: true };
}

/* ----------------------------------------------------------------- shipping */

export async function saveShippingAction(
  _prev: SettingsResult,
  formData: FormData,
): Promise<SettingsResult> {
  await requireManager();

  const defaultPaise = rupeesToPaise(formData.get("defaultRupees"));
  const freeAbovePaise = rupeesToPaise(formData.get("freeAboveRupees"));
  const codFeePaise = rupeesToPaise(formData.get("codFeeRupees"));

  if (defaultPaise === null || Number.isNaN(defaultPaise)) {
    return { error: "Enter a valid default shipping charge (₹0 is allowed)." };
  }
  if (freeAbovePaise === null || Number.isNaN(freeAbovePaise)) {
    return { error: "Enter a valid free-shipping threshold (use ₹0 to disable)." };
  }
  if (codFeePaise === null || Number.isNaN(codFeePaise)) {
    return { error: "Enter a valid COD fee (use ₹0 for none)." };
  }

  const estDaysMin = Number(str(formData, "estDaysMin") || "3");
  const estDaysMax = Number(str(formData, "estDaysMax") || "7");
  if (
    !Number.isInteger(estDaysMin) ||
    !Number.isInteger(estDaysMax) ||
    estDaysMin < 0 ||
    estDaysMax < estDaysMin ||
    estDaysMax > 60
  ) {
    return { error: "Delivery estimates must be whole days (min ≤ max, max 60)." };
  }

  await saveSetting(SETTING_KEYS.shipping, {
    defaultPaise,
    freeShippingAbovePaise: freeAbovePaise,
    codFeePaise,
    estDaysMin,
    estDaysMax,
    serviceable: bool(formData, "serviceable"),
  });
  refreshSite();
  revalidatePath("/admin/settings");
  return { ok: true };
}

/* ----------------------------------------------------------------- business */

export async function saveBusinessAction(
  _prev: SettingsResult,
  formData: FormData,
): Promise<SettingsResult> {
  await requireManager();

  const displayName = str(formData, "displayName").slice(0, 120);
  const tagline = str(formData, "tagline").slice(0, 160);
  const addressLine = str(formData, "addressLine").slice(0, 160);
  const city = str(formData, "city").slice(0, 80);
  const state = str(formData, "state").slice(0, 80);
  const phone = str(formData, "phone").slice(0, 30);
  const email = str(formData, "email").slice(0, 120);
  const whatsapp = str(formData, "whatsapp").slice(0, 30);

  if (displayName.length < 2) return { error: "Business name is required." };
  if (!/^\+?[\d\s-]{8,20}$/.test(phone)) return { error: "Enter a valid phone number." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (whatsapp.replace(/\D/g, "").length < 10) {
    return { error: "Enter a valid WhatsApp number with country code." };
  }

  await saveSetting(SETTING_KEYS.business, {
    displayName,
    tagline,
    addressLine,
    city,
    state,
    phone,
    email,
    whatsapp,
    // GST details stay unpublished until independently verified.
    gstNumber: null,
    showGst: false,
  });
  refreshSite();
  revalidatePath("/admin/settings");
  return { ok: true };
}

/* --------------------------------------------------------------- PIN codes */

export async function savePincodeAction(
  _prev: SettingsResult,
  formData: FormData,
): Promise<SettingsResult> {
  await requireManager();

  const pincode = str(formData, "pincode");
  if (!/^[1-9]\d{5}$/.test(pincode)) {
    return { error: "Enter a valid 6-digit Indian PIN code." };
  }

  const shippingPaise = rupeesToPaise(formData.get("shippingRupees"));
  if (shippingPaise !== null && Number.isNaN(shippingPaise)) {
    return { error: "Shipping override must be a valid amount, or left blank." };
  }

  const minRaw = str(formData, "estDaysMin");
  const maxRaw = str(formData, "estDaysMax");
  const estDaysMin = minRaw ? Number(minRaw) : null;
  const estDaysMax = maxRaw ? Number(maxRaw) : null;
  if (
    (estDaysMin !== null && (!Number.isInteger(estDaysMin) || estDaysMin < 0)) ||
    (estDaysMax !== null && (!Number.isInteger(estDaysMax) || estDaysMax < 0))
  ) {
    return { error: "Delivery days must be whole numbers." };
  }
  if (estDaysMin !== null && estDaysMax !== null && estDaysMax < estDaysMin) {
    return { error: "Maximum delivery days cannot be less than minimum." };
  }

  const values = {
    serviceable: bool(formData, "serviceable"),
    shippingPaise,
    estDaysMin,
    estDaysMax,
    codAvailable: bool(formData, "codAvailable"),
    updatedAt: new Date(),
  };

  await db
    .insert(schema.pincodeRules)
    .values({ pincode, ...values })
    .onConflictDoUpdate({ target: schema.pincodeRules.pincode, set: values });

  refreshSite();
  revalidatePath("/admin/settings");
  return { ok: true };
}

export async function deletePincodeAction(formData: FormData): Promise<void> {
  await requireManager();
  const pincode = str(formData, "pincode");
  if (pincode) {
    await db.delete(schema.pincodeRules).where(eq(schema.pincodeRules.pincode, pincode));
  }
  refreshSite();
  revalidatePath("/admin/settings");
}
