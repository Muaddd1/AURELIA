import { Link } from "react-router-dom";
import { Container, Eyebrow } from "@/components/ui/Container";
import { RevealGroup } from "@/components/motion/Reveal";
import { journalPosts } from "@/data/journal";

export default function Journal() {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <Eyebrow>The Journal</Eyebrow>
        <h1 className="mt-3 font-display text-4xl sm:text-5xl">Notes from the House</h1>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
          {journalPosts.map((post) => (
            <Link key={post.slug} to={`/journal/${post.slug}`} className="group block">
              <div className="aspect-[16/10] overflow-hidden bg-panel">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                />
              </div>
              <p className="mt-5 text-xs text-mute">
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <h2 className="mt-2 font-display text-2xl">{post.title}</h2>
              <p className="mt-2 max-w-md text-sm text-mute">{post.excerpt}</p>
              <span className="label-caps mt-4 inline-block link-underline">Read Article</span>
            </Link>
          ))}
        </RevealGroup>
      </Container>
    </div>
  );
}
