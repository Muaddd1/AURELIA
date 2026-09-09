import { Link } from "react-router-dom";
import { Container } from "@/components/ui/Container";
import { categoryLabels } from "@/data/products";

export function Footer() {
  return (
    <footer className="border-t hairline">
      <Container className="grid grid-cols-2 gap-12 py-20 lg:grid-cols-5">
        <div className="col-span-2">
          <span className="font-display text-2xl tracking-[0.15em]">AURELIA</span>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
            A cinematic commerce experience for those who notice the details.
          </p>
          <div className="mt-6 flex gap-5 text-mute">
            <a href="#" aria-label="Instagram" className="label-caps link-underline">IG</a>
            <a href="#" aria-label="X (Twitter)" className="label-caps link-underline">X</a>
            <a href="#" aria-label="YouTube" className="label-caps link-underline">YT</a>
          </div>
        </div>

        <div>
          <p className="label-caps text-mute">Shop</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            {Object.entries(categoryLabels).map(([slug, label]) => (
              <li key={slug}>
                <Link to={`/collection/${slug}`} className="link-underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="label-caps text-mute">Company</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li><Link to="/about" className="link-underline">About</Link></li>
            <li><Link to="/journal" className="link-underline">Journal</Link></li>
            <li><Link to="/contact" className="link-underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="label-caps text-mute">Account</p>
          <ul className="mt-4 flex flex-col gap-3 text-sm">
            <li><Link to="/account" className="link-underline">Sign In</Link></li>
            <li><Link to="/wishlist" className="link-underline">Wishlist</Link></li>
            <li><Link to="/cart" className="link-underline">Cart</Link></li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col items-center justify-between gap-4 border-t hairline py-6 text-xs text-mute sm:flex-row">
        <p>© {new Date().getFullYear()} AURELIA. All rights reserved.</p>
        <p className="label-caps">A Cinematic Commerce Experience</p>
      </Container>
    </footer>
  );
}
