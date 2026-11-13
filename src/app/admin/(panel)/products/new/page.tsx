import type { Metadata } from "next";
import Link from "next/link";
import { listAllGradesAdmin } from "@/lib/admin-data";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = { title: "New Product" };

export default async function NewProductPage() {
  const grades = await listAllGradesAdmin();

  return (
    <div className="space-y-6">
      <nav aria-label="Breadcrumb" className="text-[12px] text-ink-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/admin" className="hover:text-forest-700">Dashboard</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/admin/products" className="hover:text-forest-700">Products</Link></li>
          <li aria-hidden="true">/</li>
          <li className="font-medium text-forest-800">New</li>
        </ol>
      </nav>

      <header>
        <p className="text-eyebrow">Catalogue</p>
        <h1 className="mt-2 font-serif text-[30px] text-forest-900">New Product</h1>
        <p className="mt-1 text-[13px] text-ink-500">
          Create the product, then add pack sizes and stock on the next screen.
        </p>
      </header>

      <ProductForm grades={grades.map((g) => ({ id: g.id, name: g.name }))} />
    </div>
  );
}
