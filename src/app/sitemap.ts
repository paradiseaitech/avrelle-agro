import type { MetadataRoute } from "next";
import { listPublishedGrades, listPublishedProducts } from "@/lib/db-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, grades] = await Promise.all([
    listPublishedProducts(),
    listPublishedGrades(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/origin`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/mithila-makhana-gi-recognition`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/bulk-supply`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/bulk-orders`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/exports`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/manufacturing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/quality-assurance`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/certifications`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/farmer-network`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/grades`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${siteUrl}/faqs`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/shipping-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/returns-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const gradeRoutes: MetadataRoute.Sitemap = grades.map((grade) => ({
    url: `${siteUrl}/grades/${grade.slug}`,
    lastModified: grade.updatedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/product/${product.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...gradeRoutes, ...productRoutes];
}
