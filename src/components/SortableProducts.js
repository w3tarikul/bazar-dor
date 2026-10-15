"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { bnToNumber, toBnDigits } from "@/lib/format";

const SORTS = {
  default: { label: "ডিফল্ট" },
  "price-asc": { label: "দাম: কম থেকে বেশি", compare: (a, b) => a - b },
  "price-desc": { label: "দাম: বেশি থেকে কম", compare: (a, b) => b - a },
};

export default function SortableProducts({ products }) {
  const [sort, setSort] = useState("default");

  const compare = SORTS[sort].compare;
  const sorted = compare
    ? [...products].sort((a, b) => compare(bnToNumber(a.today), bnToNumber(b.today)))
    : products;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-base-content/70" aria-live="polite">
          মোট {toBnDigits(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <div className="flex items-center gap-2">
          <label className="text-sm text-base-content/70" htmlFor="sort-products">
            সাজান
          </label>
          <select
            id="sort-products"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered select-sm w-auto cursor-pointer transition-colors hover:border-primary"
          >
            {Object.entries(SORTS).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
