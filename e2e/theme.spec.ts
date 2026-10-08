import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const html = (page: import("@playwright/test").Page) => page.locator("html");

test.describe("selector de tema", () => {
  test("arranca en oscuro, cambia a claro y lo recuerda al recargar", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(html(page)).toHaveAttribute("data-theme", "dark");

    await page.getByRole("button", { name: "Cambiar a modo claro" }).click();
    await expect(html(page)).toHaveAttribute("data-theme", "light");
    await expect(
      page.getByRole("button", { name: "Cambiar a modo oscuro" }),
    ).toBeVisible();

    await page.reload();
    await expect(html(page)).toHaveAttribute("data-theme", "light");
    await expect(
      page.getByRole("button", { name: "Cambiar a modo oscuro" }),
    ).toBeVisible();
  });

  test("sin parpadeo: el tema guardado ya está aplicado antes de pintar", async ({
    page,
  }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    // Registra el tema y el fondo en el primer cuadro que el navegador pinta.
    await page.addInitScript(() => {
      requestAnimationFrame(() => {
        (window as unknown as { firstPaint: string[] }).firstPaint = [
          document.documentElement.getAttribute("data-theme") ?? "",
          document.body ? getComputedStyle(document.body).backgroundColor : "",
        ];
      });
    });
    await page.goto("/");
    const firstPaint = await page.evaluate(
      () => (window as unknown as { firstPaint: string[] }).firstPaint,
    );
    expect(firstPaint[0]).toBe("light");
    expect(firstPaint[1]).toBe("rgb(246, 248, 250)");
  });

  test("no genera errores de hidratación con el tema claro guardado", async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on(
      "console",
      (msg) => msg.type() === "error" && errors.push(msg.text()),
    );
    page.on("pageerror", (err) => errors.push(err.message));
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });

  test("se opera con teclado", async ({ page, isMobile }) => {
    test.skip(isMobile, "Teclado en desktop");
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Cambiar a modo claro" });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(html(page)).toHaveAttribute("data-theme", "light");
  });

  test("sin violaciones de accesibilidad serias en el tema claro", async ({
    page,
  }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForTimeout(500);
    const { violations } = await new AxeBuilder({ page }).analyze();
    const serious = violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
});
