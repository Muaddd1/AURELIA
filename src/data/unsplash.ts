/** Builds a cropped, format-optimized Unsplash delivery URL from a photo id. */
export function img(id: string, w = 1200, h?: number): string {
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: "80",
  });
  if (h) params.set("h", String(h));
  return `https://images.unsplash.com/photo-${id}?${params.toString()}`;
}

// Every id below has been visually verified at full size to carry no
// legible real-brand name, logo, or trade dress — safe for a resellable,
// brand-agnostic template.
export const pool = {
  watches: [
    "1633451238208-11c8e6c1fed4", // watch movement / gears macro
    "1523275335684-37898b6baf30", // white smartwatch pair, product render
    "1509048191080-d2984bad6ae5", // antique pocket watch on chain
  ],
  jewelry: [
    "1599707367072-cd6ada2bc375", // loose diamonds on dark glass
    "1543294001-f7cd5d7fb516", // stacked gold rings, pavé diamonds
    "1764181237984-70ac5f211b06", // hands wearing gold rings/bracelets
    "1601121141461-9d6647bca1ed", // gold necklace + earring set
  ],
  accessories: [
    "1617636521236-db69104aa220", // blue denim patchwork tote bag
    "1606196373155-357259701f44", // pink-lensed shield sunglasses
    "1620109176813-e91290f6c795", // brown leather bifold wallet
  ],
  fashion: [
    "1517841905240-472988babdf9", // street style, denim jacket + hoodie
    "1487222477894-8943e31ef7b2", // street style, leather jacket + sunglasses
    "1490481651871-ab68de25d43d", // clothes on wooden hangers, curated rack
    "1490578474895-699cd4e2cf59", // friends sitting, lifestyle wide shot
    "1523381210434-271e8be1f52b", // t-shirts on wooden hangers
  ],
  perfume: [
    "1666621630026-862eea07236c", // frosted bottle, fictional niche label
    "1608721279136-cd41b752fa41", // abstract blue/pink-lit glass bottle
  ],
  tech: [
    "1576082712237-eb1335ce23a3", // hand holding black over-ear headphones
    "1713801129175-8e60c67e0412", // rim-lit headphones silhouette
  ],
} as const;
