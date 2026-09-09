import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { getJournalPostBySlug, journalPosts } from "@/data/journal";

export default function JournalArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getJournalPostBySlug(slug) : undefined;

  if (!post) return <Navigate to="/journal" replace />;

  const more = journalPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="pb-24 pt-32">
      <Container className="mx-auto max-w-3xl">
        <Reveal>
          <Link to="/journal" className="label-caps flex items-center gap-2 link-underline">
            <ArrowLeft size={14} strokeWidth={1.25} /> Journal
          </Link>
          <Eyebrow className="mt-8">
            {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </Eyebrow>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{post.title}</h1>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 aspect-[16/9] overflow-hidden bg-panel">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        </Reveal>

        <div className="mx-auto mt-12 flex max-w-xl flex-col gap-6">
          {post.content.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <p className="text-base leading-relaxed text-mute">{paragraph}</p>
            </Reveal>
          ))}
        </div>
      </Container>

      {more.length > 0 && (
        <Container className="mt-24 border-t hairline pt-16">
          <Eyebrow>Continue Reading</Eyebrow>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {more.map((p) => (
              <Link key={p.slug} to={`/journal/${p.slug}`} className="group block">
                <div className="aspect-[16/10] overflow-hidden bg-panel">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="mt-4 font-display text-xl">{p.title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}
