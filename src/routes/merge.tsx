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
  Sparkles,
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
      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8">
        <ToolNav />

        <div className="mb-12 text-center">
          <Link to="/" className="mb-6 flex items-center justify-center gap-3">
            <div className="relative">
              <Layers className="size-12 text-blue-600" />
              <Sparkles className="absolute -top-2 -right-2 size-6 animate-pulse text-yellow-500" />
            </div>
            <h1 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl leading-tight font-bold text-transparent">
              {t.merge.title}
            </h1>
          </Link>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            {t.merge.subtitle}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="border-0 bg-white/80 pt-0 shadow-2xl backdrop-blur-sm">
            <CardHeader className="rounded-t-lg bg-linear-to-r from-blue-500 to-purple-600 py-4 text-white">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Layers className="size-6" />
                {t.merge.uploadTitle}
              </CardTitle>
              <CardDescription className="text-blue-100">
                {t.merge.uploadDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-8 pt-0">
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-700">
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
                    <Label className="text-lg font-semibold text-gray-700">
                      {t.merge.selectedFilesLabel} ({files.length})
                    </Label>
                    <button
                      type="button"
                      onClick={clearAll}
                      className="text-sm text-red-600 hover:text-red-800"
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
                          className="text-blue-600 hover:text-blue-800 disabled:opacity-30"
                        >
                          <ChevronUp className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveFile(idx, "down")}
                          disabled={idx === files.length - 1}
                          className="text-blue-600 hover:text-blue-800 disabled:opacity-30"
                        >
                          <ChevronDown className="size-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-red-600 hover:text-red-800"
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
                className="h-14 w-full bg-linear-to-r from-blue-600 to-purple-600 text-lg shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
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
                  <Label className="text-lg font-semibold text-gray-700">
                    {t.merge.resultLabel}
                  </Label>
                  {result.error ? (
                    <FileRow
                      name={t.merge.resultLabel}
                      size={0}
                      tone="error"
                      subtitle={
                        <p className="text-sm text-red-600">
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
                      <Button
                        onClick={downloadResult}
                        size="sm"
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
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
