export const fetchComments = (ideaId: number) => ({
  type: "FETCH_COMMENTS",
  payload: ideaId,
});

export const fetchIdeaDetails = (ideaId: number, isEditMode: boolean) => ({
  type: "FETCH_IDEA_DETAILS",
  payload: { ideaId, isEditMode },
});

export const fetchParticpantsDetails = (ideaId: number) => ({
  type: "FETCH_PARTCIPANTS_DETAILS",
  payload: ideaId,
});

export const fetchLikeStatus = (ideaId: number) => ({
  type: "FETCH_LIKE_STATUS",
  payload: ideaId,
});

export const postNewCommentEvent = (ideaId: number, content: string) => ({
  type: "COMMENT",
  payload: { ideaId, content },
});

export const toggleLikeEvent = (ideaId: number, liked: boolean) => ({
  type: "LIKE",
  payload: { ideaId, liked: liked },
});

export const updateStatusChange = (ideaId: number, statusCode: string) => ({
  type: "STATUS_CHANGE",
  payload: { ideaId, statusCode },
});
