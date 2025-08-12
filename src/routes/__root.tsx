/// <reference types="vite/client" />
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { AnimatedBackground } from "~/components/animated-background";
import { ErrorComponent } from "~/components/error-component";
import { NotFoundComponent } from "~/components/not-found-component";
import { UniversalFooter } from "~/components/universal-footer";
import loadLanguage from "~/server/load-language";
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
        title: "PDF Optimizer - Reduce PDF file sizes instantly",
      },
      {
        name: "description",
        content:
          "Reduce PDF file sizes instantly with our advanced compression technology. Upload your PDF and choose your optimization level for the perfect balance of quality and file size.",
      },
      {
        name: "generator",
        content: "TanStack Start",
      },
      {
        name: "theme-color",
        content: "#2563eb",
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
  loader: async () => ({ language: await loadLanguage() }),
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <AnimatedBackground />
        {children}
        <UniversalFooter />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
