/**
 * URL pública del sitio. En Vercel se toma la URL de producción del proyecto
 * (variable de sistema); se puede forzar con NEXT_PUBLIC_SITE_URL, por ejemplo
 * cuando exista el dominio propio.
 */
function resolveSiteUrl(): URL {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return new URL(explicit);

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);

  return new URL("http://localhost:3000");
}

export const siteUrl = resolveSiteUrl();

/** Solo la producción real se indexa; previews y local quedan fuera de buscadores. */
export const isIndexable =
  process.env.VERCEL_ENV === "production" ||
  process.env.NEXT_PUBLIC_FORCE_INDEX === "1";
