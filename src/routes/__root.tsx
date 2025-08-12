/// <reference types="vite/client" />
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import * as React from "react";
import { AnimatedBackground } from "~/components/animated-background";
import { ErrorComponent } from "~/components/error-component";
import { NotFoundComponent } from "~/components/not-found-component";
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
    ],
    links: [{ rel: "stylesheet", href: appCss }],
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
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
