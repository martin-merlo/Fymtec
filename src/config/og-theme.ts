/**
 * Colores para imágenes generadas (Open Graph) con next/og.
 * Satori no lee variables CSS, así que esto ESPEJA los primitivos de
 * src/styles/tokens.css en hex. Si cambia la paleta de marca, cambia acá también.
 */
export const ogTheme = {
  background: "#090a0e", // = --brand-neutral-950
  foreground: "#f5f7fa", // = --brand-neutral-50
  muted: "#9b9ea6", // = --brand-neutral-400
  highlight: "#00e0e0", // = --brand-accent-400
} as const;
