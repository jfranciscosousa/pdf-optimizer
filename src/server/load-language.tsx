import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import acceptLanguage from "accept-language";
import type { Locale } from "~/lib/locales";
import { defaultLocale, isLocale } from "~/lib/locales";

acceptLanguage.languages(["en", "pt"]);

export const LOCALE_COOKIE = "pdf-opt-locale";

const loadLanguage = createServerFn({ method: "GET" }).handler(async () => {
  const cookieValue = getCookie(LOCALE_COOKIE);
  if (cookieValue && isLocale(cookieValue)) {
    return cookieValue as Locale;
  }

  const acceptLanguageVal =
    getRequestHeader("Accept-Language") ||
    getRequestHeader("accept-language") ||
    "";
  const language = acceptLanguage.get(acceptLanguageVal) || defaultLocale;

  return language as Locale;
});

export default loadLanguage;
