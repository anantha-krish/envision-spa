import api from "../../api/axiosInstance";
import {
  Designation,
  IdeaDetailsReq,
  IdeaDetailsResponse,
  NotificationResponse,
  Role,
  Tag,
  UserProfile,
  UserWithCompleteProfiles,
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
  const res = await api.get("/notifications?limit=5");
  return res.data as NotificationResponse;
};

export const markAllNotificationAsRedApi = async () => {
  const res = await api.post("/notifications/mark-read");
  return res.status;
};

export const fetchUserNames = async (userIds: number[]) => {
  const params = new URLSearchParams();

  userIds.forEach((value) => {
    params.append(`userIds`, value.toString());
  });
  const res = await api.get("/users", { params });
  return res.data as UserProfile[];
};

export const fetchAllUsersApi = async () => {
  const res = await api.get("/users");
  return res.data as UserWithCompleteProfiles[];
};

export const fetchAllTagsApi = async () => {
  const res = await api.get("/ideas/tags");
  return res.data as Tag[];
};

export const createNewTagApi = async (tagName: string) => {
  const res = await api.post("/ideas/tags", { tagName });
  return res.data as Tag;
};

export const submitNewIdeaApi = async (ideaDetails: IdeaDetailsReq) => {
  const res = await api.post("/ideas", ideaDetails);
  return { status: res.status, data: res.data as IdeaDetailsResponse };
};

export const uploadNewAttachementsApi = async (
  ideaId: number,
  formData: FormData
) => {
  const res = await api.post(`/files/?ideaId=${ideaId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.status;
};
