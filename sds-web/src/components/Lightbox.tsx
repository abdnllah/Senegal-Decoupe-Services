"use client";

import { useEffect, useRef } from "react";
import type { Photo } from "@/data/catalogue";

// Native <dialog>: focus trap, Esc to close and inert background come from the browser.
export function Lightbox({
  photos,
  index,
  onChange,
  onClose,
}: {
  photos: Photo[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const p = index === null ? null : photos[index];
  const prev = () => index !== null && onChange((index - 1 + photos.length) % photos.length);
  const next = () => index !== null && onChange((index + 1) % photos.length);
  const closeOnSelf = (e: React.MouseEvent) => e.target === e.currentTarget && onClose();

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      aria-label={p?.alt ?? "Photo"}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-white"
    >
      {p && (
        <div className="flex h-full flex-col" onClick={closeOnSelf}>
          <div className="flex items-center justify-between px-4 py-3 text-sm md:px-6">
            <span aria-live="polite">
              {index! + 1} / {photos.length}
            </span>
            <button type="button" onClick={onClose} className="p-2 hover:text-accent" autoFocus>
              <span className="sr-only">Fermer</span>
              <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>
          <figure
            className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-4 pb-6 md:px-20"
            onClick={closeOnSelf}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- full-size original in a modal */}
            <img src={p.src} alt={p.alt} width={p.width} height={p.height} className="min-h-0 max-w-full flex-1 object-contain" />
            <figcaption className="text-center text-sm text-white/75">{p.alt}</figcaption>
          </figure>
          <button type="button" onClick={prev} className="absolute top-1/2 left-1 -translate-y-1/2 p-3 hover:text-accent md:left-4">
            <span className="sr-only">Photo précédente</span>
            <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M15 4l-8 8 8 8" />
            </svg>
          </button>
          <button type="button" onClick={next} className="absolute top-1/2 right-1 -translate-y-1/2 p-3 hover:text-accent md:right-4">
            <span className="sr-only">Photo suivante</span>
            <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M9 4l8 8-8 8" />
            </svg>
          </button>
        </div>
      )}
    </dialog>
  );
}
