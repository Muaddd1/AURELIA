import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { useUi } from "@/store/ui";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const { cartOpen, closeCart } = useUi();
  const lines = useCart((s) => s.lines);
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-canvas"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b hairline px-6 py-6">
              <p className="label-caps">Your Bag ({lines.reduce((n, l) => n + l.quantity, 0)})</p>
              <button type="button" onClick={closeCart} aria-label="Close cart">
                <X size={20} strokeWidth={1.25} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-sm text-mute">Your bag is empty.</p>
                  <button type="button" onClick={closeCart} className="btn-outline mt-6">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-[var(--color-hairline)]">
                  {lines.map((line) => (
                    <li key={`${line.productId}-${line.color}-${line.size}`} className="flex gap-4 py-6">
                      <Link to={`/product/${line.slug}`} onClick={closeCart} className="h-24 w-20 shrink-0 overflow-hidden bg-panel">
                        <img src={line.image} alt={line.name} className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link to={`/product/${line.slug}`} onClick={closeCart} className="font-display text-sm">
                            {line.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => remove(line.productId, line.color, line.size)}
                            aria-label="Remove item"
                            className="text-mute"
                          >
                            <X size={14} strokeWidth={1.25} />
                          </button>
                        </div>
                        <p className="mt-1 text-xs text-mute">
                          {[line.color, line.size].filter(Boolean).join(" / ")}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-3 border hairline px-2 py-1">
                            <button
                              type="button"
                              onClick={() => setQuantity(line.productId, line.quantity - 1, line.color, line.size)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} strokeWidth={1.25} />
                            </button>
                            <span className="w-4 text-center text-xs">{line.quantity}</span>
                            <button
                              type="button"
                              onClick={() => setQuantity(line.productId, line.quantity + 1, line.color, line.size)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} strokeWidth={1.25} />
                            </button>
                          </div>
                          <span className="text-sm">{formatPrice(line.price * line.quantity)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t hairline px-6 py-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-mute">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-mute">Shipping & taxes calculated at checkout.</p>
                <Link to="/checkout" onClick={closeCart} className="btn-outline mt-6 w-full justify-center text-ink">
                  Checkout
                </Link>
                <Link to="/cart" onClick={closeCart} className="label-caps mt-4 block text-center link-underline">
                  View Bag
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
