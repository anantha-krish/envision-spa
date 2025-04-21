import api from "../../api/axiosInstance";
import { IdeaFilterFormValues } from "../../pages/ideaList/IdeasFilterForm";
import { IdeaListApiResponse } from "../../types/models";

export const getAllIdeas = async (values: IdeaFilterFormValues) => {
  const tags = values.tags.length > 0 ? values.tags.join(",") : "";
  const res = await api.get(`/ideas`, { params: { ...values, tags } });
  return res.data as IdeaListApiResponse[];
};
