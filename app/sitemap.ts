import type { MetadataRoute } from "next";

import { products, storeConfig } from "@/config/store";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/suporte",
    "/politica-de-privacidade",
    "/termos",
    "/reembolso",
    ...products.map((product) => `/produto/${product.slug}`)
  ];

  return routes.map((route) => ({
    url: `${storeConfig.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/produto") ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
