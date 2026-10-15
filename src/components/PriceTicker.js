import { getProducts } from "@/lib/api";
import { changeMeta, formatPct, formatPrice, unitBn } from "@/lib/format";

function TickerList({ products, hidden }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {products.map((p) => {
        const meta = changeMeta(p.change.dir);
        return (
          <li
            key={p.id}
            className="flex items-center gap-1.5 border-e border-base-200 px-4 py-2 text-sm whitespace-nowrap"
          >
            <span aria-hidden="true">{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span className="text-base-content/70">
              {formatPrice(p.today)} টাকা/{unitBn(p.unit)}
            </span>
            <span className={`font-semibold ${meta.className}`}>
              {meta.arrow} {formatPct(p.change.pct)}%
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default async function PriceTicker() {
  const products = (await getProducts()).filter((p) => p.change?.dir !== "flat");
  if (products.length === 0) return null;

  // The list is rendered twice so translating by -50% loops seamlessly.
  return (
    <div
      className="ticker overflow-hidden border-b border-base-300 bg-base-100"
      role="marquee"
      aria-label="আজকের দাম পরিবর্তনের তালিকা"
    >
      <div className="ticker-track">
        <TickerList products={products} />
        <TickerList products={products} hidden />
      </div>
    </div>
  );
}
