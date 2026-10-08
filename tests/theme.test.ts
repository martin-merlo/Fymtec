import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { isTheme, THEME_STORAGE_KEY, themeScript } from "@/lib/theme";

const runScript = () => new Function(themeScript)();
const root = () => document.documentElement;

describe("themeScript (se ejecuta en el <head> antes de pintar)", () => {
  beforeEach(() => {
    localStorage.clear();
    root().setAttribute("data-theme", "dark");
  });
  afterEach(() => vi.restoreAllMocks());

  it("aplica el tema guardado", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    runScript();
    expect(root().getAttribute("data-theme")).toBe("light");
  });

  it("sin elección guardada deja el tema por defecto", () => {
    runScript();
    expect(root().getAttribute("data-theme")).toBe("dark");
  });

  it("ignora valores inválidos o manipulados", () => {
    localStorage.setItem(THEME_STORAGE_KEY, '"><script>alert(1)</script>');
    runScript();
    expect(root().getAttribute("data-theme")).toBe("dark");
  });

  it("no rompe la página si localStorage está bloqueado", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("SecurityError");
    });
    expect(runScript).not.toThrow();
    expect(root().getAttribute("data-theme")).toBe("dark");
  });
});

describe("isTheme", () => {
  it("acepta solo dark y light", () => {
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("light")).toBe(true);
    expect(isTheme("sepia")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });
});
