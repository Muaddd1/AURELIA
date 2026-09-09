import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar, SortSelect } from "@/components/ui/FilterSidebar";
import { RevealGroup, Reveal } from "@/components/motion/Reveal";
import { EmptyState } from "@/components/ui/EmptyState";
import { products, categoryLabels } from "@/data/products";
import type { Category } from "@/data/types";
import { useProductFilters } from "@/lib/useProductFilters";

const collectionCopy: Record<Category, string> = {
  watches: "Precision movements housed in cases designed to disappear beneath a cuff.",
  jewelry: "Hand-finished pieces meant to be worn every day, not saved for occasion.",
  accessories: "The objects you touch most — reconsidered in materials that only improve with age.",
  fashion: "Cut from honest materials, built to be worn for years rather than a season.",
  perfume: "Compositions built to read close to skin rather than fill a room.",
  tech: "Function without the aesthetics of a gadget — objects, not devices.",
};

export default function Collection() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug as Category;
  const isValid = !!category && !!categoryLabels[category];

  const base = isValid ? products.filter((p) => p.category === category) : [];
  const filters = useProductFilters(base);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  if (!isValid) {
    return <Navigate to="/shop" replace />;
  }

  const heroImage = base[0]?.images[0];

  return (
    <div>
      <section className="relative flex h-[50vh] min-h-[380px] items-center overflow-hidden bg-panel">
        {heroImage && (
          <>
            <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </>
        )}
        <Container className="relative z-10 text-[#f5f3ef]">
          <Reveal>
            <Eyebrow className="text-[#c9a961]">Collection</Eyebrow>
            <h1 className="mt-3 font-display text-5xl sm:text-6xl">{categoryLabels[category]}</h1>
            <p className="mt-4 max-w-md text-sm text-[#f5f3ef]/80">{collectionCopy[category]}</p>
          </Reveal>
        </Container>
      </section>

      <Container className="mt-16 grid grid-cols-1 gap-12 pb-24 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <FilterSidebar filters={filters} showCategory={false} />
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
            <EmptyState title="No pieces match" message="Try adjusting or clearing your filters." />
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
            <FilterSidebar filters={filters} showCategory={false} />
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
