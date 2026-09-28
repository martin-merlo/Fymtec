import type { VariantProps } from "class-variance-authority";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { buttonVariants } from "@/components/ui/button";
import { brand } from "@/config/brand";
import { contact } from "@/content/es/contact";
import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

type WhatsAppCtaProps = VariantProps<typeof buttonVariants> & {
  label?: string;
  className?: string;
};

/** CTA principal de conversión: abre WhatsApp con el mensaje precargado. */
export function WhatsAppCta({
  label = contact.whatsappCta,
  variant,
  size = "lg",
  className,
}: WhatsAppCtaProps) {
  return (
    <a
      href={whatsappUrl(contact.whatsappMessage(brand.name))}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <WhatsAppIcon data-icon="inline-start" />
      {label}
    </a>
  );
}
