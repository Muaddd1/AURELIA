import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";

export default function Cart() {
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());
  const [promo, setPromo] = useState("");
  const [promoMsg, setPromoMsg] = useState("");

  if (lines.length === 0) {
    return (
      <div className="pt-32">
        <EmptyState
          title="Your bag is empty"
          message="Pieces you add to your bag will appear here."
          actionLabel="Continue Shopping"
          actionTo="/shop"
        />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <Container>
        <Eyebrow>Your Selection</Eyebrow>
        <h1 className="mt-3 font-display text-4xl">Shopping Bag</h1>

        <div className="mt-12 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_360px]">
          <ul className="flex flex-col divide-y divide-[var(--color-hairline)] border-y hairline">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.color}-${line.size}`} className="flex gap-6 py-8">
                <Link to={`/product/${line.slug}`} className="h-32 w-24 shrink-0 overflow-hidden bg-panel sm:h-40 sm:w-32">
                  <img src={line.image} alt={line.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to={`/product/${line.slug}`} className="font-display text-lg">
                        {line.name}
                      </Link>
                      <p className="mt-1 text-xs text-mute">{[line.color, line.size].filter(Boolean).join(" / ")}</p>
                    </div>
                    <button type="button" onClick={() => remove(line.productId, line.color, line.size)} aria-label="Remove" className="text-mute">
                      <X size={16} strokeWidth={1.25} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-4 border hairline px-3 py-1.5">
                      <button type="button" onClick={() => setQuantity(line.productId, line.quantity - 1, line.color, line.size)} aria-label="Decrease">
                        <Minus size={13} strokeWidth={1.25} />
                      </button>
                      <span className="w-4 text-center text-sm">{line.quantity}</span>
                      <button type="button" onClick={() => setQuantity(line.productId, line.quantity + 1, line.color, line.size)} aria-label="Increase">
                        <Plus size={13} strokeWidth={1.25} />
                      </button>
                    </div>
                    <span className="text-gold">{formatPrice(line.price * line.quantity)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-fit border hairline p-8">
            <p className="label-caps">Order Summary</p>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-mute">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-mute">Shipping</span>
              <span className="text-mute">Calculated at checkout</span>
            </div>

            <form
              className="mt-6 flex items-end gap-3 border-t hairline pt-6"
              onSubmit={(e) => {
                e.preventDefault();
                setPromoMsg(promo ? "Promo code applied at checkout." : "");
              }}
            >
              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Promo code"
                className="input-underline"
              />
              <button type="submit" className="label-caps shrink-0 border-b pb-3 hairline hover:text-gold">
                Apply
              </button>
            </form>
            {promoMsg && <p className="mt-2 text-xs text-mute">{promoMsg}</p>}

            <div className="mt-6 flex items-center justify-between border-t hairline pt-6 text-base">
              <span>Total</span>
              <span className="text-gold">{formatPrice(subtotal)}</span>
            </div>

            <Link to="/checkout" className="btn-outline mt-8 w-full justify-center text-ink">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
