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
  giRecognition: "gi_recognition",
  companyHistory: "company_history",
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

export interface GIRecognitionSettings {
  enabled: boolean;
  giNumber: string;
  certNumber: string;
  authorizedUserName: string;
  certificateFileUrl: string | null;
  badgeVisible: boolean;
  heroAnnouncementEnabled: boolean;
  productDisplayEnabled: boolean;
  announcementHeadline: string;
  announcementText: string;
}

export interface CompanyHistorySettings {
  beginningHeadline: string;
  beginningText: string;
  foundationHeadline: string;
  foundationText: string;
  growthHeadline: string;
  growthText: string;
  todayHeadline: string;
  todayText: string;
}

export const DEFAULT_ANNOUNCEMENT: AnnouncementSettings = {
  enabled: true,
  text: "Officially Recognized Authorized User of Mithila Makhana (GI-696) | AU/48155/GI/696/76",
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
    displayName: "AVRELLE AGRO PRODUCTS PRIVATE LIMITED",
    tagline: "Rooted in Mithila. Bringing Authentic Makhana to the World.",
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
  headline: "Rooted in Mithila. Bringing Authentic Makhana to the World.",
  subheadline:
    "From the makhana heartland of Bihar to modern markets, AVRELLE AGRO is committed to celebrating Mithila Makhana's heritage through sourcing, grading, processing, and premium product offerings.",
};

export const DEFAULT_GI_RECOGNITION: GIRecognitionSettings = {
  enabled: true,
  giNumber: "GI-696",
  certNumber: "AU/48155/GI/696/76",
  authorizedUserName: "AVRELLE AGRO PRODUCTS PRIVATE LIMITED",
  certificateFileUrl: null,
  badgeVisible: true,
  heroAnnouncementEnabled: true,
  productDisplayEnabled: true,
  announcementHeadline: "An Officially Recognized Authorized User of Mithila Makhana",
  announcementText:
    "AVRELLE AGRO PRODUCTS PRIVATE LIMITED is proud to be recognized as an Authorized User of Mithila Makhana (GI-696), celebrating the authentic heritage, geographical identity, and agricultural legacy of Bihar.",
};

export const DEFAULT_COMPANY_HISTORY: CompanyHistorySettings = {
  beginningHeadline: "Beginning",
  beginningText:
    "Founded with a vision to elevate one of India’s most nutrient-dense superfoods from local harvests to global pantries, Avrelle Agro Products Private Limited began its journey in the heartland of makhana cultivation.\n\nRecognizing the immense potential of fox nuts—and the need for modernized, hygienic, and transparent processing—we set out to bridge the gap between traditional farming communities and quality-conscious consumers.",
  foundationHeadline: "Our Foundation",
  foundationText:
    "From day one, our foundation has been built on direct collaboration with local farmers and harvesters across Bihar’s premier makhana-producing belt.\n\nProudly recognized as an Authorized User of Mithila Makhana (GI-696), we uphold the authentic regional heritage, unique agro-climatic identity, and traditional cultivation practices that distinguish genuine Mithila Makhana.\n\nBy working closely at the grassroots level, we aim to ensure origin traceability and fair value for local cultivators while preserving time-honored pond harvesting and seed-popping expertise.",
  growthHeadline: "Our Growth and Capabilities",
  growthText:
    "As demand grew, we expanded our capabilities from raw agricultural sourcing into end-to-end processing, grading, and packaging.\n\nBy integrating clean, food-grade sorting, roasting, and moisture-controlled packaging infrastructure, we transform GI-eligible harvests into export-ready, shelf-stable products.\n\nEvery batch undergoes quality checks for size, crunch, purity, and freshness—delivering authenticity across both bulk B2B supplies and retail lines like Super Makhana Raw.",
  todayHeadline: "Where We Stand Today",
  todayText:
    "Today, Avrelle Agro Products is building its presence across the makhana value chain, supplying traceable fox nuts to domestic and international markets.\n\nGuided by integrity, regional pride, and continuous innovation, we remain committed to supporting rural livelihoods while bringing authentic Mithila Makhana to the world.",
};

export const DEFAULT_HOME_CONTENT: HomeContentSettings = {
  storyHeading: "Rooted in Mithila, Focused on Makhana",
  storyBody:
    "Rooted in Purnea, Bihar, AVRELLE AGRO PRODUCTS PRIVATE LIMITED focuses on makhana and fox nuts, serving domestic customers and international business buyers seeking clearly specified grades, authentic origin traceability, and dependable partnership.",
  showSampleNotice: false,
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
