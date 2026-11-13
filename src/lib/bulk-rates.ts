/**
 * Official wholesale rate schedule and quotation terms from AVRELLE AGRO PVT LTD
 * Source document: /Rate.jpeg (Quotation No.: AVA/QTN/2026/038)
 */

export interface BulkRateItem {
  sNo: number;
  slug: string;
  name: string;
  composition: string;
  ratePerKg: number;
  highlight?: boolean;
}

export const OFFICIAL_BULK_RATES: BulkRateItem[] = [
  {
    sNo: 1,
    slug: "3-suta",
    name: "3 Suta",
    composition: "Economical cooking & snack mix grade (approx. 9–12.3 mm)",
    ratePerKg: 350,
  },
  {
    sNo: 2,
    slug: "pure-hp",
    name: "Pure HP",
    composition: "High-yield commercial hand-picked makhana",
    ratePerKg: 675,
  },
  {
    sNo: 3,
    slug: "4-5-hp-40-60",
    name: "4+5 HP (40% 4 suta + 60% 5 suta)",
    composition: "Commercial blend: 40% 4 Suta + 60% 5 Suta",
    ratePerKg: 870,
  },
  {
    sNo: 4,
    slug: "4-5-hp-30-70",
    name: "4+5 HP (30% 4 suta + 70% 5 suta)",
    composition: "Premium blend: 30% 4 Suta + 70% 5 Suta",
    ratePerKg: 920,
  },
  {
    sNo: 5,
    slug: "5-6-50-50",
    name: "5+6 (50% 5 suta + 50% 6 suta)",
    composition: "Jumbo mix: 50% 5 Suta + 50% 6 Suta",
    ratePerKg: 1160,
  },
  {
    sNo: 6,
    slug: "5-pure-hp",
    name: "5 Pure HP",
    composition: "100% 5 Suta Hand-Picked, uniform large pop",
    ratePerKg: 995,
  },
  {
    sNo: 7,
    slug: "5-plus-hp-70-30",
    name: "5+HP (70% 5 Suta, 30% 6+ Suta)",
    composition: "Premium export-grade blend: 70% 5 Suta + 30% 6+ Suta",
    ratePerKg: 1070,
  },
  {
    sNo: 8,
    slug: "6-plus-hp",
    name: "6+ HP",
    composition: "Largest grade hand-picked makhana (19–24 mm+), top luxury tier",
    ratePerKg: 1275,
    highlight: true,
  },
];

export const BULK_QUOTATION_DETAILS = {
  quotationNo: "AVA/QTN/2026/038",
  date: "11th October 2026",
  subject: "Rate Quotation for Makhana / Fox Nuts",
  packing: "White PP bag with 100 micron plastic inner liner - 8 kg net, hygienically packed",
  bagWeightKg: 8,
  gstRatePercent: 5,
  paymentTerms: "100% advance payment prior to dispatch",
  deliveryTimeline: "7–10 business days from confirmed order & payment",
  validity: "Valid for 15 days from date of issue",
  transportTerms: "Ex-Purnea, freight and logistics to be borne by buyer",
  signatory: "Kavita Verma, Authorized Signatory",
  companyName: "AVRELLE AGRO PVT LTD",
  gstin: "10AAQCA9895A1ZK",
  phone: "+91 7979782185",
  email: "averelleagro@gmail.com",
  address: "Averelle Agro Pvt Ltd, Laxmi Niwas Complex, Behind Sanjay Hotel, Bhatta Bazar East, Po & Distt Purnea",
  imagePath: "/Rate.jpeg",
};
