import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { siteUrl } from "@/config/site";

type PageMetadataInput = {
  title?: string;
  description?: string;
  /** Ruta absoluta dentro del sitio, por ejemplo "/trabajos/liga". */
  path: string;
};

/** Metadata consistente por página: canonical, Open Graph y Twitter. */
export function pageMetadata({
  title,
  description = brand.tagline,
  path,
}: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} · ${brand.name}` : brand.name;

  return {
    title: title ?? { absolute: brand.name },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: brand.locale.replace("-", "_"),
      siteName: brand.name,
      title: fullTitle,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/**
 * Serializa JSON-LD para un <script type="application/ld+json">.
 * Escapa "<" para evitar inyección de HTML (recomendación de la guía de Next).
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** JSON-LD del estudio como servicio profesional. */
export function studioJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brand.name,
    description: brand.tagline,
    url: siteUrl.toString(),
    email: `mailto:${brand.contact.email}`,
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mendoza",
      addressCountry: "AR",
    },
    ...(brand.social.github ? { sameAs: [brand.social.github] } : {}),
  };
}
