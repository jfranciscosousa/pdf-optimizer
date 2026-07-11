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
import { Scissors, Loader2, Download } from "lucide-react";
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
      <div className="container mx-auto max-w-6xl px-6 py-8">
        <ToolNav />

        <div className="mb-12 text-center">
          <Link to="/" className="mb-5 inline-flex items-center gap-2.5">
            <span
              aria-hidden
              className="inline-block size-2 rotate-45 bg-stamp"
            />
            <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {t.split.title}
            </h1>
          </Link>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-graphite">
            {t.split.subtitle}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="border border-hairline bg-card shadow-sm">
            <CardHeader className="border-b border-hairline bg-paper2 py-4">
              <CardTitle className="flex items-center gap-2 text-xl text-ink">
                <Scissors className="size-5" />
                {t.split.uploadTitle}
              </CardTitle>
              <CardDescription className="text-graphite">
                {t.split.uploadDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              <div className="space-y-4">
                <Label className="text-base font-semibold text-ink">
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
                    <Label className="text-base font-semibold text-ink">
                      {t.split.selectedFileLabel}
                    </Label>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-sm text-destructive hover:text-destructive/80"
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
                className="h-14 w-full text-lg"
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
                <p className="text-sm text-destructive">
                  {t.split.error}: {error}
                </p>
              )}

              {results.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold text-ink">
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
                        <Button onClick={() => downloadResult(idx)} size="sm">
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
