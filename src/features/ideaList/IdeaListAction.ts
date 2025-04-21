import { IdeaFilterFormValues } from "../../pages/ideaList/IdeasFilterForm";

export const searchIdeas = (values: IdeaFilterFormValues) => ({
  type: "SEARCH_IDEAS",
  payload: values,
});
