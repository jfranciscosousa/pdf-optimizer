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
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="flex min-h-screen items-center justify-center">
          <Card className="w-full max-w-2xl border border-hairline bg-card shadow-sm">
            <CardHeader className="py-8 text-center">
              <div className="mb-4 flex justify-center">
                <AlertTriangle className="size-16 text-destructive" />
              </div>
              <CardTitle className="mb-2 text-3xl font-semibold tracking-tight text-ink">
                {t.error.title}
              </CardTitle>
              <p className="text-lg text-graphite">{t.error.subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-6 pb-8 text-center">
              <p className="text-graphite">{t.error.description}</p>

              {error && (
                <div className="rounded-lg border border-hairline bg-paper2 p-4 text-left">
                  <p className="font-mono text-sm text-destructive">
                    {error.message}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <Button
                  onClick={handleTryAgain}
                  className="h-12 w-full text-lg"
                >
                  <RotateCcw className="mr-2 size-5" />
                  {t.error.tryAgain}
                </Button>

                <Button
                  render={<Link to="/" />}
                  nativeButton={false}
                  variant="outline"
                  className="h-12 w-full text-lg"
                >
                  <Home className="mr-2 size-5" />
                  {t.error.backToHome}
                </Button>

                <div className="text-sm text-graphite">
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
