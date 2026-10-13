import Image from "next/image";
import type { Photo } from "@/data/catalogue";
import { categoryTitle } from "@/data/catalogue";

// Masonry via CSS columns. Without onOpen (server fallback) the figures are plain, crawlable markup.
export function PhotoGrid({ photos, onOpen }: { photos: Photo[]; onOpen?: (index: number, el: HTMLElement) => void }) {
  return (
    <ul className="columns-2 gap-3 md:columns-3 md:gap-5 xl:columns-4">
      {photos.map((p, i) => {
        const img = (
          <Image
            src={p.src}
            alt={p.alt}
            width={p.width}
            height={p.height}
            loading="lazy"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="h-auto w-full bg-line transition-opacity group-hover:opacity-90"
          />
        );
        return (
          <li key={p.src} className="mb-3 break-inside-avoid md:mb-5">
            <figure>
              {onOpen ? (
                <button
                  type="button"
                  className="group block w-full cursor-zoom-in"
                  onClick={(e) => onOpen(i, e.currentTarget)}
                  aria-label={`Agrandir : ${p.alt}`}
                >
                  {img}
                </button>
              ) : (
                img
              )}
              <figcaption className="mt-1.5 text-xs text-stone md:text-sm">{categoryTitle(p.category)}</figcaption>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
