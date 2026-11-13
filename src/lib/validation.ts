import { z } from "zod";
import { isValidIndianMobile } from "@/lib/utils";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const cartLineSchema = z.object({
  variantId: z.string().uuid(),
  quantity: z.number().int().min(1).max(20),
});

export const checkoutSchema = z.object({
  /** Client-generated key; the server uses it to prevent duplicate orders. */
  idempotencyKey: z.string().min(16).max(64),
  customerName: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine(isValidIndianMobile, "Enter a valid Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  addressLine1: z.string().trim().min(3).max(120),
  addressLine2: optionalText(120),
  landmark: optionalText(120),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2).max(60),
  pincode: z.string().trim().regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit PIN code"),
  deliveryInstructions: optionalText(300),
  items: z.array(cartLineSchema).min(1).max(30),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const BUYER_TYPES = [
  { value: "wholesaler", label: "Wholesaler" },
  { value: "retailer", label: "Retailer / Kirana store" },
  { value: "distributor", label: "Distributor" },
  { value: "food-manufacturer", label: "Food manufacturer" },
  { value: "importer-exporter", label: "Importer / Exporter" },
  { value: "other", label: "Other business buyer" },
] as const;

export const PACKAGING_PREFERENCES = [
  { value: "white-pp-8kg", label: "White PP Bag with 100μ liner (8 kg net) — Standard Wholesale" },
  { value: "bulk-bags", label: "Custom Bulk bags (PP / Jute)" },
  { value: "retail-pouches", label: "Retail-ready pouches" },
  { value: "private-label", label: "Private label packaging" },
  { value: "vacuum-pack", label: "Vacuum packing" },
  { value: "no-preference", label: "No preference" },
] as const;

export const bulkEnquirySchema = z.object({
  businessName: z.string().trim().min(2).max(120),
  contactPerson: z.string().trim().min(2).max(100),
  mobile: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine(isValidIndianMobile, "Enter a valid Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  buyerType: z.enum(BUYER_TYPES.map((b) => b.value) as [string, ...string[]]),
  grades: z.array(z.string().min(1).max(60)).min(1, "Select at least one grade").max(10),
  quantityKg: z.coerce
    .number()
    .int("Enter quantity in whole kilograms")
    .min(1, "Minimum 1 kg")
    .max(50000),
  packagingPreference: z.string().trim().min(1).max(120),
  deliveryCity: z.string().trim().min(2).max(60),
  deliveryState: z.string().trim().min(2).max(60),
  requirements: optionalText(1000),
});

export type BulkEnquiryInput = z.infer<typeof bulkEnquirySchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("").transform(() => undefined)),
  phone: optionalText(20),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10).max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const orderLookupSchema = z.object({
  reference: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^AVG-[A-Z0-9]{6}$/, "Reference looks like AVG-XXXXXX"),
  phone: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine(isValidIndianMobile, "Enter the mobile number used at checkout"),
});

export const adminLoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(200),
});
