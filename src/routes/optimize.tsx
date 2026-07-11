import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import {
  Download,
  Loader2,
  Zap,
  Shield,
  Infinity as InfinityIcon,
  X,
} from "lucide-react";
import { usePdfOptimization } from "~/hooks/use-pdf-optimization";
import { useLocale } from "~/hooks/use-locale";
import { OptimizationLevel } from "~/worker/types";
import { ToolNav } from "~/components/tool-nav";
import { PdfDropzone } from "~/components/pdf-dropzone";
import { FileRow } from "~/components/file-row";

export const Route = createFileRoute("/optimize")({
  head: () => ({
    meta: [
      {
        title: "Optimize PDF - PDF Optimizer",
      },
      {
        name: "description",
        content:
          "Reduce PDF file sizes instantly with our advanced compression technology. Choose your optimization level for the perfect balance of quality and file size.",
      },
    ],
  }),
  component: OptimizePage,
});

function OptimizePage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedLevel, setSelectedLevel] = useState("medium");

  const { t } = useLocale();
  const {
    fileResults,
    optimizeFiles,
    downloadFile,
    clearResult,
    clearAllResults,
    isLoading,
  } = usePdfOptimization();

  const optimizationLevels = [
    {
      id: "light",
      name: t.optimize.lightName,
      description: t.optimize.lightDescription,
    },
    {
      id: "medium",
      name: t.optimize.mediumName,
      description: t.optimize.mediumDescription,
    },
    {
      id: "heavy",
      name: t.optimize.heavyName,
      description: t.optimize.heavyDescription,
    },
  ];

  const onDrop = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const clearAll = () => {
    setSelectedFiles([]);
    clearAllResults();
  };

  const levelBadge = [
    "bg-success-soft text-success",
    "bg-warning-soft text-warning",
    "bg-danger-soft text-danger",
  ];
  const levelRange = ["10-30%", "30-60%", "60-80%"];

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
              {t.optimize.title}
            </h1>
          </Link>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-graphite">
            {t.optimize.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border border-hairline bg-card shadow-sm">
              <CardHeader className="border-b border-hairline bg-paper2 py-4">
                <CardTitle className="flex items-center gap-2 text-xl text-ink">
                  <Zap className="size-5" />
                  {t.optimize.uploadTitle}
                </CardTitle>
                <CardDescription className="text-graphite">
                  {t.optimize.uploadDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <div className="space-y-4">
                  <Label className="text-base font-semibold text-ink">
                    {t.optimize.selectFile}
                  </Label>
                  <PdfDropzone
                    onDrop={onDrop}
                    activeLabel={t.optimize.dropzoneActive}
                    idleLabel={t.optimize.dropzoneIdle}
                    hintLabel={t.optimize.dropzoneHint}
                  />
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold text-ink">
                        {t.optimize.selectedFilesLabel} ({selectedFiles.length})
                      </Label>
                      <button
                        type="button"
                        onClick={clearAll}
                        className="text-sm text-destructive hover:text-destructive/80"
                      >
                        {t.optimize.clearAll}
                      </button>
                    </div>
                    <div className="space-y-2">
                      {selectedFiles.map((file, idx) => (
                        <FileRow key={idx} name={file.name} size={file.size} />
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <Label className="text-base font-semibold text-ink">
                    {t.optimize.optimizationLevel}
                  </Label>
                  <RadioGroup
                    value={selectedLevel}
                    onValueChange={setSelectedLevel}
                  >
                    {optimizationLevels.map((level, index) => (
                      <div key={level.id} className="space-y-3">
                        <label
                          htmlFor={level.id}
                          className={`block cursor-pointer rounded-lg border p-4 transition-colors ${
                            selectedLevel === level.id
                              ? "border-stamp bg-stamp/5"
                              : "border-hairline hover:border-ink/30"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value={level.id} id={level.id} />
                            <span className="text-lg font-semibold text-ink">
                              {level.name}
                            </span>
                            <div
                              className={`rounded px-2 py-0.5 font-mono text-xs font-medium ${levelBadge[index]}`}
                            >
                              {levelRange[index]}
                            </div>
                          </div>
                          <p className="mt-2 ml-6 text-sm text-graphite">
                            {level.description}
                          </p>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={() =>
                      optimizeFiles(
                        selectedFiles,
                        selectedLevel as OptimizationLevel,
                      )
                    }
                    disabled={selectedFiles.length === 0 || isLoading}
                    className="h-14 w-full text-lg"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 size-5 animate-spin" />
                        {t.optimize.optimizing}
                      </>
                    ) : (
                      <>
                        <Zap className="mr-3 size-5" />
                        {t.optimize.optimizePdf}{" "}
                        {selectedFiles.length > 0
                          ? `(${selectedFiles.length})`
                          : ""}
                      </>
                    )}
                  </Button>

                  {fileResults.length > 0 && (
                    <Button
                      onClick={clearAllResults}
                      disabled={isLoading}
                      variant="outline"
                      className="h-14 w-full border-2 border-destructive text-lg text-destructive hover:bg-destructive/5"
                    >
                      <X className="mr-3 size-5" />
                      {t.optimize.clearAllResults}
                    </Button>
                  )}
                </div>

                {fileResults.length > 0 && (
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-ink">
                      {t.optimize.resultsLabel} ({fileResults.length})
                    </Label>
                    <div className="space-y-3">
                      {fileResults.map((result, idx) => (
                        <FileRow
                          key={idx}
                          name={result.file.name}
                          size={result.originalSize}
                          tone={
                            result.error
                              ? "error"
                              : result.optimizedUrl
                                ? "success"
                                : "neutral"
                          }
                          subtitle={
                            <>
                              <p className="font-mono text-sm text-graphite">
                                {(result.originalSize / 1024 / 1024).toFixed(2)}{" "}
                                MB
                                {result.optimizedSize && (
                                  <>
                                    {" → "}
                                    <span className="text-success">
                                      {(
                                        result.optimizedSize /
                                        1024 /
                                        1024
                                      ).toFixed(2)}{" "}
                                      MB
                                    </span>
                                    {" ("}
                                    {(
                                      ((result.originalSize -
                                        result.optimizedSize) /
                                        result.originalSize) *
                                      100
                                    ).toFixed(1)}
                                    % reduction)
                                  </>
                                )}
                              </p>
                              {result.error && (
                                <p className="mt-1 text-sm text-destructive">
                                  {t.optimize.error}: {result.error}
                                </p>
                              )}
                            </>
                          }
                        >
                          {result.optimizedUrl && (
                            <Button onClick={() => downloadFile(idx)} size="sm">
                              <Download className="mr-2 size-4" />
                              {t.optimize.download}
                            </Button>
                          )}
                          <button
                            type="button"
                            onClick={() => clearResult(idx)}
                            className="text-destructive hover:text-destructive/80"
                          >
                            <X className="size-4" />
                          </button>
                        </FileRow>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border border-hairline bg-card shadow-sm">
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-paper2 p-2">
                    <Zap className="size-5 text-ink" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink">
                      {t.optimize.feature1Title}
                    </h4>
                    <p className="mt-1 text-sm text-graphite">
                      {t.optimize.feature1Description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-paper2 p-2">
                    <Shield className="size-5 text-ink" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink">
                      {t.optimize.feature2Title}
                    </h4>
                    <p className="mt-1 text-sm text-graphite">
                      {t.optimize.feature2Description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-paper2 p-2">
                    <InfinityIcon className="size-5 text-ink" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-ink">
                      {t.optimize.feature3Title}
                    </h4>
                    <p className="mt-1 text-sm text-graphite">
                      {t.optimize.feature3Description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
