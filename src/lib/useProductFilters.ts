import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { Product } from "@/data/types";

export const priceBuckets = [
  { key: "under-500", label: "Under $500", test: (p: number) => p < 500 },
  { key: "500-1500", label: "$500 – $1,500", test: (p: number) => p >= 500 && p < 1500 },
  { key: "1500-3000", label: "$1,500 – $3,000", test: (p: number) => p >= 1500 && p < 3000 },
  { key: "3000-plus", label: "$3,000+", test: (p: number) => p >= 3000 },
];

export const sortOptions = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "name-asc", label: "Name: A–Z" },
] as const;

function toList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

export function useProductFilters(base: Product[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = toList(searchParams.get("category"));
  const colors = toList(searchParams.get("color"));
  const materials = toList(searchParams.get("material"));
  const price = searchParams.get("price");
  const sort = searchParams.get("sort") ?? "featured";

  const availableColors = useMemo(() => {
    const set = new Map<string, string>();
    base.forEach((p) => p.colors.forEach((c) => set.set(c.name, c.hex)));
    return Array.from(set.entries()).map(([name, hex]) => ({ name, hex }));
  }, [base]);

  const availableMaterials = useMemo(() => {
    const set = new Set<string>();
    base.forEach((p) => p.materials.forEach((m) => set.add(m)));
    return Array.from(set).slice(0, 10);
  }, [base]);

  const filtered = useMemo(() => {
    let list = base.slice();

    if (categories.length) list = list.filter((p) => categories.includes(p.category));
    if (colors.length) list = list.filter((p) => p.colors.some((c) => colors.includes(c.name)));
    if (materials.length) list = list.filter((p) => p.materials.some((m) => materials.includes(m)));
    if (price) {
      const bucket = priceBuckets.find((b) => b.key === price);
      if (bucket) list = list.filter((p) => bucket.test(p.price));
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        list.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
    }

    return list;
  }, [base, categories, colors, materials, price, sort]);

  function toggleInList(key: "category" | "color" | "material", value: string) {
    const current = toList(searchParams.get(key));
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      if (next.length) p.set(key, next.join(","));
      else p.delete(key);
      return p;
    });
  }

  function setPrice(value: string | null) {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      if (value) p.set("price", value);
      else p.delete("price");
      return p;
    });
  }

  function setSort(value: string) {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      if (value && value !== "featured") p.set("sort", value);
      else p.delete("sort");
      return p;
    });
  }

  function clearAll() {
    setSearchParams(new URLSearchParams());
  }

  const activeCount = categories.length + colors.length + materials.length + (price ? 1 : 0);

  return {
    filtered,
    categories,
    colors,
    materials,
    price,
    sort,
    availableColors,
    availableMaterials,
    toggleInList,
    setPrice,
    setSort,
    clearAll,
    activeCount,
  };
}
