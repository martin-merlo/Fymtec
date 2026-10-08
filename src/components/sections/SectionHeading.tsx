import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  className?: string;
};

/** Encabezado común de sección: eyebrow + h2 (+ bajada). */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex max-w-2xl flex-col gap-4", className)}>
      <Reveal
        as="p"
        className="text-sm font-medium tracking-widest text-highlight uppercase"
      >
        {eyebrow}
      </Reveal>
      <Reveal
        as="h2"
        id={id}
        index={1}
        className="font-display text-h1 font-medium text-balance"
      >
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" index={2} className="text-lead text-fg-muted">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
