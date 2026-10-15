import { Suspense } from "react";
import { getProducts, topMovers } from "@/lib/api";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import SortableProducts from "@/components/SortableProducts";
import { HomeSkeleton } from "@/components/Skeletons";

function MoversSection({ title, arrow, arrowClass, products }) {
  if (products.length === 0) return null;
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span aria-hidden="true" className={arrowClass}>
          {arrow}
        </span>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}

async function HomeContent() {
  const products = await getProducts();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-6">
      <Hero />
      <MoversSection
        title="আজ দাম বেড়েছে"
        arrow="▲"
        arrowClass="text-error"
        products={topMovers(products, "up")}
      />
      <MoversSection
        title="আজ দাম কমেছে"
        arrow="▼"
        arrowClass="text-success"
        products={topMovers(products, "down")}
      />
      <section id="সব-পণ্য" className="scroll-mt-32">
        <h2 className="mb-3 text-xl font-bold">সব পণ্য</h2>
        <SortableProducts products={products} />
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}
