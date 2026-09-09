import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar, SortSelect } from "@/components/ui/FilterSidebar";
import { RevealGroup } from "@/components/motion/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { products } from "@/data/products";
import { useProductFilters } from "@/lib/useProductFilters";

export default function Shop() {
  const filters = useProductFilters(products);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="pt-32">
      <Container>
        <Eyebrow>The Full Collection</Eyebrow>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Shop</h1>
      </Container>

      <Container className="mt-12 grid grid-cols-1 gap-12 pb-24 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <FilterSidebar filters={filters} />
        </aside>

        <div>
          <div className="mb-8 flex items-center justify-between border-b hairline pb-4">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="label-caps flex items-center gap-2 lg:hidden"
            >
              <SlidersHorizontal size={14} strokeWidth={1.25} /> Filters
              {filters.activeCount > 0 && <span className="text-gold">({filters.activeCount})</span>}
            </button>
            <p className="hidden text-xs text-mute lg:block">{filters.filtered.length} pieces</p>
            <SortSelect filters={filters} />
          </div>

          {filters.filtered.length === 0 ? (
            <EmptyState
              title="No pieces match"
              message="Try adjusting or clearing your filters to see more of the collection."
            />
          ) : (
            <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-3">
              {filters.filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </RevealGroup>
          )}
        </div>
      </Container>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 lg:hidden">
          <div className="h-full w-full max-w-sm overflow-y-auto bg-canvas p-6">
            <div className="mb-8 flex items-center justify-between">
              <p className="label-caps">Filters</p>
              <button type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <X size={20} strokeWidth={1.25} />
              </button>
            </div>
            <FilterSidebar filters={filters} />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-outline mt-10 w-full justify-center text-ink"
            >
              Show {filters.filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
