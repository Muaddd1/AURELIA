import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { RevealGroup } from "@/components/motion/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { products } from "@/data/products";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q))
    );
  }, [query]);

  function handleChange(value: string) {
    setQuery(value);
    setParams(value ? { q: value } : {}, { replace: true });
  }

  return (
    <div className="min-h-screen pt-32">
      <Container className="mx-auto max-w-2xl text-center">
        <Eyebrow>Search</Eyebrow>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">What are you looking for?</h1>
        <div className="relative mx-auto mt-10 max-w-md">
          <SearchIcon size={16} strokeWidth={1.25} className="absolute left-1 top-1/2 -translate-y-1/2 text-mute" />
          <input
            autoFocus
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search products, materials, categories…"
            className="input-underline pl-7 text-center"
          />
        </div>
      </Container>

      <Container className="mt-16 pb-24">
        {query.trim() === "" ? (
          <EmptyState title="Start typing" message="Search across every piece in the AURELIA collection." />
        ) : results.length === 0 ? (
          <EmptyState
            title="No results"
            message={`We couldn't find anything for "${query}". Try a different term or browse the full collection.`}
            actionLabel="Browse Shop"
            actionTo="/shop"
          />
        ) : (
          <>
            <p className="mb-8 text-center text-xs text-mute">
              {results.length} result{results.length === 1 ? "" : "s"} for "{query}"
            </p>
            <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </RevealGroup>
          </>
        )}
      </Container>
    </div>
  );
}
