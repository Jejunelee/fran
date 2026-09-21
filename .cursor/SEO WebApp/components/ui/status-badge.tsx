import type { DataStatus } from "@/types";

const STYLES: Record<DataStatus, string> = {
  live: "bg-emerald-50 text-emerald-800 border-emerald-200",
  imported: "bg-sky-50 text-sky-800 border-sky-200",
  user_supplied: "bg-indigo-50 text-indigo-800 border-indigo-200",
  estimated: "bg-amber-50 text-amber-900 border-amber-200",
  generated: "bg-violet-50 text-violet-800 border-violet-200",
  unavailable: "bg-slate-100 text-slate-600 border-slate-200",
  demo: "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
  insufficient: "bg-orange-50 text-orange-800 border-orange-200",
};

const LABELS: Record<DataStatus, string> = {
  live: "Live",
  imported: "Imported",
  user_supplied: "User supplied",
  estimated: "Estimated",
  generated: "Generated",
  unavailable: "Unavailable",
  demo: "Demo data",
  insufficient: "Insufficient data",
};

export function StatusBadge({ status }: { status: DataStatus }) {
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium ${STYLES[status]}`}>
      {LABELS[status]}
    </span>
  );
}

export function MetricCell({
  value,
  status,
  fallback = "Not available",
}: {
  value: string | number | null | undefined;
  status: DataStatus;
  fallback?: string;
}) {
  if (value == null || value === "") {
    return (
      <div className="flex flex-col gap-1">
        <span className="text-slate-400">{fallback}</span>
        <StatusBadge status={status === "demo" ? "demo" : status === "insufficient" ? "insufficient" : "unavailable"} />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1">
      <span>{value}</span>
      <StatusBadge status={status} />
    </div>
  );
}
