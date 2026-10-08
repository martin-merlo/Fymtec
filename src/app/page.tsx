import { JsonLd } from "@/components/seo/JsonLd";
import { Clients } from "@/components/sections/Clients";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Methodology } from "@/components/sections/Methodology";
import { Services } from "@/components/sections/Services";
import { nav } from "@/content/es/site";
import { pageMetadata, studioJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/" });

/** Home: Inicio → Metodología → Clientes → Proyectos → Contacto. */
export default function Home() {
  return (
    <main id="contenido">
      <JsonLd data={studioJsonLd()} />
      <section
        id="inicio"
        aria-label={nav.items[0].label}
        className="scroll-mt-20"
      >
        <Hero />
        <Services />
      </section>
      <Methodology />
      <Clients />
      {/* Proyectos (#proyectos) llega con T13–T14. */}
      <FinalCta />
    </main>
  );
}
