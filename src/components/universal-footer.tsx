import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { GitHubIcon } from "~/components/icons/github";
import { useLocale } from "~/hooks/use-locale";

export function UniversalFooter() {
  const { t } = useLocale();

  return (
    <footer className="mt-16 pb-8">
      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
            <Link
              to="/privacy"
              className="font-medium transition-colors hover:text-blue-600"
            >
              {t.home.privacyPolicy}
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/license"
              className="font-medium transition-colors hover:text-blue-600"
            >
              {t.home.license}
            </Link>
            <span className="text-gray-400">•</span>
            <a
              href="https://github.com/jfranciscosousa/pdf-optimizer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              <GitHubIcon className="size-4" />
              {t.home.github}
            </a>
            <span className="text-gray-400">•</span>
            <a
              href="mailto:francisco.sousa@hey.com"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600"
            >
              <Mail className="size-4" />
              {t.home.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
