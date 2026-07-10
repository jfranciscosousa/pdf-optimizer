import type { ReactNode } from "react";

type FileRowTone = "neutral" | "success" | "error";

interface FileRowProps {
  name: string;
  size: number;
  tone?: FileRowTone;
  subtitle?: ReactNode;
  children?: ReactNode;
}

const containerTone: Record<FileRowTone, string> = {
  neutral: "border-blue-200 bg-blue-50",
  success: "border-green-200 bg-green-50",
  error: "border-red-200 bg-red-50",
};

const nameTone: Record<FileRowTone, string> = {
  neutral: "text-blue-800",
  success: "text-green-800",
  error: "text-red-800",
};

export function FileRow({
  name,
  size,
  tone = "neutral",
  subtitle,
  children,
}: FileRowProps) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-3 ${containerTone[tone]}`}
    >
      <div className="flex-1">
        <p className={`font-medium ${nameTone[tone]}`}>{name}</p>
        {subtitle ?? (
          <p className="text-sm text-blue-600">
            Size: {(size / 1024 / 1024).toFixed(2)} MB
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
