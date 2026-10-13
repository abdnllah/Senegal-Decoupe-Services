"use client";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { type CategorySlug, PAGE_SIZE, categories, photos as allPhotos } from "@/data/catalogue";
import { Lightbox } from "./Lightbox";
import { PhotoGrid } from "./PhotoGrid";

type Filter = CategorySlug | "tous";

const filters: { slug: Filter; label: string }[] = [
  { slug: "tous", label: "Tous" },
  ...categories.map((c) => ({ slug: c.slug, label: c.label })),
];

function isFilter(v: string | null): v is Filter {
  return v !== null && filters.some((f) => f.slug === v);
}

export function CatalogueGallery() {
  const param = useSearchParams().get("cat");
  const [filter, setFilter] = useState<Filter>(isFilter(param) ? param : "tous");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const list = filter === "tous" ? allPhotos : allPhotos.filter((p) => p.category === filter);
  const shown = list.slice(0, visible);

  function select(slug: Filter) {
    setFilter(slug);
    setVisible(PAGE_SIZE);
    const url = slug === "tous" ? window.location.pathname : `${window.location.pathname}?cat=${slug}`;
    window.history.replaceState(null, "", url);
  }

  return (
    <>
      <div className="sticky top-18 z-20 -mx-5 border-b border-line bg-paper/95 px-5 py-3 backdrop-blur md:top-20 md:-mx-8 md:px-8">
        <ul
          aria-label="Filtrer par catégorie"
          className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0"
        >
          {filters.map((f) => {
            const active = f.slug === filter;
            const count = f.slug === "tous" ? allPhotos.length : allPhotos.filter((p) => p.category === f.slug).length;
            return (
              <li key={f.slug} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => select(f.slug)}
                  className={`rounded-xs border px-3 py-1.5 text-sm whitespace-nowrap transition-colors ${
                    active ? "border-accent bg-accent text-white" : "border-line hover:border-ink"
                  }`}
                >
                  {f.label} <span className={active ? "text-white/80" : "text-stone"}>{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length} photos affichées
      </p>

      <div className="mt-8">
        <PhotoGrid
          photos={shown}
          onOpen={(i, el) => {
            opener.current = el;
            setLightbox(i);
          }}
        />
      </div>

      {visible < list.length && (
        <div className="mt-10 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-xs border border-ink px-8 py-3.5 font-medium transition-colors hover:bg-ink hover:text-white"
          >
            Afficher plus
          </button>
          <span className="text-sm text-stone">
            {shown.length} sur {list.length}
          </span>
        </div>
      )}

      <Lightbox
        photos={list}
        index={lightbox}
        onChange={(i) => {
          setLightbox(i);
          if (i >= visible) setVisible(Math.ceil((i + 1) / PAGE_SIZE) * PAGE_SIZE);
        }}
        onClose={() => {
          setLightbox(null);
          opener.current?.focus();
        }}
      />
    </>
  );
}
