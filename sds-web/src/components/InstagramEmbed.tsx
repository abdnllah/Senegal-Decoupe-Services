"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import { instagramReel } from "@/data/videos";
import { PlayIcon } from "./DressingFeature";
import { InstagramIcon } from "./SocialIcons";

// Instagram-style post card: our own cover frame, plays inline, links back to the reel.
export function InstagramEmbed() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { handle, url: profile } = site.social.instagram;

  function play() {
    setPlaying(true);
    video.current?.play().catch(() => {});
  }

  return (
    <div className="group relative w-full max-w-[22rem] [perspective:1200px]">
      {/* Soft accent glow that blooms behind the card on hover */}
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/50 via-fuchsia-500/25 to-amber-400/30 opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
      />
      <article className="relative overflow-hidden rounded-3xl bg-white text-ink shadow-2xl shadow-black/40 ring-1 ring-white/10 transition-transform duration-500 ease-out group-hover:[transform:rotateX(4deg)_rotateY(-6deg)_translateY(-0.5rem)] motion-reduce:group-hover:[transform:none]">
        <header className="flex items-center gap-3 px-4 py-3">
          <span className="rounded-full bg-gradient-to-tr from-amber-400 via-accent to-fuchsia-600 p-[2px]">
            <span className="flex size-8 items-center justify-center rounded-full bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/logo.svg" alt="" className="w-6 object-contain" />
            </span>
          </span>
          <a href={profile} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 truncate text-sm font-semibold">
            {handle}
          </a>
          <InstagramIcon className="size-5 text-ink/70" />
        </header>

        <div className="relative aspect-[720/1056] bg-ink">
          <video
            ref={video}
            src={instagramReel.src}
            poster={instagramReel.poster}
            controls={playing}
            playsInline
            preload="none"
            className="size-full object-cover"
          />
          {!playing && (
            <button
              type="button"
              onClick={play}
              aria-label={`Lire la vidéo : ${instagramReel.title}`}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-ink/50 via-transparent to-transparent"
            >
              <PlayIcon className="size-16" />
            </button>
          )}
        </div>

        <footer className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
          <p className="line-clamp-1 text-stone">{instagramReel.title}</p>
          <a
            href={instagramReel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 font-semibold text-accent hover:text-accent-dark"
          >
            Voir sur Instagram ↗
          </a>
        </footer>
      </article>
    </div>
  );
}
