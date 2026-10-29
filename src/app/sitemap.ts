import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://wildsumatraecotours.com",
      lastModified: "2026-10-29",
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
