"use client";

import { useRef } from "react";
import { dressingVideo } from "@/data/videos";
import { AmbientVideo } from "./AmbientVideo";

export function DressingFeature() {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);

  function open() {
    dialog.current?.showModal();
    player.current?.play().catch(() => {});
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="group relative mx-auto block aspect-[9/16] w-full max-w-sm overflow-hidden bg-ink text-left"
        aria-label={`Regarder la vidéo : ${dressingVideo.title}`}
      >
        <AmbientVideo
          src={dressingVideo.preview}
          poster={dressingVideo.poster}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" aria-hidden="true" />
        <span className="absolute bottom-5 left-5 flex items-center gap-3 text-white md:bottom-8 md:left-8">
          <PlayIcon />
          <span className="font-medium">
            Regarder la vidéo <span className="text-white/70">· 4 min, avec le son</span>
          </span>
        </span>
      </button>

      <dialog
        ref={dialog}
        aria-label={dressingVideo.title}
        onClose={() => player.current?.pause()}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-auto w-[min(92vw,calc(82svh*9/16))] bg-transparent p-0"
      >
        <video
          ref={player}
          src={dressingVideo.src}
          poster={dressingVideo.poster}
          controls
          playsInline
          preload="none"
          className="aspect-[9/16] w-full bg-ink"
        />
        <form method="dialog" className="mt-3 text-center">
          <button className="rounded-xs border border-white/60 px-5 py-2 text-sm text-white hover:bg-white hover:text-ink">
            Fermer
          </button>
        </form>
      </dialog>
    </>
  );
}

export function PlayIcon({ className = "size-14" }: { className?: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform group-hover:scale-110 ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="ml-0.5 size-[40%]" fill="currentColor">
        <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.86-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14" />
      </svg>
    </span>
  );
}
