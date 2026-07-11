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
    <nav className="mb-10 flex justify-center">
      <div className="inline-flex gap-1 rounded-full border border-hairline bg-paper/70 p-1 backdrop-blur-sm">
        {tools.map(({ to, icon: Icon, labelKey }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-graphite transition-colors hover:text-ink focus-visible:text-ink focus-visible:ring-2 focus-visible:ring-stamp focus-visible:outline-none"
            activeProps={{
              className: "bg-paper2 text-ink",
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
