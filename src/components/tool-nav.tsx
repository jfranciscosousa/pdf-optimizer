import { Link } from "@tanstack/react-router";
import { Zap, Layers, Scissors } from "lucide-react";
import { useLocale } from "~/hooks/use-locale";

const tools = [
  { to: "/optimize" as const, icon: Zap, labelKey: "optimize" as const },
  { to: "/merge" as const, icon: Layers, labelKey: "merge" as const },
  { to: "/split" as const, icon: Scissors, labelKey: "split" as const },
];

export function ToolNav() {
  const { t } = useLocale();

  return (
    <nav className="mb-8 flex justify-center">
      <div className="inline-flex gap-1 rounded-full border border-gray-200 bg-white/80 p-1 shadow-sm backdrop-blur-sm">
        {tools.map(({ to, icon: Icon, labelKey }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:text-blue-600"
            activeProps={{
              className:
                "!text-white bg-linear-to-r from-blue-600 to-purple-600 shadow",
            }}
          >
            <Icon className="size-4" />
            {t.nav[labelKey]}
          </Link>
        ))}
      </div>
    </nav>
  );
}
