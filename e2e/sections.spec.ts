import { expect, test } from "@playwright/test";

test.describe("home: secciones", () => {
  test("están en el orden Inicio → Metodología → Clientes → Contacto", async ({
    page,
  }) => {
    await page.goto("/");
    const ids = await page
      .locator("main > section[id]")
      .evaluateAll((els) => els.map((el) => el.id));
    expect(ids).toEqual(["inicio", "metodologia", "clientes", "contacto"]);
  });

  test("la persona detrás solo aparece en Contacto", async ({ page }) => {
    await page.goto("/");
    for (const id of ["inicio", "metodologia", "clientes"]) {
      await expect(page.locator(`#${id}`)).not.toContainText("Martín");
    }
    await expect(page.locator("#contacto")).toContainText("Martín");
  });

  test("el titular del hero es el único h1 y se lee como una frase", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
      "Software que resuelve.",
    );
  });

  test("los links de navegación llevan a secciones existentes", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Navegación de desktop");
    await page.goto("/");
    await page
      .locator("header nav")
      .getByRole("link", { name: "Metodología" })
      .click();
    await expect(page).toHaveURL(/#metodologia$/);
    await expect(page.locator("#metodologia")).toBeInViewport();
  });
});

test.describe("home sin JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("todo el contenido es visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    for (const text of [
      "¿Qué necesita tu negocio?",
      "Cómo es trabajar juntos",
      "Negocios que ya confiaron",
    ]) {
      const heading = page.getByRole("heading", { name: text });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
      await expect(heading).toHaveCSS("opacity", "1");
    }
  });
});

test.describe("home con reduced-motion", () => {
  test("el contenido fuera de pantalla ya es opaco, sin depender del scroll", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const opacities = await page
      .locator(".reveal")
      .evaluateAll((els) => els.map((el) => getComputedStyle(el).opacity));
    expect(opacities.length).toBeGreaterThan(0);
    expect(new Set(opacities)).toEqual(new Set(["1"]));
  });
});
