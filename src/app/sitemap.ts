import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";

/** Rutas públicas. Se amplía a medida que se suman páginas y casos. */
const routes = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: new URL(path, siteUrl).toString(),
    lastModified: new Date(),
  }));
}
