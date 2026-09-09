import { Link } from "react-router-dom";
import { X, ShoppingBag } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { RevealGroup } from "@/components/motion/Reveal";
import { useWishlist } from "@/store/wishlist";
import { useCart } from "@/store/cart";
import { useUi } from "@/store/ui";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";

export default function Wishlist() {
  const ids = useWishlist((s) => s.ids);
  const toggle = useWishlist((s) => s.toggle);
  const add = useCart((s) => s.add);
  const openCart = useUi((s) => s.openCart);

  const items = products.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="pt-32">
        <EmptyState
          title="Your wishlist is empty"
          message="Save pieces you love and come back to them anytime."
          actionLabel="Continue Shopping"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <Container>
        <Eyebrow>Saved For Later</Eyebrow>
        <h1 className="mt-3 font-display text-4xl">Wishlist</h1>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 sm:grid-cols-4">
          {items.map((p) => (
            <div key={p.id} className="group relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-panel">
                <Link to={`/product/${p.slug}`}>
                  <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                </Link>
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  aria-label="Remove from wishlist"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-canvas/70 backdrop-blur-sm"
                >
                  <X size={15} strokeWidth={1.25} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    add(p);
                    openCart();
                  }}
                  className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center justify-center gap-2 bg-canvas/85 py-3 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <ShoppingBag size={13} strokeWidth={1.25} />
                  <span className="label-caps">Move to Bag</span>
                </button>
              </div>
              <Link to={`/product/${p.slug}`} className="mt-4 block">
                <h3 className="font-display text-base">{p.name}</h3>
                <p className="mt-1 text-sm text-gold">{formatPrice(p.price)}</p>
              </Link>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </div>
  );
}
