import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { placeholder } from "@/content/es/placeholder";
import { pageMetadata, studioJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/" });

export default function Home() {
  return (
    <main
      id="contenido"
      className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-8 px-6"
    >
      <JsonLd data={studioJsonLd()} />
      <p className="text-sm tracking-widest text-fg-muted uppercase">
        {placeholder.eyebrow}
      </p>
      <h1 className="font-display text-display font-medium text-balance">
        {placeholder.title}
      </h1>
      <p className="max-w-2xl text-lead text-fg-muted">{placeholder.lead}</p>
      <div className="flex flex-wrap gap-3">
        <Button size="lg">{placeholder.primary}</Button>
        <Button size="lg" variant="outline">
          {placeholder.secondary}
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-xl border bg-surface p-4">surface</div>
        <div className="rounded-xl border bg-surface-raised p-4">
          surface-raised
        </div>
        <div className="rounded-xl bg-highlight p-4 text-highlight-fg">
          highlight
        </div>
      </div>
    </main>
  );
}
