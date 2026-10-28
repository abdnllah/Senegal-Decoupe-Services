// Encoded from /Videos-opt (see public/videos). Every source is a vertical 9:16 phone video.
export type Video = { src: string; poster: string; title: string };

export const meubleTvVideo: Video = {
  src: "/videos/meuble-tv.mp4",
  poster: "/videos/meuble-tv.jpg",
  title: "Mur TV rétroéclairé, habillage bois et panneaux muraux",
};

export const dressingVideo = {
  preview: "/videos/dressing-apercu.mp4",
  src: "/videos/dressing.mp4",
  poster: "/videos/dressing.jpg",
  title: "Visite d’un dressing équipé : accessoires et rangements",
};

// Reel copied from Instagram so the cover frame can be chosen; the card links back to the post.
export const instagramReel = {
  url: "https://www.instagram.com/reel/C5y4jLutGoV/",
  src: "/videos/instagram-reel.mp4",
  poster: "/videos/instagram-reel.jpg",
  title: "Portes, garde-corps en verre et escaliers posés par SDS",
};

// All clips are vertical 9:16 (540×960).
export const travaux: Video[] = Array.from({ length: 17 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/videos/travaux/travaux-${n}.mp4`,
    poster: `/videos/travaux/travaux-${n}.jpg`,
    title: `Chantier SDS, vidéo ${i + 1}`,
  };
});
