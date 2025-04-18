import { IdeaDetailsReq } from "../../types/models";

export const fetchRegisterDropDownOptions = () => ({
  type: "FETCH_REGISTER_DROPDOWN_OPTIONS",
});
export const fetchIdeaDropDownOptions = () => ({
  type: "FETCH_IDEA_DROPDOWN_OPTIONS",
});
export const clearIdeaDropDownOptions = () => ({
  type: "CLEAR_IDEA_DROPDOWN_OPTIONS",
});
export const clearRegisterDropDownOptions = () => ({
  type: "CLEAR_REGISTER_DROPDOWN_OPTIONS",
});

export const requestRefreshAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN_REFRESH",
});

export const fetchNotifications = () => ({
  type: "FETCH_NOTIFICATIONS",
});

export const postNewIdea = (
  ideaDetails: IdeaDetailsReq,
  attachments: FormData
) => ({
  type: "SUBMIT_NEW_IDEA",
  payload: {
    ideaDetails,
    attachments,
  },
});
