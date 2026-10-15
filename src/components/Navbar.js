import Link from "next/link";
import { getCategories } from "@/lib/api";
import AuthButtons from "@/components/AuthButtons";
import BanglaDate from "@/components/BanglaDate";
import CategoryNav from "@/components/CategoryNav";

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <span
            aria-hidden="true"
            className="grid size-10 place-items-center rounded-xl bg-primary text-lg text-primary-content transition group-hover:scale-105 group-hover:shadow-md"
          >
            🛒
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
              বাজার দর
            </span>
            <BanglaDate className="block text-xs text-base-content/60" />
          </span>
        </Link>
        <div className="ms-auto flex items-center gap-2">
          <AuthButtons />
        </div>
      </div>
      <div className="border-t border-base-200 bg-base-100">
        <CategoryNav categories={categories} />
      </div>
    </header>
  );
}
