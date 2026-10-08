/**
 * Contenido de las secciones de la home (borradores para iterar).
 * Voz: centrada en el cliente en Inicio, Metodología y Clientes; sin "nosotros".
 */

export const hero = {
  /** Titular por líneas (cada string se revela en orden). */
  titleLines: ["Software", "que resuelve."],
  lead: "Webs, sistemas a medida y posicionamiento en Google para negocios que quieren verse profesionales y trabajar mejor.",
  secondaryCta: "Ver proyectos",
  secondaryHref: "#proyectos",
} as const;

export type Service = {
  id: string;
  title: string;
  /** El problema, en palabras del cliente. */
  problem: string;
  solution: string;
  /** Proyecto que lo respalda (nombre visible; link cuando el caso esté publicado). */
  example?: string;
};

export const services = {
  eyebrow: "Servicios",
  title: "¿Qué necesita tu negocio?",
  items: [
    {
      id: "presencia",
      title: "Presencia que convierte",
      problem:
        "“Mi negocio no se ve profesional en internet y la gente no me contacta.”",
      solution:
        "Sitios y landings pensados para que te encuentren y te escriban.",
      example: "Roma Barber Club",
    },
    {
      id: "autonomia",
      title: "Sitios que podés gestionar",
      problem: "“Mi web está vieja y dependo de otro para cualquier cambio.”",
      solution: "Rediseño y migración a plataformas que podés editar vos.",
      example: "International Freight Forwarder",
    },
    {
      id: "sistemas",
      title: "Sistemas a medida",
      problem: "“Manejo todo con planillas, mensajes y papeles.”",
      solution: "Aplicaciones con las funciones que tu negocio necesita.",
      example: "Liga Mendocina de Ajedrez",
    },
    {
      id: "seo",
      title: "Visibilidad en Google",
      problem: "“No aparezco cuando me buscan.”",
      solution: "Auditoría y mejoras de SEO técnico para que te encuentren.",
      example: "La Retama",
    },
  ] satisfies Service[],
  exampleLabel: "Ejemplo:",
  alsoNote:
    "También: automatización de tareas repetitivas e integraciones entre herramientas.",
} as const;

export const methodology = {
  eyebrow: "Metodología",
  title: "Cómo es trabajar juntos",
  lead: "Un proceso claro, para que sepas qué pasa en cada etapa.",
  steps: [
    {
      title: "Entender",
      body: "Una charla para conocer tu negocio y lo que necesitás.",
    },
    {
      title: "Proponer",
      body: "Alcance, tiempos y una propuesta clara antes de empezar.",
    },
    {
      title: "Construir",
      body: "Avances visibles durante el desarrollo, con tu feedback.",
    },
    {
      title: "Acompañar",
      body: "Publicación y soporte después del lanzamiento.",
    },
  ],
} as const;

export type Client = {
  name: string;
  /** Rubro; se omite hasta confirmarlo. */
  industry?: string;
  work: string;
};

export const clients = {
  eyebrow: "Clientes",
  title: "Negocios que ya confiaron",
  items: [
    {
      name: "International Freight Forwarder",
      industry: "Logística internacional",
      work: "Rediseño del sitio y migración a WordPress editable",
    },
    {
      name: "Liga Mendocina de Ajedrez",
      industry: "Institución deportiva",
      work: "Sitio institucional con ranking, torneos y clubes",
    },
    {
      name: "Roma Barber Club",
      industry: "Barbería",
      work: "Landing comercial con servicios y contacto",
    },
    {
      name: "Salomón Barrios",
      industry: "Arte",
      work: "Portfolio de artista",
    },
    {
      name: "La Retama",
      work: "Auditoría SEO (en curso)",
    },
  ] satisfies Client[],
} as const;

export const behindStudio = {
  /** Línea discreta en Contacto (primera persona). */
  text: (brandName: string) =>
    `Detrás de ${brandName} estoy yo, Martín: trabajás directo con quien hace el trabajo.`,
  /** Se agrega como link cuando exista /estudio (T26). */
  linkLabel: "Conocé cómo trabajo",
} as const;
