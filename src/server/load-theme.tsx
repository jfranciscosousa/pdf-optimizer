import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

export const THEME_COOKIE = "pdf-opt-theme";

export type Theme = "light" | "dark";

export function isTheme(value: string): value is Theme {
  return value === "light" || value === "dark";
}

const loadTheme = createServerFn({ method: "GET" }).handler(async () => {
  const cookieValue = getCookie(THEME_COOKIE);
  if (cookieValue && isTheme(cookieValue)) {
    return cookieValue;
  }
  return null;
});

export default loadTheme;
