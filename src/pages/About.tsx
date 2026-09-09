import { Container, Eyebrow } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { img, pool } from "@/data/unsplash";

const heroImage = img(pool.fashion[0], 2000, 1300);
const founderImage = img(pool.fashion[1], 1200, 1500);
const atelierImage = img(pool.jewelry[1], 1200, 1500);

export default function About() {
  return (
    <div>
      <section className="relative flex h-[70vh] min-h-[480px] items-center justify-center overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <Reveal className="relative z-10 px-6 text-center text-[#f5f3ef]">
          <Eyebrow className="text-[#c9a961]">Est. 2019</Eyebrow>
          <h1 className="mt-4 font-display text-5xl sm:text-7xl">Our Story</h1>
        </Reveal>
      </section>

      <section className="py-28">
        <Container className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="font-display text-2xl leading-relaxed sm:text-3xl">
              AURELIA was founded on a single belief: that luxury is not decoration, it is decision. Every
              object we make begins with a longer list of things we chose to leave out.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden bg-panel">
              <img src={founderImage} alt="Founder portrait" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <Eyebrow>The Founder</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">A House Built on Restraint</h2>
            <p className="mt-5 text-sm leading-relaxed text-mute">
              "I spent a decade watching brands add more — more finishes, more colorways, more limited
              editions — mistaking volume for value. AURELIA began as the opposite instinct: fewer objects,
              made properly, kept in production until they no longer needed to be."
            </p>
            <p className="mt-4 text-sm leading-relaxed text-mute">
              Every collection is still approved by hand, one piece at a time, before it is allowed to carry
              the name.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <Eyebrow>The Atelier</Eyebrow>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Made to Be Kept</h2>
            <p className="mt-5 text-sm leading-relaxed text-mute">
              Each piece passes through the hands of fewer than a dozen craftspeople, most of whom have
              worked with the house since its first collection. We work in small batches, not because we
              can't scale, but because scale is not the point.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-mute">
              Materials are chosen for how they age, not how they photograph. A patina is not a flaw in our
              world — it is the object doing exactly what it was designed to do.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="order-1 lg:order-2">
            <div className="aspect-[4/5] overflow-hidden bg-panel">
              <img src={atelierImage} alt="Atelier craftsmanship" className="h-full w-full object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-28">
        <Container className="grid grid-cols-1 gap-10 text-center sm:grid-cols-3">
          {[
            { stat: "2019", label: "Founded" },
            { stat: "< 12", label: "Craftspeople per piece" },
            { stat: "30-day", label: "Return policy, no exceptions" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <p className="font-display text-4xl text-gold">{item.stat}</p>
              <p className="label-caps mt-3 text-mute">{item.label}</p>
            </Reveal>
          ))}
        </Container>
      </section>
    </div>
  );
}
