import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { clients } from "@/content/es/home";

/** Prueba social breve: quién confió, de qué rubro y qué se hizo. Sin logos. */
export function Clients() {
  return (
    <section
      id="clientes"
      aria-labelledby="clientes-titulo"
      className="scroll-mt-20 border-y bg-surface px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id="clientes-titulo"
          eyebrow={clients.eyebrow}
          title={clients.title}
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.items.map((client, i) => (
            <Reveal
              as="li"
              key={client.name}
              index={i}
              className="flex flex-col gap-2 rounded-2xl border bg-bg p-6 transition-colors duration-300 hover:border-border-strong sm:p-8"
            >
              <p className="font-display text-xl font-medium">{client.name}</p>
              {client.industry && (
                <p className="text-sm text-highlight">{client.industry}</p>
              )}
              <p className="text-fg-muted">{client.work}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
