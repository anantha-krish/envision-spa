export interface Role {
  id: number;
  roleCode: string;
  roleName: string;
}

export interface Designation {
  id: number;
  designationCode: string;
  designationName: string;
}

export interface UserProfile {
  userId: number;
  email?: string;
  firstName: string;
  lastName: string;
}
export interface UserWithCompleteProfile extends UserProfile {
  email: string;
  roleCode: Role["roleCode"];
  designationCode: Designation["designationCode"];
  roleName?: string;
  designationName?: string;
  managerId?: number;
}

export type Notification = {
  id: string;
  category: string;
  ideaId: number;
  type: string;
  actorIds: number[];
  message: string;
  count: number;
  updatedAt: string;
  isRead: boolean;
};
export type S3File = { key: string; url: string };

export interface CommentResponse {
  id: number;
  userId: number;
  ideaId: number;
  content: string;
  createdAt: string;
}

export type NotificationResponse = {
  unreadCount: number;
  notifications: Notification[];
  total: number;
  hasMore: boolean;
};
export type Tag = {
  id: string;
  name: string;
};
export type IdeaTag = {
  tagId: number;
  tagName: string;
};
export type IdeaDetailsReq = {
  title: string;
  summary: string;
  description: string;
  statusId: number;
  tags: number[];
  managerId: number;
  submittedBy: number[];
};

export interface IdeaDetailsResponse extends IdeaDetailsReq {
  ideaId: number;
}

export interface LikeResponse {
  liked: boolean;
  totalCount: number;
  message: string;
}

export const validSortOptions = [
  "popular",
  "trend",
  "most_liked",
  "most_viewed",
  "recent",
] as const;
export type SortOption = (typeof validSortOptions)[number];
export type SortOrder = "ASC" | "DESC";

export interface BaseIdeaItem {
  id: number;
  title: string;
  summary: string;
  statusName: string;
  likes: number;
  comments: number;
  views: number;
  createdAt: string;
}

export interface IdeaItem extends BaseIdeaItem {
  tags: string[];
}

export interface IdeaListItem extends BaseIdeaItem {
  tags: IdeaTag[];
}

export type IdeaDetail = IdeaItem & {
  description: string;
  managerId: number | null;
  createdAt: string;
  updatedAt: string;
  submittedBy: number[];
};

export interface Approver {
  userId: number;
  name: string;
  ideaId: number;
  assignedAt: string;
}
export interface PocTeamMember {
  userId: number;
  name: string;
  role: string;
  teamName: string;
  ideaId: number;
}

export interface IdeaListApiResponse {
  ideas: IdeaListItem[];
  totalCount: number;
}

export interface TopContributor {
  userId: number;
  userFullName?: string;
  ideaCount: number;
}

export type TopContributorsResponse = TopContributor[];

export interface IdeaSubmission {
  date: string;
  count: number;
}

export type IdeaSubmissionResponse = IdeaSubmission[];

export interface StatusDistribution {
  statusName: string;
  count: number;
}

export type StatusDistributionResponse = StatusDistribution[];

export interface TopIdea {
  title: string;
  likes: number;
  comments: number;
  ideaId: number;
}

export type TopIdeasResponse = TopIdea[];
