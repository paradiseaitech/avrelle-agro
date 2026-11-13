/**
 * Site-wide configuration constants and typed shapes for JSON settings rows.
 * Values live in the `site_settings` table and can be edited from /admin.
 */

export const SETTING_KEYS = {
  announcement: "announcement",
  shipping: "shipping",
  business: "business",
  hero: "hero",
  homeContent: "home_content",
} as const;

export type SettingKey = (typeof SETTING_KEYS)[keyof typeof SETTING_KEYS];

export interface AnnouncementSettings {
  enabled: boolean;
  text: string;
}

export interface ShippingSettings {
  /** Flat default charge in paise when no PIN-specific rule exists. */
  defaultPaise: number;
  /** Orders at or above this subtotal (paise) ship free; 0 disables the offer. */
  freeShippingAbovePaise: number;
  /** Optional Cash-on-Delivery handling fee in paise. */
  codFeePaise: number;
  estDaysMin: number;
  estDaysMax: number;
  /** Master switch for retail delivery, independent of PIN rules. */
  serviceable: boolean;
}

export interface BusinessSettings {
  displayName: string;
  tagline: string;
  addressLine: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  whatsapp: string;
  /** GST details are business-provided and must be verified before display. */
  gstNumber: string | null;
  showGst: boolean;
}

export interface HeroSettings {
  headline: string;
  subheadline: string;
}

export interface HomeContentSettings {
  storyHeading: string;
  storyBody: string;
  /**
   * Shows a slim notice that retail prices and stock are sample data.
   * Turn this off in Admin → Settings once verified prices are entered.
   */
  showSampleNotice: boolean;
}

export const DEFAULT_ANNOUNCEMENT: AnnouncementSettings = {
  enabled: true,
  text: "Premium Makhana from Bihar  |  Retail & Bulk Enquiries Welcome",
};

export const DEFAULT_SHIPPING: ShippingSettings = {
  defaultPaise: 5900,
  freeShippingAbovePaise: 99900,
  codFeePaise: 0,
  estDaysMin: 3,
  estDaysMax: 7,
  serviceable: true,
};

export function defaultBusinessSettings(): BusinessSettings {
  return {
    displayName: "AVRELLE AGRO PVT LTD",
    tagline: "Quality. Consistency. Trust.",
    addressLine: "Purnea",
    city: "Purnea",
    state: "Bihar",
    phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "+91 79797 82185",
    email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL ?? "averelleagro@gmail.com",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "917979782185",
    gstNumber: null,
    showGst: false,
  };
}

export const DEFAULT_HERO: HeroSettings = {
  headline: "The Finest Makhana, Rooted in Bihar.",
  subheadline: "Discover carefully graded fox nuts for everyday snacking, retail, and bulk supply.",
};

export const DEFAULT_HOME_CONTENT: HomeContentSettings = {
  storyHeading: "Rooted in Purnea, Focused on Makhana",
  storyBody:
    "Rooted in Purnea, Bihar, AVRELLE AGRO PVT LTD focuses on makhana and fox nuts, serving customers and business buyers seeking clearly specified grades and dependable communication.",
  showSampleNotice: true,
};

export const GRADE_REFERENCE = [
  {
    slug: "6-suta",
    name: "6+ Suta",
    sizeMinMm: 19,
    sizeMaxMm: 24,
    summary: "The largest, most premium grade — exceptional size for gifting and premium retail.",
    description:
      "6+ Suta makhana are the largest grade in the standard suta scale, approximately 19–24 mm. They are typically chosen for premium gifting, temple offering packs, and retail shelves where size is the headline feature.",
  },
  {
    slug: "5-suta",
    name: "5 Suta",
    sizeMinMm: 16,
    sizeMaxMm: 19,
    summary: "Large, uniform fox nuts favoured for premium everyday consumption.",
    description:
      "5 Suta makhana measure approximately 15.7–19 mm. A popular premium grade for households that roast their own makhana and for brands that want a noticeably large nut.",
  },
  {
    slug: "4-suta",
    name: "4 Suta",
    sizeMinMm: 13,
    sizeMaxMm: 16,
    summary: "A balanced mid-size grade for daily snacking and cooking.",
    description:
      "4 Suta makhana measure approximately 12.5–15.5 mm. This versatile grade works well for makhana kheer, roasted snacks, and general cooking.",
  },
  {
    slug: "3-suta",
    name: "3 Suta",
    sizeMinMm: 9,
    sizeMaxMm: 12,
    summary: "Compact and economical — ideal for cooking and masala mixes.",
    description:
      "3 Suta makhana measure approximately 9–12.3 mm. A practical, economical grade widely used in cooking, mithai, and spiced snack mixes.",
  },
  {
    slug: "thurr",
    name: "Thurr(i)",
    sizeMinMm: 6,
    sizeMaxMm: 8,
    summary: "The smallest grade, typically supplied for processing and speciality uses.",
    description:
      "Thurr(i) makhana measure approximately 6–8 mm and are typically used for flour, processing, and speciality applications. Retail pack availability is confirmed on enquiry.",
    published: true,
  },
] as const;

/** Rate limiter shared by public form endpoints (per server instance). */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return function check(key: string): boolean {
    const now = Date.now();
    const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (arr.length >= limit) {
      hits.set(key, arr);
      return false;
    }
    arr.push(now);
    hits.set(key, arr);
    // Opportunistic cleanup to bound memory.
    if (hits.size > 5000) {
      for (const [k, v] of hits) {
        if (v.every((t) => now - t >= windowMs)) hits.delete(k);
      }
    }
    return true;
  };
}

export function whatsappLink(number: string, message?: string): string {
  const base = `https://wa.me/${number.replace(/\D/g, "")}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function orderReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let s = "";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  for (const b of bytes) s += alphabet[b % alphabet.length];
  return `AVG-${s}`;
}

export function enquiryReference(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  const bytes = new Uint8Array(5);
  crypto.getRandomValues(bytes);
  for (const b of bytes) s += alphabet[b % alphabet.length];
  return `BME-${s}`;
}
