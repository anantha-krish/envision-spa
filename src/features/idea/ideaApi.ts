import { AxiosResponse } from "axios";
import api from "../../api/axiosInstance";
import {
  Approver,
  CommentResponse,
  IdeaDetail,
  IdeaDetailsReq,
  IdeaDetailsResponse,
  LikeResponse,
  PocTeamMember,
  S3File,
  Tag,
} from "../../types/models";

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

export const getAllCommentsForIdea = async (
  ideaId: number
): Promise<CommentResponse[]> => {
  const res = await api.get(`/engagement/comments/${ideaId}`);
  return res.data.comments as CommentResponse[];
};
export const addNewCommentsForIdeaApi = async (
  ideaId: number,
  content: string,
  recipients: number[]
): Promise<CommentResponse> => {
  const res = await api.post(`/engagement/comments/${ideaId}`, {
    content,
    recipients,
  });
  return res.data as CommentResponse;
};

export const addNewLikeForIdeaApi = async (
  ideaId: number,
  recipients: number[]
) => {
  const res = await api.post(`/engagement/likes/${ideaId}`, {
    recipients,
  });
  return res.data as LikeResponse;
};

export const fetchLikeStatusForIdeaApi = async (ideaId: number) => {
  const res = await api.get(`/engagement/likes/${ideaId}/status`);
  return res.data.liked as boolean;
};
export const fetchLikeCountForIdeaApi = async (ideaId: number) => {
  const res = await api.get(`/engagement/likes/${ideaId}`);
  return res.data.likes as number;
};

export const uploadNewAttachementsApi = async (
  ideaId: number,
  formData: FormData,
  recipients: number[],
  isEditMode: boolean
) => {
  const query = new URLSearchParams({ ideaId: ideaId.toString() });

  if (isEditMode) {
    query.append("edit", "true");
    query.append(
      "recipients",
      recipients.length > 0 ? recipients.join(",") : ""
    );
  }

  const res = await api.post(`/files/?${query.toString()}`, formData);
  return res.status;
};

export const getAllAttachementsApi = async (ideaId: number) => {
  const res = await api.get(`/files/${ideaId}`);
  return (res.data.files ?? []) as S3File[];
};

export const deleteAttachementsApi = async (keys: string[]) => {
  await Promise.all(keys.map((fileId) => api.delete(`/files/${fileId}`)));
};
export const fetchIdeaDetailsById = async (ideadId: number) => {
  const res = await api.get(`/ideas/${ideadId}`);
  return res as AxiosResponse<IdeaDetail>;
};

export const fetchPocTeamForIdea = async (ideaId: number) => {
  const res = await api.get(`/ideas/teams/poc-teams?ideaId=${ideaId}`);
  return res.data as PocTeamMember[];
};

export const fetchApproverForIdea = async (ideaId: number) => {
  const res = await api.get(`/ideas/approvers?ideaId=${ideaId}`);
  return res.data[0] as Approver;
};
