import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { QuickViewModal } from "@/components/layout/QuickViewModal";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { PageTransition } from "@/components/motion/PageTransition";
import { useThemeSync } from "@/lib/useThemeSync";

import Home from "@/pages/Home";

const Shop = lazy(() => import("@/pages/Shop"));
const Collection = lazy(() => import("@/pages/Collection"));
const Product = lazy(() => import("@/pages/Product"));
const Search = lazy(() => import("@/pages/Search"));
const Cart = lazy(() => import("@/pages/Cart"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const About = lazy(() => import("@/pages/About"));
const Journal = lazy(() => import("@/pages/Journal"));
const JournalArticle = lazy(() => import("@/pages/JournalArticle"));
const Contact = lazy(() => import("@/pages/Contact"));
const Account = lazy(() => import("@/pages/Account"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function App() {
  const location = useLocation();
  useThemeSync();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <QuickViewModal />

      <AnimatePresence mode="wait" initial={false}>
        <div key={location.pathname}>
          <PageTransition>
            <main>
              <Suspense fallback={<div className="h-screen" />}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/collection/:slug" element={<Collection />} />
                  <Route path="/product/:slug" element={<Product />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/journal" element={<Journal />} />
                  <Route path="/journal/:slug" element={<JournalArticle />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </PageTransition>
        </div>
      </AnimatePresence>
    </div>
  );
}
