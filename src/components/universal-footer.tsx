import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { GitHubIcon } from "~/components/icons/github";
import { useLocale } from "~/hooks/use-locale";

export function UniversalFooter() {
  const { t } = useLocale();

  return (
    <footer className="mt-16 pb-8">
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 flex-wrap">
            <Link
              to="/privacy"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              {t.home.privacyPolicy}
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              to="/license"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              {t.home.license}
            </Link>
            <span className="text-gray-400">•</span>
            <a
              href="https://github.com/jfranciscosousa/pdf-optimizer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              <GitHubIcon className="h-4 w-4" />
              {t.home.github}
            </a>
            <span className="text-gray-400">•</span>
            <a
              href="mailto:francisco.sousa@hey.com"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              <Mail className="h-4 w-4" />
              {t.home.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
