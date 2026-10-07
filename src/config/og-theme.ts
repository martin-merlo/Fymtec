/**
 * Colores para imágenes generadas (Open Graph) con next/og.
 * Satori no lee variables CSS, así que esto ESPEJA los primitivos de
 * src/styles/tokens.css (tema oscuro). Si cambia la paleta de marca, cambia acá también.
 */
export const ogTheme = {
  background: "#0a1218", // = --brand-night-950
  foreground: "#f1f5f8", // = --brand-snow
  muted: "#9baab6", // = --brand-gray-400
  highlight: "#5cb3e8", // = --brand-sky-400
  logoSlate: "#f1f5f8", // = --logo-slate (tema oscuro)
  logoBlue: "#2678ad", // = --logo-blue (tema oscuro)
} as const;
