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

export type Notification = {
  id: string;
  category: string;
  ideaId: number;
  type: string;
  actorIds: number[];
  message: string;
  count: number;
  updatedAt: string;
  isRead: false;
};

export type NotificationResponse = {
  unreadCount: number;
  notifications: Notification[];
  total: number;
  hasMore: boolean;
};
