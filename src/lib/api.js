import "server-only";
import { cacheLife } from "next/cache";

// Main API first, then the two mirrors as fallbacks.
const API_BASES = [
  process.env.API_BASE_URL ?? "https://openapi.programming-hero.com/api/bazardor",
  process.env.API_BASE_URL_1 ?? "https://api.api-store.workers.dev/api/bazardor",
  process.env.API_BASE_URL_2 ?? "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchJson(path) {
  let lastError;
  for (const base of API_BASES) {
    try {
      const res = await fetch(`${base}${path}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return await res.json();
    } catch (error) {
      lastError = error;
    }
  }
  throw new Error(`বাজার দর API থেকে তথ্য আনা যায়নি: ${lastError?.message}`);
}

export async function getProducts() {
  "use cache";
  cacheLife("hours");
  const data = await fetchJson("/products");
  return Array.isArray(data) ? data : [];
}

export async function getCategories() {
  "use cache";
  cacheLife("hours");
  const data = await fetchJson("/categories");
  return Array.isArray(data) ? data : [];
}

export async function getCategory(slug) {
  "use cache";
  cacheLife("hours");
  const data = await fetchJson(`/categories/${encodeURIComponent(slug)}`);
  return data && !data.error ? data : null;
}

export async function getProductsByCategory(slug) {
  "use cache";
  cacheLife("hours");
  const data = await fetchJson(`/products?category=${encodeURIComponent(slug)}`);
  return Array.isArray(data) ? data : [];
}

// The API only resolves single products by numeric id, so look slugs up in the full list.
export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export function topMovers(products, dir, limit = 6) {
  return products
    .filter((p) => p.change?.dir === dir)
    .sort((a, b) =>
      dir === "up" ? b.change.pct - a.change.pct : a.change.pct - b.change.pct,
    )
    .slice(0, limit);
}

/** Price summary across all markets for the details page. */
export function marketStats(product) {
  const markets = (product.markets ?? []).map((m) => ({
    ...m,
    avg: (m.min + m.max) / 2,
  }));
  if (markets.length === 0) {
    return { min: product.today, max: product.today, avg: product.today, markets };
  }
  const min = Math.min(...markets.map((m) => m.min));
  const max = Math.max(...markets.map((m) => m.max));
  const avg = Math.round(markets.reduce((sum, m) => sum + m.avg, 0) / markets.length);
  markets.sort((a, b) => a.avg - b.avg);
  return { min, max, avg, markets };
}
