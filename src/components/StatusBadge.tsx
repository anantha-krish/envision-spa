import clsx from "clsx";
import React from "react";
import { statusColorMap } from "../utils/constants";

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
