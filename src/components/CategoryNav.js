"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryNav({ categories }) {
  const pathname = usePathname();

  return (
    <nav aria-label="পণ্য ক্যাটাগরি" className="mx-auto w-full max-w-6xl px-4">
      <ul className="flex items-center gap-1 overflow-x-auto py-2 text-sm">
        {categories.map((category) => {
          const href = `/category/${category.slug}`;
          const active = pathname === href;
          return (
            <li key={category.slug} className="shrink-0">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`btn btn-sm whitespace-nowrap transition-colors ${
                  active ? "btn-primary" : "btn-ghost hover:bg-primary/10 hover:text-primary"
                }`}
              >
                <span aria-hidden="true">{category.icon}</span>
                {category.nameBn}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
