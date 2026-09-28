import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";

/*
 * Tipografías PROVISORIAS (primitivos de marca). Se sirven self-hosted vía
 * next/font y se exponen como --brand-font-*; los tokens semánticos
 * (--font-sans, --font-display) las consumen desde globals.css.
 * Cambiar la identidad tipográfica = cambiar solo este archivo.
 */

const body = Geist({
  subsets: ["latin"],
  variable: "--brand-font-body",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--brand-font-display",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--brand-font-mono",
  display: "swap",
  preload: false,
});

/** Clases que declaran las variables de fuente; van en <html>. */
export const fontVariables = [
  body.variable,
  display.variable,
  mono.variable,
].join(" ");
