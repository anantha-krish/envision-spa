import api from "../../api/axiosInstance";
import {
  Designation,
  NotificationResponse,
  Role,
  UserProfile,
  UserWithCompleteProfile,
} from "../../types/models";

export const fetchManagersApi = async () => {
  const res = await api.get("/users?roleCode=MANAGER");
  return res.data as UserProfile[];
};
export const fetchDesignationsApi = async () => {
  const res = await api.get("/users/designations");
  return res.data as Designation[];
};
export const fetchRolesApi = async () => {
  const res = await api.get("/users/roles");
  return res.data as Role[];
};

export const fetchNotificationsApi = async () => {
  const res = await api.get("/notifications?limit=7");
  return res.data as NotificationResponse;
};

export const markAllNotificationAsRedApi = async () => {
  const res = await api.post("/notifications/mark-read");
  return res.status;
};

export const fetchUserNames = async (userIds: number[]) => {
  const params = new URLSearchParams();
  params.append(`userIds`, userIds.join(","));
  const res = await api.get("/users", { params });
  return res.data as UserProfile[];
};

export const fetchAllUsersApi = async () => {
  const res = await api.get("/users");
  return res.data as UserWithCompleteProfile[];
};
