// Encoded from /Videos-opt (see public/videos). Travaux clips are 16:9 with a blurred fill for portrait sources.
export type Video = { src: string; poster: string; title: string };

export const heroVideo = { src: "/videos/hero.mp4", poster: "/videos/hero.jpg" };

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

export const travaux: Video[] = Array.from({ length: 17 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/videos/travaux/travaux-${n}.mp4`,
    poster: `/videos/travaux/travaux-${n}.jpg`,
    title: `Chantier SDS, vidéo ${i + 1}`,
  };
});
