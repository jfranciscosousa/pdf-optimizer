import { getHeaders } from "@tanstack/react-start/server";
import acceptLanguage from "accept-language";
import { createServerFn } from "@tanstack/react-start";

const loadLanguage = createServerFn({ method: "GET" }).handler(async () => {
  const acceptLanguageVal = getHeaders()["Accept-Language"];
  const language = acceptLanguage.get(acceptLanguageVal)?.[0] || "en-US";

  return language.split("-")[0];
});

export default loadLanguage;
