import { Link } from "react-router-dom";
import { Heart, Scan } from "lucide-react";
import clsx from "clsx";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { useWishlist } from "@/store/wishlist";
import { useUi } from "@/store/ui";

export function ProductCard({ product }: { product: Product }) {
  const wishlisted = useWishlist((s) => s.has(product.id));
  const toggleWishlist = useWishlist((s) => s.toggle);
  const openQuickView = useUi((s) => s.openQuickView);
  const secondary = product.images[1] ?? product.images[0];

  return (
    <div className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-panel">
        <Link to={`/product/${product.slug}`} aria-label={product.name}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
          />
          <img
            src={secondary}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
          />
        </Link>

        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-canvas/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
        >
          <Heart size={16} strokeWidth={1.25} className={clsx(wishlisted ? "fill-gold text-gold" : "text-ink")} />
        </button>

        <button
          type="button"
          onClick={() => openQuickView(product)}
          className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 bg-canvas/80 py-3 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Scan size={14} strokeWidth={1.25} />
          <span className="label-caps">Quick View</span>
        </button>

        {product.compareAtPrice && (
          <span className="label-caps absolute left-3 top-3 bg-gold px-2 py-1 text-canvas">Sale</span>
        )}
      </div>

      <Link to={`/product/${product.slug}`} className="mt-4 block">
        <h3 className="font-display text-base text-ink">{product.name}</h3>
        <div className="mt-1 flex items-center gap-2 text-sm text-mute">
          <span className={product.compareAtPrice ? "text-gold" : ""}>{formatPrice(product.price)}</span>
          {product.compareAtPrice && <span className="line-through">{formatPrice(product.compareAtPrice)}</span>}
        </div>
      </Link>
    </div>
  );
}
