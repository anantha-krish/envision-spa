import { Status } from "../components/StatusBadge";

export const STATUS_CODES: Status[] = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
  "IN_DEVELOPMENT",
  "WAITING_FOR_APPROVAL",
  "ON_HOLD",
  "COMPLETED",
  "ARCHIVED",
  "CANCELED",
];

export const SortOptionsWithLabel = {
  popular: "Popular Ideas",
  trend: "Trending Now",
  most_liked: "Most Liked",
  most_viewed: "Most Viewed",
  recent: "Recently Added",
};
