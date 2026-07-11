import { Link } from "@tanstack/react-router";
import { FileX, Home } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { useLocale } from "~/hooks/use-locale";

export function NotFoundComponent() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl px-6 py-8">
        <div className="flex min-h-screen items-center justify-center">
          <Card className="w-full max-w-2xl border border-hairline bg-card shadow-sm">
            <CardHeader className="py-8 text-center">
              <div className="mb-4 flex justify-center">
                <FileX className="size-16 text-graphite" />
              </div>
              <CardTitle className="mb-2 text-3xl font-semibold tracking-tight text-ink">
                {t.notFound.title}
              </CardTitle>
              <p className="text-lg text-graphite">{t.notFound.subtitle}</p>
            </CardHeader>
            <CardContent className="space-y-6 pb-8 text-center">
              <p className="text-graphite">{t.notFound.description}</p>

              <div className="space-y-4">
                <Button
                  render={<Link to="/" />}
                  nativeButton={false}
                  className="h-12 w-full text-lg"
                >
                  <Home className="mr-2 size-5" />
                  {t.notFound.backToHome}
                </Button>

                <div className="text-sm text-graphite">
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
