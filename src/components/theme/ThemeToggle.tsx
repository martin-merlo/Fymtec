"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { buttonVariants } from "@/components/ui/button";
import { common } from "@/content/es/common";
import {
  DEFAULT_THEME,
  isTheme,
  THEME_STORAGE_KEY,
  THEME_SWITCHING_CLASS,
  type Theme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

const SWITCH_MS = 350;

/** El tema "real" es el atributo de <html>: lo fija el script del <head>. */
function readTheme(): Theme {
  const value = document.documentElement.getAttribute("data-theme");
  return isTheme(value) ? value : DEFAULT_THEME;
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  // Sincroniza pestañas: si se cambia el tema en otra, se aplica acá.
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY && isTheme(event.newValue)) {
      document.documentElement.setAttribute("data-theme", event.newValue);
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add(THEME_SWITCHING_CLASS);
  root.setAttribute("data-theme", theme);
  window.setTimeout(
    () => root.classList.remove(THEME_SWITCHING_CLASS),
    SWITCH_MS,
  );
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Sin localStorage (modo privado estricto): el cambio vale para esta visita.
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DEFAULT_THEME);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = next === "light" ? common.themeToLight : common.themeToDark;

  return (
    <button
      type="button"
      onClick={() => applyTheme(next)}
      aria-label={label}
      title={label}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-lg" }),
        className,
      )}
    >
      {theme === "dark" ? (
        <Sun aria-hidden="true" />
      ) : (
        <Moon aria-hidden="true" />
      )}
    </button>
  );
}
