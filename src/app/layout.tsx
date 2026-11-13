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
    default: "AVRELLE AGRO PVT LTD — Premium Makhana from Purnea, Bihar",
    template: "%s · AVRELLE AGRO",
  },
  description:
    "Premium graded phool makhana (fox nuts) from Purnea, Bihar. Shop 3, 4, 5 and 6+ Suta grades for everyday enjoyment, or request a quotation for bulk supply.",
  keywords: ["makhana", "fox nuts", "phool makhana", "bihar makhana", "suta grade", "bulk makhana"],
  openGraph: {
    type: "website",
    siteName: "AVRELLE AGRO PVT LTD",
    title: "AVRELLE AGRO PVT LTD — Premium Makhana from Purnea, Bihar",
    description:
      "Carefully graded fox nuts for everyday snacking, retail, and bulk supply. Quality. Consistency. Trust.",
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
