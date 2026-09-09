import type { ReactNode } from "react";
import clsx from "clsx";
import { categoryLabels } from "@/data/products";
import { priceBuckets, sortOptions, type useProductFilters } from "@/lib/useProductFilters";

type Filters = ReturnType<typeof useProductFilters>;

export function FilterSidebar({ filters, showCategory = true }: { filters: Filters; showCategory?: boolean }) {
  return (
    <div className="flex flex-col gap-10">
      {showCategory && (
        <FilterGroup title="Category">
          {Object.entries(categoryLabels).map(([slug, label]) => (
            <Checkbox
              key={slug}
              label={label}
              checked={filters.categories.includes(slug)}
              onChange={() => filters.toggleInList("category", slug)}
            />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="Price">
        {priceBuckets.map((b) => (
          <Checkbox
            key={b.key}
            label={b.label}
            checked={filters.price === b.key}
            onChange={() => filters.setPrice(filters.price === b.key ? null : b.key)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2">
          {filters.availableColors.map((c) => (
            <button
              key={c.name}
              type="button"
              title={c.name}
              onClick={() => filters.toggleInList("color", c.name)}
              className={clsx(
                "h-7 w-7 rounded-full border transition-all",
                filters.colors.includes(c.name) ? "border-gold" : "border-transparent"
              )}
              style={{ backgroundColor: c.hex, boxShadow: "inset 0 0 0 1px var(--color-hairline)" }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Material">
        {filters.availableMaterials.map((m) => (
          <Checkbox key={m} label={m} checked={filters.materials.includes(m)} onChange={() => filters.toggleInList("material", m)} />
        ))}
      </FilterGroup>

      {filters.activeCount > 0 && (
        <button type="button" onClick={filters.clearAll} className="label-caps text-left text-gold link-underline">
          Clear All Filters
        </button>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="label-caps text-mute">{title}</p>
      <div className="mt-4 flex flex-col gap-3">{children}</div>
    </div>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 text-sm cursor-pointer">
      <span
        onClick={onChange}
        className={clsx(
          "flex h-4 w-4 shrink-0 items-center justify-center border transition-colors",
          checked ? "border-gold bg-gold" : "border-[var(--color-hairline)]"
        )}
      >
        {checked && <span className="h-1.5 w-1.5 bg-canvas" />}
      </span>
      <span onClick={onChange}>{label}</span>
    </label>
  );
}

export function SortSelect({ filters }: { filters: Filters }) {
  return (
    <select
      value={filters.sort}
      onChange={(e) => filters.setSort(e.target.value)}
      className="label-caps border-none bg-transparent py-2 pr-6 focus:outline-none"
      aria-label="Sort products"
    >
      {sortOptions.map((o) => (
        <option key={o.key} value={o.key} className="bg-panel text-ink">
          {o.label}
        </option>
      ))}
    </select>
  );
}
