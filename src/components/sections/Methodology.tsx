import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { methodology } from "@/content/es/home";

/**
 * Metodología: 4 pasos unidos por un sendero (como el del isotipo) que se
 * dibuja con el scroll. Sin soporte de scroll-driven animations, el sendero
 * se ve completo.
 */
export function Methodology() {
  return (
    <section
      id="metodologia"
      aria-labelledby="metodologia-titulo"
      className="scroll-mt-20 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading
          id="metodologia-titulo"
          eyebrow={methodology.eyebrow}
          title={methodology.title}
          lead={methodology.lead}
          className="lg:sticky lg:top-28 lg:self-start"
        />
        <ol className="methodology-path relative flex flex-col gap-10 pl-12">
          {methodology.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              index={i}
              className="relative flex flex-col gap-2"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 -left-12 grid size-8 place-items-center rounded-full border border-border-strong bg-surface font-display text-sm text-highlight"
                style={{ "--i": i } as CSSProperties}
              >
                {i + 1}
              </span>
              <h3 className="font-display text-h3 font-medium">{step.title}</h3>
              <p className="max-w-md text-fg-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
