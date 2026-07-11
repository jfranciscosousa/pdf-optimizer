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
  neutral: "border-hairline",
  success: "border-hairline border-l-2 border-l-success",
  error: "border-hairline border-l-2 border-l-danger",
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
      className={`flex items-center justify-between rounded-lg border bg-card p-3 ${containerTone[tone]}`}
    >
      <div className="flex-1">
        <p className="font-medium text-ink">{name}</p>
        {subtitle ?? (
          <p className="font-mono text-sm text-graphite">
            {(size / 1024 / 1024).toFixed(2)} MB
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
