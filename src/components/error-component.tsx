import { Link } from "@tanstack/react-router";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useLocale } from "~/hooks/use-locale";

interface ErrorComponentProps {
  error?: Error;
  reset?: () => void;
}

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const { t } = useLocale();

  const handleTryAgain = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center min-h-screen">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm w-full max-w-2xl">
            <CardHeader className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <AlertTriangle className="h-24 w-24 text-orange-400" />
                  <div className="absolute -top-2 -right-2 bg-red-100 rounded-full p-2">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>
              <CardTitle className="text-4xl font-bold text-gray-800 mb-2">
                {t.error.title}
              </CardTitle>
              <p className="text-gray-600 text-lg">{t.error.subtitle}</p>
            </CardHeader>
            <CardContent className="text-center space-y-6 pb-8">
              <p className="text-gray-500">{t.error.description}</p>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 text-sm font-mono">
                    {error.message}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <Button
                  onClick={handleTryAgain}
                  className="w-full h-12 text-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  {t.error.tryAgain}
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12 text-lg border-2 border-blue-500 text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all bg-transparent"
                >
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    {t.error.backToHome}
                  </Link>
                </Button>

                <div className="text-sm text-gray-500">
                  <p>{t.error.suggestion}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
