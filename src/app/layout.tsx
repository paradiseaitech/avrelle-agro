import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AVRELLE AGRO | Authorized User of Mithila Makhana GI-696",
    template: "%s · AVRELLE AGRO",
  },
  description:
    "Discover AVRELLE AGRO PRODUCTS PRIVATE LIMITED, an officially recognized Authorized User of Mithila Makhana (GI-696), based in Bihar, India. Explore our makhana products, heritage, processing, and bulk supply offerings.",
  keywords: [
    "Mithila Makhana",
    "GI Authorized User Mithila Makhana",
    "Makhana company in Bihar",
    "Makhana supplier in Purnia",
    "Fox nuts supplier India",
    "Makhana wholesale",
    "Mithila Makhana bulk supply",
    "GI-696",
    "AU/48155/GI/696/76",
    "phool makhana",
    "bihar makhana",
    "suta grade",
  ],
  openGraph: {
    type: "website",
    siteName: "AVRELLE AGRO PRODUCTS PRIVATE LIMITED",
    title: "AVRELLE AGRO | Authorized User of Mithila Makhana GI-696",
    description:
      "Officially recognized Authorized User of Mithila Makhana (GI-696). Carefully sourced, graded, and processed fox nuts from Purnia, Bihar.",
    url: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
