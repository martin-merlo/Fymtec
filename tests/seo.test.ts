import { describe, expect, it } from "vitest";
import { brand } from "@/config/brand";
import { pageMetadata, serializeJsonLd, studioJsonLd } from "@/lib/seo";

describe("pageMetadata", () => {
  it("usa el nombre de la marca como título absoluto en la home", () => {
    const meta = pageMetadata({ path: "/" });
    expect(meta.title).toEqual({ absolute: brand.name });
    expect(meta.alternates?.canonical).toBe("/");
  });

  it("arma título, canonical y Open Graph de una página interna", () => {
    const meta = pageMetadata({
      title: "Trabajos",
      description: "Casos reales",
      path: "/trabajos",
    });
    expect(meta.title).toBe("Trabajos");
    expect(meta.alternates?.canonical).toBe("/trabajos");
    expect(meta.openGraph).toMatchObject({
      title: `Trabajos · ${brand.name}`,
      description: "Casos reales",
      url: "/trabajos",
      locale: "es_AR",
    });
  });
});

describe("serializeJsonLd", () => {
  it("escapa '<' para que no se pueda cerrar el <script>", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
  });
});

describe("studioJsonLd", () => {
  it("describe el estudio con datos de brand.ts", () => {
    const data = studioJsonLd();
    expect(data["@type"]).toBe("ProfessionalService");
    expect(data.name).toBe(brand.name);
    expect(data.address.addressCountry).toBe("AR");
  });
});
