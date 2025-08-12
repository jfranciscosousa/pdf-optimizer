import { Link } from "@tanstack/react-router";
import { FileX, Home, Search } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useLocale } from "~/hooks/use-locale";

export function NotFoundComponent() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center min-h-screen">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm w-full max-w-2xl">
            <CardHeader className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <FileX className="h-24 w-24 text-gray-400" />
                  <div className="absolute -top-2 -right-2 bg-red-100 rounded-full p-2">
                    <Search className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-gray-800 mb-2">
                {t.notFound.title}
              </CardTitle>
              <p className="text-gray-600 text-lg">{t.notFound.subtitle}</p>
            </CardHeader>
            <CardContent className="text-center space-y-6 pb-8">
              <p className="text-gray-500">{t.notFound.description}</p>

              <div className="space-y-4">
                <Button
                  asChild
                  className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                >
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    {t.notFound.backToHome}
                  </Link>
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
