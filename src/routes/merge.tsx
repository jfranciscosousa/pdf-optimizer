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
import {
  Layers,
  Loader2,
  Download,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useLocale } from "~/hooks/use-locale";
import { usePdfMerge } from "~/hooks/use-pdf-merge";
import { ToolNav } from "~/components/tool-nav";
import { PdfDropzone } from "~/components/pdf-dropzone";
import { FileRow } from "~/components/file-row";

export const Route = createFileRoute("/merge")({
  head: () => ({
    meta: [
      {
        title: "Merge PDFs - PDF Optimizer",
      },
      {
        name: "description",
        content:
          "Combine multiple PDF files into a single document, entirely in your browser.",
      },
    ],
  }),
  component: MergePage,
});

function MergePage() {
  const { t } = useLocale();
  const {
    files,
    result,
    isLoading,
    addFiles,
    removeFile,
    moveFile,
    mergeFiles,
    downloadResult,
    clearAll,
  } = usePdfMerge();

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
              {t.merge.title}
            </h1>
          </Link>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-graphite">
            {t.merge.subtitle}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="border border-hairline bg-card shadow-sm">
            <CardHeader className="border-b border-hairline bg-paper2 py-4">
              <CardTitle className="flex items-center gap-2 text-xl text-ink">
                <Layers className="size-5" />
                {t.merge.uploadTitle}
              </CardTitle>
              <CardDescription className="text-graphite">
                {t.merge.uploadDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-8">
              <div className="space-y-4">
                <Label className="text-base font-semibold text-ink">
                  {t.merge.selectFiles}
                </Label>
                <PdfDropzone
                  onDrop={addFiles}
                  activeLabel={t.merge.dropzoneActive}
                  idleLabel={t.merge.dropzoneIdle}
                  hintLabel={t.merge.dropzoneHint}
                />
              </div>

              {files.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold text-ink">
                      {t.merge.selectedFilesLabel} ({files.length})
                    </Label>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-sm text-destructive hover:text-destructive/80"
                    >
                      {t.merge.clearAll}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {files.map((file, idx) => (
                      <FileRow key={idx} name={file.name} size={file.size}>
                        <button
                          type="button"
                          onClick={() => moveFile(idx, "up")}
                          disabled={idx === 0}
                          className="text-graphite hover:text-ink disabled:opacity-30"
                        >
                          <ChevronUp className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveFile(idx, "down")}
                          disabled={idx === files.length - 1}
                          className="text-graphite hover:text-ink disabled:opacity-30"
                        >
                          <ChevronDown className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-destructive hover:text-destructive/80"
                        >
                          <X className="size-4" />
                        </button>
                      </FileRow>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={mergeFiles}
                disabled={files.length < 2 || isLoading}
                className="h-14 w-full text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 size-5 animate-spin" />
                    {t.merge.merging}
                  </>
                ) : (
                  <>
                    <Layers className="mr-3 size-5" />
                    {t.merge.mergeButton}
                  </>
                )}
              </Button>

              {result && (
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-ink">
                    {t.merge.resultLabel}
                  </Label>
                  {result.error ? (
                    <FileRow
                      name={t.merge.resultLabel}
                      size={0}
                      tone="error"
                      subtitle={
                        <p className="text-sm text-destructive">
                          {t.merge.error}: {result.error}
                        </p>
                      }
                    />
                  ) : (
                    <FileRow
                      name={t.merge.resultLabel}
                      size={result.size ?? 0}
                      tone="success"
                    >
                      <Button onClick={downloadResult} size="sm">
                        <Download className="mr-2 size-4" />
                        {t.merge.download}
                      </Button>
                    </FileRow>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
