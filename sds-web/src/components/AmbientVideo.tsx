"use client";

import { useEffect, useRef, useState } from "react";

// Silent looping video that only plays while on screen, and never for users who prefer reduced motion
// (they keep the poster).
export function AmbientVideo({
  src,
  poster,
  className = "",
  fadeIn = false,
}: {
  src: string;
  poster?: string;
  className?: string;
  fadeIn?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
      className={`${className} ${fadeIn ? `transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}` : ""}`}
    />
  );
}
