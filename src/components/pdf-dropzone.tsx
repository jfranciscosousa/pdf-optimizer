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
      className={`flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed text-base transition-colors ${
        isDragActive
          ? "border-stamp bg-stamp/5 text-ink"
          : "border-hairline bg-paper2/40 text-graphite hover:border-ink/40 hover:bg-paper2"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="mb-2 size-7" />
      <p className="text-center font-medium">
        {isDragActive ? activeLabel : idleLabel}
      </p>
      <p className="mt-1 font-mono text-xs tracking-wide text-graphite/70">
        {hintLabel}
      </p>
    </div>
  );
}
