/// <reference types="vite/client" />
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { AnimatedBackground } from "~/components/animated-background";
import { ErrorComponent } from "~/components/error-component";
import { NotFoundComponent } from "~/components/not-found-component";
import { PreferencesControl } from "~/components/preferences-control";
import { UniversalFooter } from "~/components/universal-footer";
import loadLanguage from "~/server/load-language";
import loadTheme from "~/server/load-theme";
import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "PDF Optimizer - Optimize, merge & split PDFs instantly",
      },
      {
        name: "description",
        content:
          "Optimize, merge and split PDFs instantly, entirely in your browser. No uploads, no waiting, no limits.",
      },
      {
        name: "generator",
        content: "TanStack Start",
      },
      {
        name: "theme-color",
        content: "#fbfbf9",
      },
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "default",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/icon-192.svg" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootDocument,
  loader: async () => ({
    language: await loadLanguage(),
    theme: await loadTheme(),
  }),
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { language, theme } = Route.useLoaderData();
  const themeClass =
    theme === "dark" ? "dark" : theme === "light" ? "light" : undefined;

  return (
    <html lang={language} className={themeClass}>
      <head>
        <HeadContent />
      </head>
      <body>
        <AnimatedBackground />
        <PreferencesControl />
        {children}
        <UniversalFooter />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
