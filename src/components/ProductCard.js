import Link from "next/link";
import { changeMeta, formatPct, formatPrice, unitBn } from "@/lib/format";

export function ChangeBadge({ change }) {
  const meta = changeMeta(change?.dir);
  return (
    <span
      title={meta.title}
      className={`inline-flex items-center gap-1 rounded-full bg-base-200 px-2 py-1 text-xs font-semibold ${meta.className}`}
    >
      <span aria-hidden="true">{meta.arrow}</span>
      {formatPct(change?.pct)}%
    </span>
  );
}

export default function ProductCard({ product }) {
  return (
    <li className="contents">
      <Link
        href={`/product/${product.slug}`}
        className="group card border border-base-300 bg-base-100 transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-primary"
      >
        <div className="card-body gap-3 p-4">
          <div className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="grid size-12 shrink-0 place-items-center rounded-xl bg-base-200 text-2xl transition-transform duration-200 group-hover:scale-110"
            >
              {product.image}
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold transition-colors group-hover:text-primary">
                {product.nameBn}
              </h3>
              <p className="text-xs text-base-content/60">প্রতি {unitBn(product.unit)}</p>
            </div>
          </div>
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-xs text-base-content/60">আজকের দাম</p>
              <p className="text-xl font-bold">
                {formatPrice(product.today)} <span className="text-sm font-medium">টাকা</span>
              </p>
            </div>
            <ChangeBadge change={product.change} />
          </div>
        </div>
      </Link>
    </li>
  );
}
