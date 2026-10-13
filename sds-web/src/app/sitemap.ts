import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { photos } from "@/data/catalogue";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/catalogue/`,
      changeFrequency: "monthly",
      priority: 0.9,
      images: photos.map((p) => `${site.url}${p.src}`),
    },
    { url: `${site.url}/contact/`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
