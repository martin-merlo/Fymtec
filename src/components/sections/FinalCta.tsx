import { EmailCta } from "@/components/contact/EmailCta";
import { WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { brand } from "@/config/brand";
import { behindStudio } from "@/content/es/home";
import { finalCta } from "@/content/es/site";
import { FINAL_CTA_ATTR, marker } from "@/lib/dom-markers";

type FinalCtaProps = {
  /** h2 en la home; h1 cuando es el contenido principal (/contacto). */
  headingLevel?: "h1" | "h2";
};

/** Cierre de conversión: WhatsApp como principal, email como alternativa. */
export function FinalCta({ headingLevel: Heading = "h2" }: FinalCtaProps) {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      {...marker(FINAL_CTA_ATTR)}
      className="scroll-mt-20 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-8 rounded-3xl border bg-surface p-8 sm:p-12 md:p-16">
        <p className="text-sm font-medium tracking-widest text-highlight uppercase">
          {finalCta.eyebrow}
        </p>
        <Heading
          id="contacto-titulo"
          className="font-display text-h1 font-medium text-balance"
        >
          {finalCta.title}
        </Heading>
        <p className="max-w-2xl text-lead text-fg-muted">{finalCta.lead}</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <WhatsAppCta size="xl" />
          <EmailCta />
        </div>
        <p className="border-t pt-6 text-sm text-fg-muted">
          {behindStudio.text(brand.name)}
        </p>
      </div>
    </section>
  );
}
