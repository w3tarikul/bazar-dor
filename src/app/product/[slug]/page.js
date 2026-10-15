import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts, marketStats } from "@/lib/api";
import { changeMeta, formatPct, formatPrice, unitBn } from "@/lib/format";
import { requireUser } from "@/lib/session";
import { DetailSkeleton } from "@/components/Skeletons";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.nameBn}-এর আজকের দাম` : "পণ্য পাওয়া যায়নি" };
}

const CHANGE_WORD = { up: "বেড়েছে", down: "কমেছে" };

function StatCard({ label, value, tone, note }) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md">
      <p className="text-xs text-base-content/70">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${tone}`}>
        {formatPrice(value)} <span className="text-sm font-medium">টাকা</span>
      </p>
      <p className="mt-1 text-xs text-base-content/60">{note}</p>
    </div>
  );
}

async function ProductDetails({ params }) {
  const { slug } = await params;
  await requireUser(`/product/${slug}`);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const unit = unitBn(product.unit);
  const meta = changeMeta(product.change.dir);
  const diff = Math.abs(product.today - product.yesterday);
  const { min, max, avg, markets } = marketStats(product);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6">
      <div className="breadcrumbs py-0 text-sm text-base-content/70">
        <ul>
          <li>
            <Link href="/" className="hover:text-primary">হোম</Link>
          </li>
          <li>
            <Link href={`/category/${product.category}`} className="hover:text-primary">
              {product.categoryNameBn}
            </Link>
          </li>
          <li className="text-base-content">{product.nameBn}</li>
        </ul>
      </div>

      {/* Summary */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="grid size-20 shrink-0 place-items-center rounded-2xl bg-base-200 text-4xl"
            >
              {product.image}
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold sm:text-3xl">{product.nameBn}</h1>
              <p className="mt-1 text-sm text-base-content/60">
                প্রতি {unit} · {product.categoryNameBn}
              </p>
              <p className="mt-1 text-sm text-base-content/80">
                {product.change.dir === "flat" ? (
                  <>গতকালের তুলনায় আজ দাম <strong>অপরিবর্তিত</strong></>
                ) : (
                  <>
                    গতকালের তুলনায় আজ দাম <strong>{CHANGE_WORD[product.change.dir]}</strong> ·{" "}
                    {formatPrice(diff)} টাকা
                  </>
                )}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="badge badge-soft badge-primary transition hover:brightness-95"
                >
                  {product.categoryIcon} {product.categoryNameBn}
                </Link>
                <span className="badge badge-ghost">প্রতি {unit}</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-base-200 px-6 py-4 text-center sm:min-w-36">
            <p className="text-sm text-base-content/70">আজকের দাম</p>
            <p className="text-3xl font-bold">{formatPrice(product.today)}</p>
            <p className="text-sm text-base-content/70">টাকা / {unit}</p>
            <p className={`mt-1 text-sm font-semibold ${meta.className}`}>
              {meta.arrow} {formatPct(product.change.pct)}%
            </p>
          </div>
        </div>
      </section>

      {/* Price summary + market table */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="mb-4 text-lg font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard label="সর্বনিম্ন দাম" value={min} tone="text-success" note="সবচেয়ে কম দামের বাজার" />
          <StatCard label="সর্বাধিক দাম" value={max} tone="text-error" note="সবচেয়ে বেশি দামের বাজার" />
          <StatCard label="গড় দাম" value={avg} tone="text-success" note={`প্রতি ${unit}-এর হিসাবে`} />
        </div>

        <h2 className="mt-8 mb-4 text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto rounded-2xl border border-base-300">
          <table className="table">
            <thead>
              <tr className="text-base-content/70">
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th className="text-end">সর্বনিম্ন</th>
                <th className="text-end">সর্বাধিক</th>
                <th className="text-end">গড়</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((m) => (
                <tr key={m.market} className="transition-colors hover:bg-primary/5">
                  <td className="font-medium whitespace-nowrap">{m.market}</td>
                  <td className="whitespace-nowrap">{m.division}</td>
                  <td className="text-end whitespace-nowrap">{formatPrice(m.min)} টাকা</td>
                  <td className="text-end whitespace-nowrap">{formatPrice(m.max)} টাকা</td>
                  <td className="text-end font-bold whitespace-nowrap">{formatPrice(m.avg)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ProductDetails params={params} />
    </Suspense>
  );
}
