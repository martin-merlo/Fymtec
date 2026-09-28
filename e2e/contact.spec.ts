import { expect, test, type Page } from "@playwright/test";

const WA = /^https:\/\/wa\.me\/5492614160956\?text=/;
const floating = (page: Page) => page.locator("a[data-visible]");

/** Simula las secciones que habrá entre el hero y el CTA final. */
async function addContentAfterHero(page: Page) {
  // Insertar nodos antes de la hidratación hace que React los descarte.
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => {
    const spacer = document.createElement("div");
    spacer.style.height = "2000px";
    document.querySelector("[data-hero]")?.after(spacer);
  });
}

test.describe("botón flotante de WhatsApp", () => {
  test("en la home no aparece sobre el hero y sí al pasarlo", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "En desktop también aparece por tiempo");
    await page.goto("/");
    await addContentAfterHero(page);
    await expect(floating(page)).toHaveAttribute("data-visible", "false");

    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.1));
    await expect(floating(page)).toHaveAttribute("data-visible", "true");
    await expect(floating(page)).toHaveAttribute("href", WA);
  });

  test("se oculta mientras el CTA final está en pantalla", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.1));
    await page.locator("#contacto").scrollIntoViewIfNeeded();
    await expect(floating(page)).toHaveAttribute("data-visible", "false");
  });

  test("oculto no se puede enfocar", async ({ page }) => {
    await page.goto("/");
    await expect(floating(page)).toHaveAttribute("inert", "");
  });

  test("en móvil deja libre el borde inferior y tiene área táctil ≥ 44px", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Solo móvil");
    await page.goto("/");
    await addContentAfterHero(page);
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.1));
    await expect(floating(page)).toHaveAttribute("data-visible", "true");
    await expect(floating(page)).toHaveCSS("opacity", "1");
    await expect(floating(page)).toHaveCSS("translate", "none");
    const box = await floating(page).boundingBox();
    expect(box).not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.y + box!.height).toBeLessThanOrEqual(812 - 16);
  });
});

test.describe("contacto en 1 clic", () => {
  for (const path of ["/", "/contacto", "/ruta-que-no-existe"]) {
    test(`desde ${path} hay un link directo a WhatsApp visible`, async ({
      page,
    }) => {
      await page.goto(path);
      // Header (desktop), CTA final o botón flotante: al menos uno visible y apuntando a wa.me.
      const visibleLinks = page.locator(`a[href^="https://wa.me/"]:visible`);
      await expect(visibleLinks.first()).toBeVisible();
      await expect(visibleLinks.first()).toHaveAttribute("href", WA);
    });
  }

  test("/contacto tiene h1, WhatsApp y email", async ({ page }) => {
    await page.goto("/contacto");
    await expect(page.locator("h1")).toHaveText("¿Tenés un proyecto en mente?");
    await expect(
      page.getByRole("link", { name: "Contame tu idea" }),
    ).toHaveAttribute("href", WA);
    await expect(
      page.getByRole("link", { name: "Escribir un email" }),
    ).toHaveAttribute("href", /^mailto:/);
  });

  test("el footer muestra la ubicación", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toContainText(
      "Mendoza, Argentina · Trabajo remoto",
    );
  });
});
