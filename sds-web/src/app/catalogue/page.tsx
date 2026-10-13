import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogueGallery } from "@/components/CatalogueGallery";
import { JsonLd } from "@/components/JsonLd";
import { PhotoGrid } from "@/components/PhotoGrid";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/config/site";
import { PAGE_SIZE, categories, photos } from "@/data/catalogue";

export const metadata: Metadata = {
  title: "Catalogue de réalisations sur mesure",
  description: `${photos.length} réalisations : cuisines américaines, dressings, meubles TV, meubles de bureau, portes alu et bois, cloisons, revêtements muraux, fabriqués au Sénégal.`,
  alternates: { canonical: "/catalogue/" },
  openGraph: { url: "/catalogue/" },
};

const ld = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Accueil", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Catalogue", item: `${site.url}/catalogue/` },
      ],
    },
    {
      "@type": "ImageGallery",
      name: "Catalogue Sénégal Découpe Services",
      url: `${site.url}/catalogue/`,
      inLanguage: "fr",
      about: categories.map((c) => c.title),
      publisher: { "@id": `${site.url}/#organization` },
      image: photos.map((p) => ({
        "@type": "ImageObject",
        contentUrl: `${site.url}${p.src}`,
        caption: p.alt,
        width: p.width,
        height: p.height,
      })),
    },
  ],
};

export default function CataloguePage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pt-12 pb-20 md:px-8 md:pt-16 md:pb-28">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Catalogue</h1>
        <p className="mt-4 text-lg leading-relaxed text-stone">
          {photos.length} réalisations et modèles en {categories.length} catégories. Chaque pièce est adaptée à vos
          dimensions, vos matériaux et vos finitions.
        </p>
      </div>

      <div className="mt-10">
        {/* Without JS (and for crawlers) the first photos render as static markup. */}
        <Suspense fallback={<PhotoGrid photos={photos.slice(0, PAGE_SIZE)} />}>
          <CatalogueGallery />
        </Suspense>
      </div>

      <div className="mt-20 flex flex-col gap-6 border-t border-ink pt-8 md:flex-row md:items-center md:justify-between">
        <p className="max-w-xl text-xl font-medium">
          Un modèle vous plaît&nbsp;? Envoyez-nous la photo, nous l’adaptons à votre espace.
        </p>
        <WhatsAppButton>Demander un devis</WhatsAppButton>
      </div>
      <JsonLd data={ld} />
    </div>
  );
}
