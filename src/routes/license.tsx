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
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.license.backToHome}
            </Button>
          </Link>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Scale className="h-10 w-10 text-blue-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.license.title}
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t.license.subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-800 font-medium text-lg">
                  {t.license.copyright}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm pt-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-lg py-6">
              <CardTitle className="text-2xl text-center">
                {t.license.mitTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 leading-relaxed text-justify">
                    {t.license.permission}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm font-medium">
                    {t.license.conditions}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 text-sm leading-relaxed font-mono text-justify">
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
