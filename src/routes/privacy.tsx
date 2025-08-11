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
} from "lucide-react";
import { useLocale } from "~/hooks/use-locale";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  const { t } = useLocale();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.privacy.backToHome}
            </Button>
          </Link>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-10 w-10 text-blue-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t.privacy.title}
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {t.privacy.subtitle}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {t.privacy.lastUpdated}: August 2025
            </p>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {/* Local Processing */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm pt-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg py-4">
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                {t.privacy.localProcessingTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 py-0">
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.localProcessingContent}
              </p>
            </CardContent>
          </Card>

          {/* No Tracking */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm pt-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-t-lg py-4">
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                {t.privacy.noTrackingTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 py-0">
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.noTrackingContent}
              </p>
            </CardContent>
          </Card>

          {/* No Data Storage */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm pt-0">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg py-4">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                {t.privacy.noDataStorageTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 py-0">
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.noDataStorageContent}
              </p>
            </CardContent>
          </Card>

          {/* Hosting Disclosure */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm pt-0">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-t-lg py-4">
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                {t.privacy.hostingTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 py-0 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.hostingContent}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                {t.privacy.hostingList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 font-medium">{t.privacy.hostingNote}</p>
              </div>
            </CardContent>
          </Card>

          {/* Technical Implementation */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm pt-0">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg py-4">
              <CardTitle className="flex items-center gap-2">
                <Hammer className="h-5 w-5" />
                {t.privacy.technicalTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 py-0 space-y-4">
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.technicalContent}
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                {t.privacy.technicalList.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm pt-4">
            <CardHeader>
              <CardTitle>{t.privacy.contactTitle}</CardTitle>
            </CardHeader>
            <CardContent className="px-8 py-0">
              <p className="text-gray-700 leading-relaxed">
                {t.privacy.contactContent}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
