"use client";

import Script from "next/script";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

// Official Instagram embed. The blockquote is a plain link until embed.js swaps it for the player.
export function InstagramEmbed({ url }: { url: string }) {
  return (
    <>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ margin: 0, width: "100%", minWidth: 0, maxWidth: 420, background: "#fff", border: 0, borderRadius: 4 }}
      >
        <a href={url} target="_blank" rel="noopener noreferrer" className="block p-6 text-center text-sm text-ink underline">
          Voir cette vidéo sur Instagram
        </a>
      </blockquote>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onReady={() => window.instgrm?.Embeds.process()}
      />
    </>
  );
}
