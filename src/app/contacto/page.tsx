import { FinalCta } from "@/components/sections/FinalCta";
import { contactPage } from "@/content/es/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: contactPage.title,
  description: contactPage.description,
  path: "/contacto",
});

export default function ContactPage() {
  return (
    <main
      id="contenido"
      className="flex min-h-dvh flex-col justify-center pt-18"
    >
      <FinalCta headingLevel="h1" />
    </main>
  );
}
