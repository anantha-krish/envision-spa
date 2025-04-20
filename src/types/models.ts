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
export interface UserWithCompleteProfiles extends UserProfile {
  email: string;
  roleCode: Pick<Role, "roleCode">;
  designationCode: Pick<Designation, "designationCode">;
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
