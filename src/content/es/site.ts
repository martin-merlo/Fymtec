/** Contenido global del sitio (navegación y textos compartidos entre páginas). */

export type NavItem = {
  label: string;
  href: string;
  /** id de la sección de la home que activa este ítem, si corresponde. */
  section?: string;
};

export const nav = {
  label: "Principal",
  items: [
    { label: "Servicios", href: "/#servicios", section: "servicios" },
    { label: "Trabajos", href: "/#trabajos", section: "trabajos" },
    { label: "Proceso", href: "/#proceso", section: "proceso" },
    { label: "Estudio", href: "/estudio" },
  ] satisfies NavItem[],
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  homeLink: "Ir al inicio",
} as const;

export const finalCta = {
  eyebrow: "Contacto",
  title: "¿Tenés un proyecto en mente?",
  lead: "Contame qué necesitás y lo charlamos, sin compromiso. La forma más rápida es WhatsApp; si preferís, también por email.",
} as const;

export const footer = {
  sectionsTitle: "Secciones",
  contactTitle: "Contacto",
  github: "GitHub",
  rights: "Todos los derechos reservados.",
} as const;

export const contactPage = {
  title: "Contacto",
  description: "Contame tu idea: escribime por WhatsApp o por email.",
} as const;
