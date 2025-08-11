import { getHeaders } from "@tanstack/react-start/server";
import acceptLanguage from "accept-language";
import { createServerFn } from "@tanstack/react-start";

acceptLanguage.languages(['en', 'pt']);

const loadLanguage = createServerFn({ method: "GET" }).handler(async () => {
  const acceptLanguageVal = getHeaders()["Accept-Language"] || getHeaders()["accept-language"];
  const language = acceptLanguage.get(acceptLanguageVal) || "en";

  return language;
});

export default loadLanguage;
