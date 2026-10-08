import type { CSSProperties } from "react";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { TextReveal } from "@/components/motion/TextReveal";
import { buttonVariants } from "@/components/ui/button";
import { brand } from "@/config/brand";
import { hero } from "@/content/es/home";
import { HERO_ATTR, marker } from "@/lib/dom-markers";
import { cn } from "@/lib/utils";

/** Hero de Inicio. Fondo provisorio estático; la pieza firma llega en la fase 6. */
export function Hero() {
  return (
    <div
      {...marker(HERO_ATTR)}
      className="relative isolate flex min-h-dvh items-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 lg:px-8"
    >
      {/* Luz y montañas de fondo: decorativas y estáticas. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_55%_at_75%_35%,color-mix(in_oklab,var(--cta)_22%,transparent),transparent_70%)]"
      />
      <Logo
        variant="isotype"
        decorative
        className="absolute -right-24 bottom-0 -z-10 h-auto w-[min(110vw,58rem)] opacity-[0.07] sm:-right-16"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-8">
        <p className="enter text-sm font-medium tracking-widest text-highlight uppercase">
          {brand.tagline}
        </p>
        <TextReveal
          lines={hero.titleLines}
          className="font-display text-display font-medium text-balance"
        />
        <p
          className="enter max-w-2xl text-lead text-fg-muted"
          style={{ "--i": 1 } as CSSProperties}
        >
          {hero.lead}
        </p>
        <div
          className="enter flex flex-wrap items-center gap-3"
          style={{ "--i": 2 } as CSSProperties}
        >
          <WhatsAppCta size="xl" />
          <a
            href={hero.secondaryHref}
            className={cn(buttonVariants({ variant: "outline", size: "xl" }))}
          >
            {hero.secondaryCta}
          </a>
        </div>
      </div>
    </div>
  );
}
