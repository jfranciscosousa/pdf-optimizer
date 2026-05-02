import { Link } from "@tanstack/react-router";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";
import { useCallback } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useLocale } from "~/hooks/use-locale";

interface ErrorComponentProps {
  error?: Error;
  reset?: () => void;
}

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const { t } = useLocale();

  const handleTryAgain = useCallback(() => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  }, [reset]);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-8">
        <div className="flex min-h-screen items-center justify-center">
          <Card className="w-full max-w-2xl border-0 bg-white/80 shadow-2xl backdrop-blur-sm">
            <CardHeader className="py-8 text-center">
              <div className="mb-4 flex justify-center">
                <div className="relative">
                  <AlertTriangle className="size-24 text-orange-400" />
                  <div className="absolute -top-2 -right-2 rounded-full bg-red-100 p-2">
                    <AlertTriangle className="size-6 text-red-600" />
                  </div>
                </div>
              </div>
              <CardTitle className="mb-2 text-4xl font-bold text-gray-800">
                {t.error.title}
              </CardTitle>
              <p className="text-lg text-gray-600">{t.error.subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-6 pb-8 text-center">
              <p className="text-gray-500">{t.error.description}</p>

              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <p className="font-mono text-sm text-red-800">
                    {error.message}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <Button
                  onClick={handleTryAgain}
                  className="h-12 w-full bg-linear-to-r from-orange-500 to-red-600 text-lg shadow-lg transition-all hover:from-orange-600 hover:to-red-700 hover:shadow-xl"
                >
                  <RotateCcw className="mr-2 size-5" />
                  {t.error.tryAgain}
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-12 w-full border-2 border-blue-500 bg-transparent text-lg text-blue-700 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
                >
                  <Link to="/">
                    <Home className="mr-2 size-5" />
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
