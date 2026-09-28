/**
 * Identidad de la marca: única fuente de verdad.
 *
 * El nombre es PROVISORIO ("nombre de trabajo"). Ningún componente, texto ni
 * asset debe escribirlo literal: siempre se lee desde acá. Lo mismo vale para
 * contacto, ubicación y redes.
 */
export const brand = {
  name: "Mertech",
  tagline: "Soluciones digitales para negocios",
  location: "Mendoza, Argentina · Trabajo remoto",
  locale: "es-AR",

  contact: {
    /** Número en formato wa.me: 549 + código de área sin 0 + número sin 15. */
    whatsapp: "5492614160956",
    email: "martinmerlo360@gmail.com",
    /** El formulario (Route Handler + Resend) queda construido pero apagado en v1. */
    formEnabled: false,
  },

  social: {
    /** Se completa cuando exista el repositorio público. */
    github: undefined as string | undefined,
  },
} as const;

export type Brand = typeof brand;
