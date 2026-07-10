import { Link } from "@tanstack/react-router";
import { FileX, Home, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useLocale } from "~/hooks/use-locale";

export function NotFoundComponent() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-8">
        <div className="flex min-h-screen items-center justify-center">
          <Card className="w-full max-w-2xl border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
            <CardHeader className="py-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <FileX className="size-24 text-gray-400" />
                  <div className="absolute -top-2 -right-2 rounded-full bg-red-100 p-2">
                    <Search className="size-6 text-red-600" />
                  </div>
                </div>
              </div>
              <CardTitle className="mb-2 text-4xl font-bold text-gray-800">
                {t.notFound.title}
              </CardTitle>
              <p className="text-lg text-gray-600">{t.notFound.subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-6 pb-8 text-center">
              <p className="text-gray-500">{t.notFound.description}</p>

              <div className="space-y-4">
                <Button
                  render={<Link to="/" />}
                  nativeButton={false}
                  className="h-12 w-full bg-linear-to-r from-blue-600 to-purple-600 text-lg shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                >
                  <Home className="mr-2 size-5" />
                  {t.notFound.backToHome}
                </Button>

                <div className="text-sm text-gray-500">
                  <p>{t.notFound.suggestion}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
