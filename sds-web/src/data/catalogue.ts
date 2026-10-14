import { rawPhotos } from "./photos.generated";

export const categories = [
  { slug: "cuisine-americaine", label: "Cuisine américaine", title: "Cuisines américaines", cover: 30 },
  { slug: "dressing", label: "Dressing", title: "Dressings", cover: 4 },
  { slug: "portes-alu", label: "Portes alu", title: "Portes alu et baies vitrées", cover: 17 },
  { slug: "portes-bois", label: "Portes bois", title: "Portes bois laminé", cover: 3 },
  { slug: "meubles-tv", label: "Meubles TV", title: "Meubles TV", cover: 12 },
  { slug: "meubles-bureau", label: "Meubles bureau", title: "Meubles de bureau", cover: 24 },
  { slug: "lits-armoires", label: "Lits et armoires", title: "Lits, armoires, coiffeuses", cover: 13 },
  { slug: "consoles-3d", label: "Consoles 3D", title: "Consoles et panneaux 3D", cover: 9 },
  { slug: "revetements-muraux", label: "Revêtements muraux", title: "Revêtements muraux", cover: 3 },
  { slug: "cloisons", label: "Cloisons", title: "Cloisons", cover: 14 },
  { slug: "lavabo", label: "Lavabo", title: "Lavabos et salles d’eau", cover: 2 },
] as const;

// Photos shown per "Afficher plus" step in the catalogue.
export const PAGE_SIZE = 24;

export type CategorySlug =(typeof categories)[number]["slug"];

export type Photo = {
  src: string;
  category: CategorySlug;
  width: number;
  height: number;
  alt: string;
};

const titleBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.title])) as Record<CategorySlug, string>;

export function categoryTitle(slug: CategorySlug) {
  return titleBySlug[slug];
}

// Ordered by category (as listed above), then by number.
export const photos: Photo[] = categories.flatMap((c) =>
  rawPhotos
    .filter((p) => p.category === c.slug)
    .sort((a, b) => a.n - b.n)
    .map((p, i) => ({
      src: p.src,
      category: p.category,
      width: p.width,
      height: p.height,
      alt: `${c.title}, réalisation ${i + 1}`,
    })),
);

export function photo(slug: CategorySlug, n: number): Photo {
  const p = photos.find((x) => x.category === slug && x.src.endsWith(`-${String(n).padStart(2, "0")}.jpg`));
  if (!p) throw new Error(`Missing photo ${slug} ${n}`);
  return p;
}

export const heroPhoto = photo("cuisine-americaine", 24);

type Metier = { title: string; href: string; cover: Photo; wide?: boolean };

function metier(slug: CategorySlug, wide = false): Metier {
  const c = categories.find((x) => x.slug === slug)!;
  return { title: c.title, href: `/catalogue/?cat=${slug}`, cover: photo(slug, c.cover), wide };
}

// Home "Métiers" index. Doors are grouped here but stay separate filters in the catalogue.
// Order matters: the two wide entries fill a 4-column grid with no gaps.
export const metiers: Metier[] = [
  metier("cuisine-americaine", true),
  metier("dressing"),
  metier("meubles-tv"),
  {
    title: "Portes alu et bois",
    href: "/catalogue/?cat=portes-alu",
    cover: photo("portes-alu", 17),
  },
  metier("lits-armoires"),
  metier("meubles-bureau", true),
  metier("revetements-muraux"),
  metier("cloisons"),
  metier("consoles-3d"),
  metier("lavabo"),
];

export const selectedWorks: Photo[] = [
  photo("cuisine-americaine", 37),
  photo("meubles-tv", 9),
  photo("meubles-bureau", 18),
  photo("dressing", 1),
  photo("revetements-muraux", 11),
  photo("portes-alu", 14),
];
