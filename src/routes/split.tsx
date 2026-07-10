import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Scissors, Sparkles, Loader2, Download } from "lucide-react";
import { useLocale } from "~/hooks/use-locale";
import { usePdfSplit } from "~/hooks/use-pdf-split";
import { ToolNav } from "~/components/tool-nav";
import { PdfDropzone } from "~/components/pdf-dropzone";
import { FileRow } from "~/components/file-row";

export const Route = createFileRoute("/split")({
  head: () => ({
    meta: [
      {
        title: "Split PDF - PDF Optimizer",
      },
      {
        name: "description",
        content:
          "Split a PDF into one file per page, entirely in your browser.",
      },
    ],
  }),
  component: SplitPage,
});

function SplitPage() {
  const { t } = useLocale();
  const {
    file,
    results,
    zipUrl,
    error,
    isLoading,
    setFile,
    splitFile,
    downloadResult,
    downloadZip,
    clearAll,
  } = usePdfSplit();

  const onDrop = (files: File[]) => {
    const [selected] = files;
    if (selected) {
      setFile(selected);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8">
        <ToolNav />

        <div className="mb-12 text-center">
          <Link to="/" className="mb-6 flex items-center justify-center gap-3">
            <div className="relative">
              <Scissors className="size-12 text-blue-600" />
              <Sparkles className="absolute -top-2 -right-2 size-6 animate-pulse text-yellow-500" />
            </div>
            <h1 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl leading-tight font-bold text-transparent">
              {t.split.title}
            </h1>
          </Link>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            {t.split.subtitle}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="border-0 bg-white/80 pt-0 shadow-2xl backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-linear-to-r from-blue-500 to-purple-600 py-4 text-white">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Scissors className="size-6" />
                {t.split.uploadTitle}
              </CardTitle>
              <CardDescription className="text-blue-100">
                {t.split.uploadDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-8 pt-0">
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-700">
                  {t.split.selectFile}
                </Label>
                <PdfDropzone
                  onDrop={onDrop}
                  multiple={false}
                  activeLabel={t.split.dropzoneActive}
                  idleLabel={t.split.dropzoneIdle}
                  hintLabel={t.split.dropzoneHint}
                />
              </div>

              {file && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold text-gray-700">
                      {t.split.selectedFileLabel}
                    </Label>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      {t.split.clearAll}
                    </button>
                  </div>
                  <FileRow name={file.name} size={file.size} />
                </div>
              )}

              <Button
                onClick={splitFile}
                disabled={!file || isLoading}
                className="h-14 w-full bg-linear-to-r from-blue-600 to-purple-600 text-lg shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 size-5 animate-spin" />
                    {t.split.splitting}
                  </>
                ) : (
                  <>
                    <Scissors className="mr-3 size-5" />
                    {t.split.splitButton}
                  </>
                )}
              </Button>

              {error && (
                <p className="text-sm text-red-600">
                  {t.split.error}: {error}
                </p>
              )}

              {results.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-lg font-semibold text-gray-700">
                      {t.split.resultsLabel} ({results.length})
                    </Label>
                    {zipUrl && (
                      <Button onClick={downloadZip} size="sm" variant="outline">
                        <Download className="mr-2 size-4" />
                        {t.split.downloadZip}
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {results.map((result, idx) => (
                      <FileRow
                        key={idx}
                        name={result.name}
                        size={result.size}
                        tone="success"
                      >
                        <Button
                          onClick={() => downloadResult(idx)}
                          size="sm"
                          className="bg-green-600 text-white hover:bg-green-700"
                        >
                          <Download className="mr-2 size-4" />
                          {t.split.download}
                        </Button>
                      </FileRow>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
