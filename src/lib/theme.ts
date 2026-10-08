/**
 * Tema del sitio. Sin "use client": lo usan el layout (servidor) y el selector
 * (cliente). El tema vive en <html data-theme>; los colores salen de tokens.css.
 */
export const THEMES = ["dark", "light"] as const;
export type Theme = (typeof THEMES)[number];

/** Dark-first: sin elección guardada, el sitio arranca en oscuro. */
export const DEFAULT_THEME: Theme = "dark";
export const THEME_STORAGE_KEY = "theme";

/** Clase que habilita la transición de colores solo durante el cambio de tema. */
export const THEME_SWITCHING_CLASS = "theme-switching";

export function isTheme(value: unknown): value is Theme {
  return THEMES.includes(value as Theme);
}

/**
 * Script inline para el <head>: aplica el tema guardado antes del primer
 * pintado (sin parpadeo). Valida el valor y tolera localStorage bloqueado.
 */
export const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});if(${JSON.stringify(THEMES)}.indexOf(t)>-1)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
