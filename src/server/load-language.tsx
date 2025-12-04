import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import acceptLanguage from "accept-language";

acceptLanguage.languages(["en", "pt"]);

const loadLanguage = createServerFn({ method: "GET" }).handler(async () => {
  const acceptLanguageVal =
    getRequestHeaders().get("Accept-Language") ||
    getRequestHeaders().get("accept-language");
  const language = acceptLanguage.get(acceptLanguageVal) || "en";

  return language;
});

export default loadLanguage;
