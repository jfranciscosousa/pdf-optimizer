import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Scale, ArrowLeft, FileText } from "lucide-react";
import { useLocale } from "~/hooks/use-locale";

export const Route = createFileRoute("/license")({
  component: LicensePage,
});

function LicensePage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 size-4" />
              {t.license.backToHome}
            </Button>
          </Link>

          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Scale className="size-10 text-blue-600" />
              <h1 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
                {t.license.title}
              </h1>
            </div>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {t.license.subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center">
                <FileText className="mx-auto mb-4 size-12 text-gray-600" />
                <p className="text-lg font-medium text-gray-800">
                  {t.license.copyright}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 pt-0 shadow-lg backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-linear-to-r from-green-500 to-blue-600 py-6 text-white">
              <CardTitle className="text-center text-2xl">
                {t.license.mitTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="space-y-4">
                <div>
                  <p className="text-justify leading-relaxed text-gray-700">
                    {t.license.permission}
                  </p>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm font-medium text-blue-800">
                    {t.license.conditions}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 shadow-lg backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                <p className="text-justify font-mono text-sm leading-relaxed text-gray-700">
                  {t.license.disclaimer}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
