import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Layers, Scissors, Zap } from "lucide-react";
import { useLocale } from "~/hooks/use-locale";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/")({
  component: Home,
});

const tools = [
  {
    to: "/optimize" as const,
    icon: Zap,
    titleKey: "optimizeTitle" as const,
    descriptionKey: "optimizeDescription" as const,
  },
  {
    to: "/merge" as const,
    icon: Layers,
    titleKey: "mergeTitle" as const,
    descriptionKey: "mergeDescription" as const,
  },
  {
    to: "/split" as const,
    icon: Scissors,
    titleKey: "splitTitle" as const,
    descriptionKey: "splitDescription" as const,
  },
];

function Home() {
  const { t } = useLocale();

  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-5xl px-6">
        <header className="flex items-center justify-between py-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block size-2 rotate-45 bg-stamp"
            />
            <span className="text-base font-semibold tracking-tight text-ink">
              {t.landing.title}
            </span>
          </Link>
          <span className="font-mono text-[0.65rem] tracking-[0.22em] text-graphite uppercase">
            {t.landing.eyebrow}
          </span>
        </header>

        <section className="max-w-3xl py-16 sm:py-24">
          <p className="font-mono text-[0.65rem] tracking-[0.22em] text-stamp uppercase">
            {t.landing.eyebrow}
          </p>
          <h1 className="mt-7 text-4xl leading-[1.06] font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
            {t.landing.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-graphite">
            {t.landing.lede}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link to="/optimize">
              <Button
                size="lg"
                className="h-12 gap-2 px-6 text-base font-medium"
              >
                {t.nav.optimize}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <p className="font-mono text-xs tracking-wide text-graphite">
              {t.landing.trustLine}
            </p>
          </div>
        </section>

        <section className="border-t border-hairline">
          <div className="grid divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {tools.map(({ to, icon: Icon, titleKey, descriptionKey }) => (
              <Link
                key={to}
                to={to}
                className="group relative flex flex-col gap-5 p-8 transition-colors hover:bg-paper2 focus-visible:bg-paper2 focus-visible:ring-2 focus-visible:ring-stamp focus-visible:outline-none focus-visible:ring-inset"
              >
                <span className="font-mono text-xs tracking-wide text-graphite">
                  {to}
                </span>
                <div className="flex items-center gap-2.5">
                  <Icon className="size-5 text-ink" />
                  <span className="text-lg font-medium text-ink">
                    {t.landing[titleKey]}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-graphite">
                  {t.landing[descriptionKey]}
                </p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 font-mono text-xs tracking-wide text-stamp">
                  {t.landing.openTool}
                  <span className="transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none">
                    <ArrowRight className="size-3.5" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-y border-hairline">
          <div className="grid divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {t.landing.principles.map((p) => (
              <div key={p.label} className="p-8">
                <p className="font-mono text-[0.65rem] tracking-[0.22em] text-stamp uppercase">
                  {p.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-graphite">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
