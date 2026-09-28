import { brand } from "@/config/brand";

/** Link a un chat de WhatsApp con el mensaje precargado. */
export function whatsappUrl(
  message: string,
  phone: string = brand.contact.whatsapp,
): string {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Link mailto con asunto opcional. */
export function mailtoUrl(
  subject?: string,
  email: string = brand.contact.email,
): string {
  return subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
}
