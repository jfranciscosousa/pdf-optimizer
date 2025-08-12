import { createFileRoute, Link } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
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
  Infinity,
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

  const handleOptimize = () => {
    if (selectedFile) {
      optimizePdf(
        selectedFile,
        optimizationLevel as "light" | "medium" | "heavy",
      );
    }
  };

  const handleDownload = () => {
    if (optimizedFileUrl) {
      const link = document.createElement("a");
      link.href = optimizedFileUrl;
      link.download = `optimized_${selectedFile?.name || "document.pdf"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (error) throw new Error(error);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <FileText className="h-12 w-12 text-blue-600" />
              <Sparkles className="h-6 w-6 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.home.title}
            </h1>
          </div>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            {t.home.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm pt-0">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg py-4">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  {t.home.uploadTitle}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {t.home.uploadDescription}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-8">
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-700">
                    {t.home.selectFile}
                  </Label>
                  <div className="relative">
                    {!selectedFile ? (
                      <div
                        {...getRootProps()}
                        className={`flex flex-col items-center justify-center cursor-pointer h-32 text-lg border-2 border-dashed transition-all rounded-lg ${
                          isDragActive
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 text-gray-500"
                        }`}
                      >
                        <input {...getInputProps()} />
                        <Upload className="h-8 w-8 mb-2" />
                        <p className="text-center">
                          {isDragActive
                            ? "Drop your PDF here..."
                            : "Drop your PDF here or click to browse"}
                        </p>
                        <p className="text-sm mt-1 opacity-75">
                          Supports PDF files only
                        </p>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-800 font-medium">
                              {selectedFile.name}
                            </p>
                            <p className="text-green-600 text-sm">
                              Size:{" "}
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <div
                              {...getRootProps()}
                              className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer underline"
                            >
                              <input {...getInputProps()} />
                              Change
                            </div>
                            <button
                              type="button"
                              onClick={() => setSelectedFile(null)}
                              className="text-sm text-red-600 hover:text-red-800"
                            >
                              Remove
                            </button>
                          </div>
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
                          className={`block p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            optimizationLevel === level.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <RadioGroupItem value={level.id} id={level.id} />
                            <span className="font-semibold text-lg">
                              {level.name}
                            </span>
                            <div
                              className={`px-2 py-1 rounded text-xs font-medium ${
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
                          <p className="text-gray-600 ml-6 mt-2">
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
                    className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                        {t.home.optimizing}
                      </>
                    ) : (
                      <>
                        <Zap className="mr-3 h-5 w-5" />
                        {t.home.optimizePdf}
                      </>
                    )}
                  </Button>

                  {optimizedFileUrl && (
                    <div className="space-y-3">
                      {optimizedSize && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-blue-800 font-medium">
                            Optimized size:{" "}
                            {(optimizedSize / 1024 / 1024).toFixed(2)} MB
                          </p>
                          {selectedFile && (
                            <p className="text-blue-600 text-sm">
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
                        className="w-full h-14 text-lg border-2 border-green-500 text-green-700 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all bg-transparent"
                      >
                        <Download className="mr-3 h-5 w-5" />
                        {t.home.downloadOptimized}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {t.home.feature1Title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {t.home.feature1Description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {t.home.feature2Title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {t.home.feature2Description}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Infinity className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {t.home.feature3Title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {t.home.feature3Description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <footer className="mt-16 text-center space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <Link
              to="/privacy"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              {t.home.privacyPolicy}
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
