import { expect, test } from "@playwright/test";

test.describe("header", () => {
  test("desktop: navegación y CTA de WhatsApp visibles", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Solo desktop");
    await page.goto("/");
    const header = page.locator("header");
    await expect(
      header.getByRole("navigation", { name: "Principal" }),
    ).toBeVisible();
    await expect(
      header.getByRole("link", { name: "Hablemos" }),
    ).toHaveAttribute("href", /^https:\/\/wa\.me\//);
    await expect(
      header.getByRole("button", { name: "Abrir menú" }),
    ).toBeHidden();
  });

  test("móvil: el menú atrapa el foco, cierra con Esc y devuelve el foco", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Solo móvil");
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Abrir menú" });
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Principal" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("link", { name: "Servicios" })).toBeVisible();

    // El foco no puede escapar al contenido de la página mientras el diálogo está abierto.
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(
        () =>
          document.activeElement?.closest("dialog") !== null ||
          document.activeElement === document.body,
      );
      expect(inside).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("móvil: se oculta al bajar y reaparece al subir", async ({
    page,
    isMobile,
  }) => {
    test.skip(!isMobile, "Solo móvil");
    await page.goto("/");
    await page.evaluate(() => {
      document.body.style.minHeight = "4000px";
    });
    const header = page.locator("header");

    await page.mouse.wheel(0, 800);
    await expect(header).toHaveAttribute("data-hidden", "true");

    await page.mouse.wheel(0, -300);
    await expect(header).toHaveAttribute("data-hidden", "false");
  });
});
