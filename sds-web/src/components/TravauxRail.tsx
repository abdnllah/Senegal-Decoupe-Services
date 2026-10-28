"use client";

import { useRef, useState } from "react";
import { travaux } from "@/data/videos";
import { PlayIcon } from "./DressingFeature";

// Side-scrolling strip of 16:9 clips. Posters only until a clip is clicked; one plays at a time.
export function TravauxRail() {
  const rail = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);

  function scroll(dir: 1 | -1) {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 24), behavior: "smooth" });
  }

  return (
    <div>
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 md:px-8">
        <div>
          <h3 id="travaux" className="text-2xl font-semibold tracking-tight md:text-3xl">
            Travaux
          </h3>
          <p className="mt-2 text-stone">Nos chantiers en vidéo, de l’atelier à la pose.</p>
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <ArrowButton label="Vidéos précédentes" onClick={() => scroll(-1)} flip />
          <ArrowButton label="Vidéos suivantes" onClick={() => scroll(1)} />
        </div>
      </div>
      <ul
        ref={rail}
        aria-labelledby="travaux"
        className="mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:thin] md:scroll-px-8 md:gap-6 md:px-8 xl:px-[max(2rem,calc((100vw-80rem)/2+2rem))] xl:scroll-px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {travaux.map((v, i) => (
          <li key={v.src} className="aspect-[9/16] h-[min(32rem,68svh)] shrink-0 snap-start">
            <div className="relative size-full overflow-hidden rounded-xs bg-ink">
              {active === i ? (
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  autoPlay
                  playsInline
                  className="size-full object-contain"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Lire : ${v.title}`}
                  className="group relative block size-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.poster}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-ink/15 transition-colors group-hover:bg-ink/30">
                    <PlayIcon />
                  </span>
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ArrowButton({ label, onClick, flip = false }: { label: string; onClick: () => void; flip?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors hover:border-ink hover:bg-ink hover:text-white"
    >
      <svg viewBox="0 0 24 24" className={`size-5 ${flip ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}
