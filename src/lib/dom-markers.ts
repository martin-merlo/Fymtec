/**
 * Atributos que marcan secciones en el DOM para componentes cliente.
 * Viven en un módulo sin "use client": si se exportaran desde un componente
 * cliente, en un Server Component llegarían como referencia y no como string.
 */
export const HERO_ATTR = "data-hero";
export const FINAL_CTA_ATTR = "data-final-cta";

/** Props para marcar un elemento: {...marker(HERO_ATTR)}. */
export function marker(attr: string): Record<string, string> {
  return { [attr]: "true" };
}
