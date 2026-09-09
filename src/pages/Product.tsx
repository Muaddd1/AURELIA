import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { StarRating } from "@/components/ui/StarRating";
import { Accordion } from "@/components/ui/Accordion";
import { ProductCard } from "@/components/ui/ProductCard";
import { getProductBySlug, getRelated } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { useUi } from "@/store/ui";

export default function Product() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  const [activeImage, setActiveImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [color, setColor] = useState<string | undefined>(product?.colors[0]?.name);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [added, setAdded] = useState(false);

  const add = useCart((s) => s.add);
  const openCart = useUi((s) => s.openCart);
  const wishlisted = useWishlist((s) => (product ? s.has(product.id) : false));
  const toggleWishlist = useWishlist((s) => s.toggle);

  if (!product) return <Navigate to="/shop" replace />;

  const related = getRelated(product);
  const avgRating = product.reviews.length
    ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
    : 0;

  function handleAddToCart() {
    if (!product) return;
    add(product, { color, size, quantity: 1 });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="pt-32">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div>
            <div
              className={clsx(
                "relative aspect-[4/5] overflow-hidden bg-panel",
                zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
              )}
              onClick={() => setZoomed((z) => !z)}
            >
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className={clsx(
                  "h-full w-full object-cover transition-transform duration-500 ease-out",
                  zoomed && "scale-150"
                )}
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {product.images.map((image, i) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={clsx(
                      "h-20 w-16 overflow-hidden border transition-colors",
                      activeImage === i ? "border-gold" : "border-transparent"
                    )}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <Eyebrow>{product.category}</Eyebrow>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <StarRating rating={avgRating} />
              <span className="text-xs text-mute">{product.reviews.length} reviews</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xl text-gold">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-sm text-mute line-through">{formatPrice(product.compareAtPrice)}</span>
              )}
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-mute">{product.description}</p>

            {product.colors.length > 0 && (
              <div className="mt-8">
                <p className="label-caps text-mute">Color — {color}</p>
                <div className="mt-3 flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      aria-label={c.name}
                      onClick={() => setColor(c.name)}
                      className={clsx(
                        "h-8 w-8 rounded-full border transition-all",
                        color === c.name ? "border-gold" : "border-transparent"
                      )}
                      style={{ backgroundColor: c.hex, boxShadow: "inset 0 0 0 1px var(--color-hairline)" }}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="mt-6">
                <p className="label-caps text-mute">Size {size ? `— ${size}` : ""}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      className={clsx(
                        "border px-4 py-2 text-xs transition-colors",
                        size === s ? "border-gold text-gold" : "border-[var(--color-hairline)]"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 flex gap-3">
              <button type="button" onClick={handleAddToCart} className="btn-outline flex-1 justify-center text-ink">
                {added ? "Added to Bag" : "Add to Bag"}
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center border hairline"
              >
                <Heart size={16} strokeWidth={1.25} className={clsx(wishlisted && "fill-gold text-gold")} />
              </button>
            </div>

            <div className="mt-12">
              <Accordion
                items={[
                  {
                    title: "Description",
                    content: <p>{product.description}</p>,
                    defaultOpen: true,
                  },
                  {
                    title: "Materials & Care",
                    content: (
                      <ul className="flex flex-col gap-1.5">
                        {product.materials.map((m) => (
                          <li key={m}>— {m}</li>
                        ))}
                        {product.details.map((d) => (
                          <li key={d}>— {d}</li>
                        ))}
                      </ul>
                    ),
                  },
                  {
                    title: "Shipping & Returns",
                    content: (
                      <p>
                        Complimentary shipping on all orders. Delivered in 3–7 business days via tracked courier.
                        Returns accepted within 30 days in original, unworn condition.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mx-auto mt-32 max-w-2xl">
          <Reveal>
            <div className="flex items-center justify-between border-b hairline pb-6">
              <h2 className="font-display text-2xl">Reviews</h2>
              <div className="flex items-center gap-2">
                <StarRating rating={avgRating} />
                <span className="text-sm text-mute">{avgRating.toFixed(1)} / 5</span>
              </div>
            </div>
          </Reveal>
          <div className="mt-6 flex flex-col divide-y divide-[var(--color-hairline)]">
            {product.reviews.map((r, i) => (
              <Reveal key={i} delay={i * 0.08} className="py-6">
                <div className="flex items-center justify-between">
                  <p className="label-caps">{r.author}</p>
                  <span className="text-xs text-mute">{r.date}</span>
                </div>
                <StarRating rating={r.rating} size={12} />
                <p className="mt-3 text-sm leading-relaxed text-mute">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-32 pb-24">
            <Reveal>
              <Eyebrow>You May Also Like</Eyebrow>
              <h2 className="mt-3 font-display text-3xl">Complete the Look</h2>
            </Reveal>
            <RevealGroup className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </RevealGroup>
          </div>
        )}
      </Container>
    </div>
  );
}
