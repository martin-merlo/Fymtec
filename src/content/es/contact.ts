/** Textos de contacto. Los datos (número, email) viven en brand.ts. */
export const contact = {
  whatsappMessage: (brandName: string) =>
    `Hola, vi el sitio de ${brandName} y quiero contarte sobre un proyecto.`,
  whatsappCta: "Contame tu idea",
  whatsappShort: "Hablemos",
  whatsappAria: "Escribir por WhatsApp",
  emailCta: "Escribir un email",
  emailSubject: "Consulta desde el sitio",
  copyEmail: "Copiar email",
  copied: "Email copiado",
  copyFailed: "No se pudo copiar. El email es",
} as const;
