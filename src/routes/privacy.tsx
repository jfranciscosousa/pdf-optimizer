import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Shield,
  ArrowLeft,
  CheckCircle,
  Server,
  Eye,
  Lock,
  Hammer,
  Mail,
} from "lucide-react";
import { GitHubIcon } from "~/components/icons/github";
import { useLocale } from "~/hooks/use-locale";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 size-4" />
              {t.privacy.backToHome}
            </Button>
          </Link>

          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Shield className="size-10 text-blue-600" />
              <h1 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl leading-tight font-bold text-transparent">
                {t.privacy.title}
              </h1>
            </div>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              {t.privacy.subtitle}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {t.privacy.lastUpdated}: August 2025
            </p>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {/* Local Processing */}
          <Card className="border-0 bg-white/80 pt-0 shadow-lg backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-linear-to-r from-green-500 to-emerald-600 py-4 text-white">
              <CardTitle className="flex items-center gap-2">
                <Lock className="size-5" />
                {t.privacy.localProcessingTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 py-0">
              <p className="leading-relaxed text-gray-700">
                {t.privacy.localProcessingContent}
              </p>
            </CardContent>
          </Card>

          {/* No Tracking */}
          <Card className="border-0 bg-white/80 pt-0 shadow-lg backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-linear-to-r from-blue-500 to-cyan-600 py-4 text-white">
              <CardTitle className="flex items-center gap-2">
                <Eye className="size-5" />
                {t.privacy.noTrackingTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 py-0">
              <p className="leading-relaxed text-gray-700">
                {t.privacy.noTrackingContent}
              </p>
            </CardContent>
          </Card>

          {/* No Data Storage */}
          <Card className="border-0 bg-white/80 pt-0 shadow-lg backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-linear-to-r from-purple-500 to-pink-600 py-4 text-white">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="size-5" />
                {t.privacy.noDataStorageTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 py-0">
              <p className="leading-relaxed text-gray-700">
                {t.privacy.noDataStorageContent}
              </p>
            </CardContent>
          </Card>

          {/* Hosting Disclosure */}
          <Card className="border-0 bg-white/80 pt-0 shadow-lg backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-linear-to-r from-orange-500 to-red-600 py-4 text-white">
              <CardTitle className="flex items-center gap-2">
                <Server className="size-5" />
                {t.privacy.hostingTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-8 py-0">
              <p className="leading-relaxed text-gray-700">
                {t.privacy.hostingContent}
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
                {t.privacy.hostingList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <p className="font-medium text-yellow-800">
                  {t.privacy.hostingNote}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Implementation */}
          <Card className="border-0 bg-white/80 pt-0 shadow-lg backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-linear-to-r from-indigo-500 to-purple-600 py-4 text-white">
              <CardTitle className="flex items-center gap-2">
                <Hammer className="size-5" />
                {t.privacy.technicalTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-8 py-0">
              <p className="leading-relaxed text-gray-700">
                {t.privacy.technicalContent}
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
                {t.privacy.technicalList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 bg-white/80 pt-0 shadow-lg backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-linear-to-r from-blue-500 to-purple-600 py-4 text-white">
              <CardTitle className="flex items-center gap-2">
                <Mail className="size-5" />
                {t.privacy.contactTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 px-8 py-6">
              <p className="leading-relaxed text-gray-700">
                {t.privacy.contactContent}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <Mail className="mt-1 size-5 text-blue-600" />
                  <div>
                    <p className="text-gray-700">{t.privacy.contactEmail}</p>
                    <a
                      href="mailto:francisco.sousa@hey.com"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      francisco.sousa@hey.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <GitHubIcon className="mt-1 size-5 text-gray-600" />
                  <div>
                    <p className="text-gray-700">{t.privacy.contactGitHub}</p>
                    <a
                      href="https://github.com/jfranciscosousa/pdf-optimizer"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 underline hover:text-gray-800"
                    >
                      github.com/jfranciscosousa/pdf-optimizer
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
