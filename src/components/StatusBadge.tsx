import clsx from "clsx";
import React from "react";

export type Status =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "WAITING_FOR_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "IN_DEVELOPMENT"
  | "ON_HOLD"
  | "COMPLETED"
  | "ARCHIVED"
  | "CANCELED";

const statusColorMap: Record<Status, string> = {
  SUBMITTED: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  UNDER_REVIEW:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  WAITING_FOR_APPROVAL:
    "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  APPROVED: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  IN_DEVELOPMENT:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
  ON_HOLD: "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  COMPLETED:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
  ARCHIVED: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100",
  CANCELED: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100",
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  return (
    <span
      className={clsx(
        `px-3 py-1.5 rounded-full text-sm font-semibold badge badge-lg ${statusColorMap[status]}`,
        className
      )}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
};

export default StatusBadge;
