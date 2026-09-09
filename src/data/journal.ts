import type { JournalPost } from "./types";
import { img, pool } from "./unsplash";

export const journalPosts: JournalPost[] = [
  {
    slug: "on-restraint",
    title: "On Restraint",
    date: "2026-08-02",
    excerpt: "Why the most confident design decision is often the thing you choose to leave out.",
    image: img(pool.fashion[4], 1600, 1000),
    content: [
      "There is a particular kind of confidence that shows up as absence — the button left off, the seam left visible, the logo left at home.",
      "At AURELIA, every object begins as a longer list of features that we then spend months removing. What survives is rarely the loudest idea in the room.",
      "This is not minimalism as a style. It is minimalism as a discipline — the belief that an object which needs to explain itself has already lost the argument.",
    ],
  },
  {
    slug: "the-atelier-notebook",
    title: "The Atelier Notebook: Autumn",
    date: "2026-07-14",
    excerpt: "Notes from the workshop floor as the autumn collection took its final shape.",
    image: img(pool.fashion[2], 1600, 1000),
    content: [
      "Every season begins with a material, not a sketch. This autumn it was a bolt of double-faced cashmere that arrived slightly heavier than we'd asked for.",
      "Rather than send it back, we built the wrap coat around its exact weight — a small accident that became the collection's anchor piece.",
      "These are the decisions that never make it into a lookbook, but they are the ones that matter most on the workshop floor.",
    ],
  },
  {
    slug: "materials-that-age-well",
    title: "Materials That Age Well",
    date: "2026-06-21",
    excerpt: "A short case for buying fewer things, made from materials that improve with time.",
    image: img(pool.accessories[2], 1600, 1000),
    content: [
      "Vegetable-tanned leather, solid brass, unlacquered titanium — none of these are trend-proof by accident. They are chosen because they do not stay new.",
      "A patina is not damage. It is documentation. Every mark is a record of a life actually lived alongside the object.",
      "We design with this in mind from the first sketch: not how a piece looks on day one, but how it will look in year ten.",
    ],
  },
  {
    slug: "a-conversation-on-craft",
    title: "A Conversation on Craft",
    date: "2026-05-09",
    excerpt: "We sat down with the workshop's lead goldsmith to talk about what changes, and what never does.",
    image: img(pool.jewelry[2], 1600, 1000),
    content: [
      "\"The tools have changed more than the hands have,\" she tells us, turning a half-finished cuff under the workshop light.",
      "\"What hasn't changed is the moment you know a piece is finished — not because a checklist says so, but because your hand stops wanting to touch it further.\"",
      "It is this instinct, more than any specification sheet, that still decides when a piece is ready to leave the workshop.",
    ],
  },
];

export function getJournalPostBySlug(slug: string) {
  return journalPosts.find((p) => p.slug === slug);
}
