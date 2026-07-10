import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

interface PdfDropzoneProps {
  onDrop: (files: File[]) => void;
  multiple?: boolean;
  activeLabel: string;
  idleLabel: string;
  hintLabel: string;
}

export function PdfDropzone({
  onDrop,
  multiple = true,
  activeLabel,
  idleLabel,
  hintLabel,
}: PdfDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const pdfFiles = acceptedFiles.filter(
        (file) => file.type === "application/pdf",
      );
      if (pdfFiles.length > 0) {
        onDrop(pdfFiles);
      }
    },
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple,
  });

  return (
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
      <p className="text-center">{isDragActive ? activeLabel : idleLabel}</p>
      <p className="mt-1 text-sm opacity-75">{hintLabel}</p>
    </div>
  );
}
