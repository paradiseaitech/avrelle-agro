"use client";

import { useRouter } from "next/navigation";

const PACK_SIZE_FILTERS = [
  { label: "All Packs", value: null },
  { label: "100g Pocket", value: "100" },
  { label: "200g Daily", value: "200" },
  { label: "400g Family", value: "400" },
  { label: "500g Pantry", value: "500" },
  { label: "1 kg Mega", value: "1000" },
];

export function ShopControls({
  activeSize,
  sort,
}: {
  activeSize?: string;
  sort: string;
}) {
  const router = useRouter();

  function go(next: { size?: string | null; sort?: string; q?: string | null }) {
    const params = new URLSearchParams(window.location.search);
    const size = next.size !== undefined ? next.size : params.get("size");
    const q = next.q !== undefined ? next.q : params.get("q");
    const s = next.sort ?? params.get("sort");
    if (size) params.set("size", size); else params.delete("size");
    if (q) params.set("q", q); else params.delete("q");
    if (s && s !== "featured") params.set("sort", s); else params.delete("sort");
    router.push(`/shop${params.size ? `?${params}` : ""}`);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-beige-200 pb-5">
      <div
        className="flex flex-wrap items-center gap-2"
        role="group"
        aria-label="Filter by pack size"
      >
        {PACK_SIZE_FILTERS.map((f) => {
          const active = f.value === null ? !activeSize : activeSize === f.value;
          return (
            <button
              key={f.label}
              type="button"
              onClick={() => go({ size: f.value })}
              className={`border px-3.5 py-1.5 text-[12px] font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                active
                  ? "border-forest-800 bg-forest-800 text-ivory-100 shadow-xs"
                  : "border-beige-300 bg-white text-ink-700 hover:border-gold-500 hover:bg-gold-50/40"
              }`}
              aria-pressed={active}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="shop-sort" className="text-[12px] font-medium uppercase tracking-wider text-ink-600">
          Sort
        </label>
        <select
          id="shop-sort"
          value={sort}
          onChange={(e) => go({ sort: e.target.value })}
          className="field !w-auto !py-1.5 text-[13px]"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
}
