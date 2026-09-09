import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal, RevealGroup } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/ui/ProductCard";
import { products, categoryLabels } from "@/data/products";
import { img, pool } from "@/data/unsplash";
import { formatPrice } from "@/lib/format";

const heroImage = img(pool.fashion[3], 2000, 1300);
const brandStoryImage = img(pool.fashion[2], 2000, 1300);

const featured = products.find((p) => p.isFeatured && p.category === "watches") ?? products[0];
const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

const categoryTiles = (Object.keys(categoryLabels) as (keyof typeof categoryLabels)[]).map((slug, i) => {
  const catProducts = products.filter((p) => p.category === slug);
  return {
    slug,
    label: categoryLabels[slug],
    image: catProducts[i % catProducts.length]?.images[0] ?? catProducts[0]?.images[0],
  };
});

const storyProducts = [
  products.find((p) => p.slug === "cascade-necklace"),
  products.find((p) => p.slug === "aurora-wireless-earbuds"),
].filter(Boolean) as typeof products;

export default function Home() {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <div>
      {/* 1. Cinematic hero */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden bg-canvas">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/50" />
        </motion.div>

        <motion.div
          className="relative z-10 flex flex-col items-center px-6 text-center text-[#f5f3ef]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="label-caps text-[#c9a961]">AURELIA — SS26</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-wide sm:text-7xl lg:text-8xl">
            TIMELESS.
            <br />
            BY DESIGN.
          </h1>
          <Link
            to="/shop"
            className="btn-outline mt-10 border-[#f5f3ef] text-[#f5f3ef] hover:bg-[#f5f3ef] hover:text-[#0b0b0c]"
          >
            Explore Collection <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 h-12 w-px -translate-x-1/2 bg-[#f5f3ef]/40"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />
      </section>

      {/* 2. Featured product */}
      <section className="py-28 lg:py-40">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden bg-panel lg:aspect-[3/4]">
              <img src={featured.images[0]} alt={featured.name} className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Eyebrow>Featured</Eyebrow>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">{featured.name}</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-mute">{featured.description}</p>
            <p className="mt-6 text-lg text-gold">{formatPrice(featured.price)}</p>
            <Link to={`/product/${featured.slug}`} className="label-caps mt-8 inline-block link-underline">
              Discover the Piece
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* 3. Shop by category */}
      <section className="py-16">
        <Container>
          <Reveal>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <Eyebrow>Explore</Eyebrow>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl">Shop by Category</h2>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {categoryTiles.map((tile, i) => (
              <Reveal key={tile.slug} delay={i * 0.07} className={i === 0 ? "col-span-2 sm:col-span-1" : ""}>
                <Link to={`/collection/${tile.slug}`} className="group relative block aspect-[3/4] overflow-hidden bg-panel">
                  <img
                    src={tile.image}
                    alt={tile.label}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/25 transition-colors duration-500 group-hover:bg-black/40" />
                  <span className="label-caps absolute bottom-5 left-5 text-[#f5f3ef]">{tile.label}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Product storytelling */}
      <section className="py-28 lg:py-40">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Eyebrow>Craft</Eyebrow>
            <p className="mt-4 font-display text-3xl leading-snug sm:text-4xl">
              "Crafted for those who notice the details."
            </p>
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2">
            {storyProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.15}>
                <div className="aspect-[4/5] overflow-hidden bg-panel">
                  <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                </div>
                <p className="mt-5 label-caps text-gold">{p.materials[0]}</p>
                <p className="mt-2 font-display text-xl">{p.name}</p>
                <p className="mt-2 max-w-sm text-sm text-mute">{p.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Best sellers */}
      <section className="py-16">
        <Container>
          <Reveal>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <Eyebrow>Most Loved</Eyebrow>
                <h2 className="mt-3 font-display text-3xl sm:text-4xl">Best Sellers</h2>
              </div>
              <Link to="/shop" className="label-caps hidden link-underline sm:block">
                View All
              </Link>
            </div>
          </Reveal>
          <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
            {bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* 6. Brand story */}
      <section className="relative flex h-[85vh] items-center justify-center overflow-hidden">
        <img src={brandStoryImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <Reveal className="relative z-10 mx-auto max-w-xl px-6 text-center text-[#f5f3ef]">
          <Eyebrow className="text-[#c9a961]">The Manifesto</Eyebrow>
          <p className="mt-6 font-display text-2xl leading-relaxed sm:text-3xl">
            We do not design for a season. We design for the object that outlives the trend that produced it —
            fewer things, made with more care, worn for longer.
          </p>
          <Link to="/about" className="label-caps mt-8 inline-block border-b border-[#f5f3ef] pb-1">
            Our Story
          </Link>
        </Reveal>
      </section>

      {/* 7. Newsletter */}
      <section className="py-28">
        <Container className="mx-auto max-w-lg text-center">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl">Enter the world of AURELIA.</h2>
            <p className="mt-4 text-sm text-mute">
              New arrivals, atelier notes, and early access to limited pieces — nothing else.
            </p>
            {subscribed ? (
              <p className="mt-8 label-caps text-gold">You're on the list.</p>
            ) : (
              <form
                className="mt-8 flex items-end gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="input-underline"
                  aria-label="Email address"
                />
                <button type="submit" className="label-caps shrink-0 border-b pb-3 hairline hover:text-gold">
                  Subscribe
                </button>
              </form>
            )}
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
