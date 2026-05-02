import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
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
  FileText,
  Download,
  Loader2,
  Zap,
  Shield,
  Infinity as InfinityIcon,
  Sparkles,
  Upload,
} from "lucide-react";
import { usePdfOptimization } from "~/hooks/use-pdf-optimization";
import { useLocale } from "~/hooks/use-locale";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [optimizationLevel, setOptimizationLevel] = useState("medium");

  const { t } = useLocale();
  const {
    isLoading,
    error,
    data: optimizedFileUrl,
    optimizedSize,
    optimizePdf,
  } = usePdfOptimization();

  const optimizationLevels = [
    {
      id: "light",
      name: t.home.lightName,
      description: t.home.lightDescription,
    },
    {
      id: "medium",
      name: t.home.mediumName,
      description: t.home.mediumDescription,
    },
    {
      id: "heavy",
      name: t.home.heavyName,
      description: t.home.heavyDescription,
    },
  ];

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const handleOptimize = useCallback(() => {
    if (selectedFile) {
      optimizePdf(
        selectedFile,
        optimizationLevel as "light" | "medium" | "heavy",
      );
    }
  }, [selectedFile, optimizePdf, optimizationLevel]);

  const handleDownload = useCallback(() => {
    if (optimizedFileUrl) {
      const link = document.createElement("a");
      link.href = optimizedFileUrl;
      link.download = `optimized_${selectedFile?.name || "document.pdf"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [optimizedFileUrl, selectedFile]);

  const handleRemoveFile = useCallback(() => setSelectedFile(null), []);

  if (error) throw new Error(error);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-12 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="relative">
              <FileText className="size-12 text-blue-600" />
              <Sparkles className="absolute -top-2 -right-2 size-6 animate-pulse text-yellow-500" />
            </div>
            <h1 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent">
              {t.home.title}
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            {t.home.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-0 bg-white/80 pt-0 shadow-2xl backdrop-blur-sm">
              <CardHeader className="rounded-t-lg bg-linear-to-r from-blue-500 to-purple-600 py-4 text-white">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <FileText className="size-6" />
                  {t.home.uploadTitle}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {t.home.uploadDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8 pt-0">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-700">
                    {t.home.selectFile}
                  </Label>
                  <div className="relative">
                    {!selectedFile ? (
                      <div
                        {...getRootProps()}
                        className={`flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-lg transition-all ${
                          isDragActive
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 bg-gray-50 text-gray-500 hover:border-blue-400 hover:bg-blue-50"
                        }`}
                      >
                        <input {...getInputProps()} />
                        <Upload className="mb-2 size-8" />
                        <p className="text-center">
                          {isDragActive
                            ? "Drop your PDF here..."
                            : "Drop your PDF here or click to browse"}
                        </p>
                        <p className="mt-1 text-sm opacity-75">
                          Supports PDF files only
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-green-800">
                              {selectedFile.name}
                            </p>
                            <p className="text-sm text-green-600">
                              Size:{" "}
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          {!isLoading && (
                            <div className="flex gap-2">
                              <div
                                {...getRootProps()}
                                className="cursor-pointer text-sm text-blue-600 underline hover:text-blue-800"
                              >
                                <input {...getInputProps()} />
                                Change
                              </div>
                              <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="text-sm text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <Label className="text-lg font-semibold text-gray-700">
                    {t.home.optimizationLevel}
                  </Label>
                  <RadioGroup
                    value={optimizationLevel}
                    onValueChange={setOptimizationLevel}
                  >
                    {optimizationLevels.map((level, index) => (
                      <div key={level.id} className="space-y-3">
                        <label
                          htmlFor={level.id}
                          className={`block cursor-pointer rounded-lg border-2 p-4 transition-all ${
                            optimizationLevel === level.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value={level.id} id={level.id} />
                            <span className="text-lg font-semibold">
                              {level.name}
                            </span>
                            <div
                              className={`rounded px-2 py-1 text-xs font-medium ${
                                index === 0
                                  ? "bg-green-100 text-green-800"
                                  : index === 1
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {index === 0
                                ? "10-30%"
                                : index === 1
                                  ? "30-60%"
                                  : "60-80%"}
                            </div>
                          </div>
                          <p className="mt-2 ml-6 text-gray-600">
                            {level.description}
                          </p>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleOptimize}
                    disabled={!selectedFile || isLoading}
                    className="h-14 w-full bg-linear-to-r from-blue-600 to-purple-600 text-lg shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 size-5 animate-spin" />
                        {t.home.optimizing}
                      </>
                    ) : (
                      <>
                        <Zap className="mr-3 size-5" />
                        {t.home.optimizePdf}
                      </>
                    )}
                  </Button>

                  {optimizedFileUrl && (
                    <div className="space-y-3">
                      {optimizedSize && (
                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                          <p className="font-medium text-blue-800">
                            Optimized size:{" "}
                            {(optimizedSize / 1024 / 1024).toFixed(2)} MB
                          </p>
                          {selectedFile && (
                            <p className="text-sm text-blue-600">
                              Reduction:{" "}
                              {(
                                ((selectedFile.size - optimizedSize) /
                                  selectedFile.size) *
                                100
                              ).toFixed(1)}
                              %
                            </p>
                          )}
                        </div>
                      )}
                      <Button
                        onClick={handleDownload}
                        variant="outline"
                        className="h-14 w-full border-2 border-green-500 bg-transparent text-lg text-green-700 shadow-lg transition-all hover:bg-green-50 hover:shadow-xl"
                      >
                        <Download className="mr-3 size-5" />
                        {t.home.downloadOptimized}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-blue-100 p-2">
                    <Zap className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {t.home.feature1Title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {t.home.feature1Description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-green-100 p-2">
                    <Shield className="size-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {t.home.feature2Title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {t.home.feature2Description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-purple-100 p-2">
                    <InfinityIcon className="size-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {t.home.feature3Title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {t.home.feature3Description}
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
