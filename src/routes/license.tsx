import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "~/components/icons/github";
import { useLocale } from "~/hooks/use-locale";

export const Route = createFileRoute("/license")({
  head: () => ({
    meta: [
      {
        title: "License - PDF Optimizer",
      },
      {
        name: "description",
        content:
          "PDF Optimizer is open source, released under the MIT License.",
      },
    ],
  }),
  component: LicensePage,
});

function LicensePage() {
  const { t } = useLocale();

  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-3xl px-6 py-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-1.5 text-graphite transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
          <span className="font-mono text-xs tracking-wide">
            {t.license.backToHome}
          </span>
        </Link>

        <header className="mt-10 border-t border-hairline pt-8">
          <p className="font-mono text-[0.65rem] tracking-[0.22em] text-stamp uppercase">
            /license
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t.license.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-graphite">
            {t.license.subtitle}
          </p>
        </header>

        <section className="mt-12 border-y border-hairline py-6">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
            <div>
              <p className="font-mono text-[0.65rem] tracking-[0.22em] text-graphite uppercase">
                {t.license.spdxLabel}
              </p>
              <a
                href="https://spdx.org/licenses/MIT.html"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-1.5 inline-flex items-center gap-1.5 text-xl font-semibold text-ink"
              >
                MIT
                <ArrowUpRight className="size-4 text-stamp transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none" />
              </a>
            </div>
            <a
              href="https://github.com/jfranciscosousa/pdf-optimizer"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium text-graphite transition-colors hover:text-ink"
            >
              <GitHubIcon className="size-4" />
              <span className="font-mono text-xs tracking-wide">
                {t.license.viewSource}
              </span>
            </a>
          </div>
          <p className="mt-6 text-graphite">{t.license.copyright}</p>
        </section>

        <section className="divide-y divide-hairline">
          <article className="py-10 first:pt-10">
            <h2 className="flex items-baseline gap-3 text-lg font-semibold text-ink">
              <span className="font-mono text-graphite">§</span>
              {t.license.mitTitle}
            </h2>
            <p className="mt-4 text-justify leading-relaxed text-graphite">
              {t.license.permission}
            </p>
            <div className="mt-4 rounded-lg border border-l-2 border-hairline border-l-stamp bg-paper2 p-4">
              <p className="text-sm font-medium text-ink">
                {t.license.conditions}
              </p>
            </div>
          </article>

          <article className="py-10 last:pb-0">
            <h2 className="flex items-baseline gap-3 text-lg font-semibold text-ink">
              <span className="font-mono text-graphite">§</span>
              {t.license.noWarranty}
            </h2>
            <p className="mt-4 text-justify font-mono text-sm leading-relaxed text-graphite">
              {t.license.disclaimer}
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
