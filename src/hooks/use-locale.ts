import { locales, type Locale } from "~/lib/locales";
import { Route } from "~/routes/__root";

export function useLocale() {
  const language = (Route.useLoaderData()?.language ?? "en") as Locale;
  const t = locales[language] || locales.en;

  return {
    language,
    t,
  };
}
