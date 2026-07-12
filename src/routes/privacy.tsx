import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle,
  Server,
  Eye,
  Lock,
  Hammer,
  Mail,
  Code2,
  Settings,
} from "lucide-react";
import { GitHubIcon } from "~/components/icons/github";
import { useLocale } from "~/hooks/use-locale";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      {
        title: "Privacy policy - PDF Optimizer",
      },
      {
        name: "description",
        content:
          "PDF Optimizer processes everything locally in your browser. No uploads, no tracking, no data storage.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useLocale();

  const sections = [
    {
      icon: Lock,
      title: t.privacy.localProcessingTitle,
      content: t.privacy.localProcessingContent,
    },
    {
      icon: Eye,
      title: t.privacy.noTrackingTitle,
      content: t.privacy.noTrackingContent,
    },
    {
      icon: Settings,
      title: t.privacy.preferencesTitle,
      content: t.privacy.preferencesContent,
    },
    {
      icon: CheckCircle,
      title: t.privacy.noDataStorageTitle,
      content: t.privacy.noDataStorageContent,
    },
    {
      icon: Code2,
      title: t.privacy.openSourceTitle,
      content: t.privacy.openSourceContent,
    },
    {
      icon: Server,
      title: t.privacy.hostingTitle,
      content: t.privacy.hostingContent,
      list: t.privacy.hostingList,
      note: t.privacy.hostingNote,
      accent: true,
    },
    {
      icon: Hammer,
      title: t.privacy.technicalTitle,
      content: t.privacy.technicalContent,
      list: t.privacy.technicalList,
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-3xl px-6 py-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-1.5 text-graphite transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
          <span className="font-mono text-xs tracking-wide">
            {t.privacy.backToHome}
          </span>
        </Link>

        <header className="mt-10 border-t border-hairline pt-8">
          <p className="font-mono text-[0.65rem] tracking-[0.22em] text-stamp uppercase">
            /privacy
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {t.privacy.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-graphite">
            {t.privacy.subtitle}
          </p>
          <p className="mt-3 font-mono text-xs tracking-wide text-graphite/70">
            {t.privacy.lastUpdated}: {t.privacy.lastUpdatedDate}
          </p>
        </header>

        <section className="mt-12 border-y border-hairline">
          <div className="grid divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {t.privacy.summary.map((s) => (
              <div key={s.label} className="p-6">
                <p className="font-mono text-[0.65rem] tracking-[0.22em] text-stamp uppercase">
                  {s.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-graphite">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="divide-y divide-hairline">
          {sections.map(
            ({ icon: Icon, title, content, list, note, accent }) => (
              <div key={title} className="py-10 first:pt-10 last:pb-0">
                <div className="flex items-center gap-2.5">
                  <Icon className="size-4 text-graphite" />
                  <h2 className="text-lg font-semibold text-ink">{title}</h2>
                </div>
                <div className="mt-4 space-y-4">
                  <p className="leading-relaxed text-graphite">{content}</p>
                  {list && (
                    <ul className="ml-4 list-inside list-disc space-y-2 text-graphite">
                      {list.map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {note && (
                    <div
                      className={`rounded-lg border p-4 ${
                        accent
                          ? "border-l-2 border-hairline border-l-stamp bg-paper2"
                          : "border-hairline bg-paper2"
                      }`}
                    >
                      <p className="font-medium text-ink">{note}</p>
                    </div>
                  )}
                </div>
              </div>
            ),
          )}

          <div className="py-10 last:pb-0">
            <div className="flex items-center gap-2.5">
              <Mail className="size-4 text-graphite" />
              <h2 className="text-lg font-semibold text-ink">
                {t.privacy.contactTitle}
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-graphite">
              {t.privacy.contactContent}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href="mailto:francisco.sousa@hey.com"
                className="group flex items-start gap-3 rounded-lg border border-hairline bg-card p-4 transition-colors hover:border-ink/30"
              >
                <Mail className="mt-0.5 size-5 text-graphite" />
                <div>
                  <p className="text-sm text-graphite">
                    {t.privacy.contactEmail}
                  </p>
                  <p className="text-sm font-medium text-ink transition-colors group-hover:text-stamp">
                    francisco.sousa@hey.com
                  </p>
                </div>
              </a>
              <a
                href="https://github.com/jfranciscosousa/pdf-optimizer"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg border border-hairline bg-card p-4 transition-colors hover:border-ink/30"
              >
                <GitHubIcon className="mt-0.5 size-5 text-graphite" />
                <div>
                  <p className="text-sm text-graphite">
                    {t.privacy.contactGitHub}
                  </p>
                  <p className="text-sm font-medium text-ink transition-colors group-hover:text-stamp">
                    github.com/jfranciscosousa/pdf-optimizer
                  </p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
