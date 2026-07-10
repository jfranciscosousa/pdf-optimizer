import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { FileText, Sparkles, Zap, Layers, Scissors } from "lucide-react";
import { useLocale } from "~/hooks/use-locale";

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
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="relative">
              <FileText className="size-12 text-blue-600" />
              <Sparkles className="absolute -top-2 -right-2 size-6 animate-pulse text-yellow-500" />
            </div>
            <h1 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl leading-tight font-bold text-transparent">
              {t.landing.title}
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            {t.landing.subtitle}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tools.map(({ to, icon: Icon, titleKey, descriptionKey }) => (
            <Card
              key={to}
              className="flex flex-col border-0 bg-white/80 pt-0 shadow-2xl backdrop-blur-sm"
            >
              <CardHeader className="rounded-t-lg bg-linear-to-r from-blue-500 to-purple-600 py-6 text-white">
                <div className="flex justify-center">
                  <Icon className="size-10" />
                </div>
                <CardTitle className="text-center text-2xl">
                  {t.landing[titleKey]}
                </CardTitle>
                <CardDescription className="text-center text-blue-100">
                  {t.landing[descriptionKey]}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-end p-8 pt-0">
                <Link to={to}>
                  <Button className="h-12 w-full bg-linear-to-r from-blue-600 to-purple-600 text-lg shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
                    {t.landing.openTool}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
