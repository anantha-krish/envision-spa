import api from "../../api/axiosInstance";
import { IdeaFilterFormValues } from "../../pages/ideaList/IdeasFilterForm";
import { IdeaListApiResponse } from "../../types/models";

export const getAllIdeas = async (values: IdeaFilterFormValues) => {
  const res = await api.get(`/ideas`, { params: values });
  return res.data as IdeaListApiResponse[];
};
