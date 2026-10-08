import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { services } from "@/content/es/home";

/** Bloque de servicios dentro de Inicio: problema → solución → ejemplo real. */
export function Services() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        id="servicios-titulo"
        eyebrow={services.eyebrow}
        title={services.title}
      />
      <ul
        aria-labelledby="servicios-titulo"
        className="mt-12 grid gap-4 sm:grid-cols-2"
      >
        {services.items.map((item, i) => (
          <Reveal
            as="li"
            key={item.id}
            index={i}
            className="group flex flex-col gap-4 rounded-2xl border bg-surface p-6 transition-colors duration-300 hover:border-border-strong hover:bg-surface-raised sm:p-8"
          >
            <h3 className="font-display text-h3 font-medium">{item.title}</h3>
            <p className="text-fg-muted italic">{item.problem}</p>
            <p>{item.solution}</p>
            {item.example && (
              <p className="mt-auto pt-2 text-sm text-fg-muted">
                {services.exampleLabel}{" "}
                <span className="text-highlight">{item.example}</span>
              </p>
            )}
          </Reveal>
        ))}
      </ul>
      <Reveal as="p" className="mt-8 text-fg-muted">
        {services.alsoNote}
      </Reveal>
    </div>
  );
}
