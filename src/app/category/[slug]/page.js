import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/api";
import { toBnDigits } from "@/lib/format";
import EmptyState from "@/components/EmptyState";
import SortableProducts from "@/components/SortableProducts";
import { CategorySkeleton } from "@/components/Skeletons";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  return { title: category ? `${category.nameBn}-এর দাম` : "ক্যাটাগরি পাওয়া যায়নি" };
}

async function CategoryContent({ params }) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProductsByCategory(slug),
  ]);

  if (!category) notFound();

  if (products.length === 0) {
    return (
      <EmptyState
        title={`${category.nameBn} ক্যাটাগরিতে কোনো পণ্য নেই`}
        message="এই ক্যাটাগরিতে এখনো কোনো পণ্যের দাম যোগ করা হয়নি।"
      />
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6">
      <header className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="text-4xl">
            {category.icon}
          </span>
          <div>
            <h1 className="text-2xl font-bold">{category.nameBn}</h1>
            <p className="text-sm text-base-content/70">
              {toBnDigits(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </header>
      <SortableProducts products={products} />
    </div>
  );
}

export default function CategoryPage({ params }) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}
