import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import clsx from "clsx";
import { useUi } from "@/store/ui";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { StarRating } from "@/components/ui/StarRating";

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView, openCart } = useUi();
  const add = useCart((s) => s.add);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [size, setSize] = useState<string | undefined>(undefined);
  const product = quickViewProduct;

  const avgRating = product?.reviews.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 0;

  function handleClose() {
    closeQuickView();
    setColor(undefined);
    setSize(undefined);
  }

  function handleAdd() {
    if (!product) return;
    add(product, { color: color ?? product.colors[0]?.name, size });
    closeQuickView();
    openCart();
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="relative grid w-full max-w-3xl grid-cols-1 gap-8 bg-canvas p-6 sm:grid-cols-2 sm:p-8"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" onClick={handleClose} aria-label="Close" className="absolute right-4 top-4 z-10">
                <X size={20} strokeWidth={1.25} />
              </button>

              <div className="aspect-[4/5] overflow-hidden bg-panel">
                <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-col">
                <p className="label-caps text-gold">{product.category}</p>
                <h2 className="mt-2 font-display text-2xl">{product.name}</h2>
                <div className="mt-2 flex items-center gap-2">
                  <StarRating rating={avgRating} />
                  <span className="text-xs text-mute">({product.reviews.length})</span>
                </div>
                <p className="mt-3 text-lg text-gold">{formatPrice(product.price)}</p>
                <p className="mt-4 text-sm leading-relaxed text-mute">{product.description}</p>

                {product.colors.length > 0 && (
                  <div className="mt-6">
                    <p className="label-caps text-mute">Color</p>
                    <div className="mt-2 flex gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          aria-label={c.name}
                          onClick={() => setColor(c.name)}
                          className={clsx(
                            "h-7 w-7 rounded-full border transition-all",
                            (color ?? product.colors[0].name) === c.name ? "border-gold" : "border-transparent"
                          )}
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes && (
                  <div className="mt-4">
                    <p className="label-caps text-mute">Size</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSize(s)}
                          className={clsx(
                            "border px-3 py-1.5 text-xs transition-colors",
                            size === s ? "border-gold text-gold" : "border-[var(--color-hairline)]"
                          )}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto flex flex-col gap-3 pt-8">
                  <button type="button" onClick={handleAdd} className="btn-outline w-full justify-center text-ink">
                    Add to Bag
                  </button>
                  <Link to={`/product/${product.slug}`} onClick={handleClose} className="label-caps text-center link-underline">
                    View Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
