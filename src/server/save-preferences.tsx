import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { LOCALE_COOKIE } from "~/server/load-language";
import { THEME_COOKIE, type Theme, isTheme } from "~/server/load-theme";
import { isLocale, type Locale } from "~/lib/locales";

const COOKIE_ATTRS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
  secure: true,
  httpOnly: true,
};

export const savePreferences = createServerFn({ method: "POST" })
  .validator((input: { locale?: Locale; theme?: Theme }) => input)
  .handler(async ({ data }) => {
    if (data.locale && isLocale(data.locale)) {
      setCookie(LOCALE_COOKIE, data.locale, COOKIE_ATTRS);
    }
    if (data.theme && isTheme(data.theme)) {
      setCookie(THEME_COOKIE, data.theme, COOKIE_ATTRS);
    }
    return { ok: true };
  });

export default savePreferences;
