import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { GitHubIcon } from "~/components/icons/github";
import { useLocale } from "~/hooks/use-locale";

export function UniversalFooter() {
  const { t } = useLocale();

  return (
    <footer className="mt-16 pb-10">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-hairline pt-6 text-sm text-graphite">
          <Link
            to="/privacy"
            className="font-medium transition-colors hover:text-ink"
          >
            {t.common.privacyPolicy}
          </Link>
          <span aria-hidden className="text-graphite/40">
            ·
          </span>
          <Link
            to="/license"
            className="font-medium transition-colors hover:text-ink"
          >
            {t.common.license}
          </Link>
          <span aria-hidden className="text-graphite/40">
            ·
          </span>
          <a
            href="https://github.com/jfranciscosousa/pdf-optimizer"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-medium transition-colors hover:text-ink"
          >
            <GitHubIcon className="size-4" />
            {t.common.github}
          </a>
          <span aria-hidden className="text-graphite/40">
            ·
          </span>
          <a
            href="mailto:francisco.sousa@hey.com"
            className="flex items-center gap-2 font-medium transition-colors hover:text-ink"
          >
            <Mail className="size-4" />
            {t.common.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
