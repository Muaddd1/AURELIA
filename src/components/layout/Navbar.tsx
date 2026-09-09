import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Menu, Moon, ShoppingBag, Sun, X, Search } from "lucide-react";
import clsx from "clsx";
import { useUi } from "@/store/ui";
import { useCart } from "@/store/cart";
import { useWishlist } from "@/store/wishlist";
import { Container } from "@/components/ui/Container";
import { categoryLabels } from "@/data/products";

const collections = Object.entries(categoryLabels);

const primaryLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { openCart, openMobileNav, closeMobileNav, mobileNavOpen, theme, toggleTheme } = useUi();
  const cartCount = useCart((s) => s.count());
  const wishlistCount = useWishlist((s) => s.ids.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeMobileNav();
  }, [location.pathname, closeMobileNav]);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled ? "bg-canvas/90 backdrop-blur-md border-b hairline" : "bg-transparent"
        )}
      >
        <Container className="flex h-20 items-center justify-between">
          <button
            type="button"
            onClick={openMobileNav}
            className="flex items-center gap-2 lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.25} />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  clsx("label-caps link-underline", isActive ? "text-gold" : "text-ink")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/" className="font-display text-xl tracking-[0.15em] absolute left-1/2 -translate-x-1/2">
            AURELIA
          </Link>

          <div className="flex items-center gap-5">
            <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="hidden sm:block">
              {theme === "dark" ? (
                <Sun size={18} strokeWidth={1.25} />
              ) : (
                <Moon size={18} strokeWidth={1.25} />
              )}
            </button>
            <Link to="/search" aria-label="Search">
              <Search size={18} strokeWidth={1.25} />
            </Link>
            <Link to="/account" className="label-caps hidden lg:block">
              Account
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative">
              <Heart size={18} strokeWidth={1.25} />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] text-canvas">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button type="button" onClick={openCart} aria-label="Open cart" className="relative">
              <ShoppingBag size={18} strokeWidth={1.25} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] text-canvas">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-canvas lg:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Container className="flex h-20 items-center justify-between">
              <span className="font-display text-xl tracking-[0.15em]">AURELIA</span>
              <button type="button" onClick={closeMobileNav} aria-label="Close menu">
                <X size={22} strokeWidth={1.25} />
              </button>
            </Container>
            <Container className="mt-6 flex flex-col gap-8">
              <div>
                <p className="label-caps text-mute">Shop</p>
                <div className="mt-4 flex flex-col gap-4">
                  {collections.map(([slug, label]) => (
                    <Link key={slug} to={`/collection/${slug}`} className="font-display text-2xl">
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4 border-t hairline pt-6">
                {primaryLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="font-display text-2xl">
                    {link.label}
                  </Link>
                ))}
                <Link to="/account" className="font-display text-2xl">
                  Account
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
