import { Link } from "react-router-dom";
import { Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Reveal>
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-4 font-display text-6xl sm:text-7xl">Not Found</h1>
        <p className="mx-auto mt-5 max-w-sm text-sm text-mute">
          This page has been discontinued, or never existed at all — much like the trends we choose not to
          follow.
        </p>
        <Link to="/" className="btn-outline mt-10 text-ink">
          Return Home
        </Link>
      </Reveal>
    </div>
  );
}
