import { locales } from "~/lib/locales";
import { Route } from "~/routes/__root";

export function useLocale() {
  const language = Route.useLoaderData()?.language;
  const t = locales[language as keyof typeof locales] || locales.en;

  return {
    t,
  };
}
