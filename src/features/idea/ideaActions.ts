export const fetchComments = (ideaId: number) => ({
  type: "FETCH_COMMENTS",
  payload: ideaId,
});

export const postNewCommentEvent = (ideaId: number, content: string) => ({
  type: "COMMENT",
  payload: { ideaId, content },
});

export const postNewLikeEvent = (ideaId: number) => ({
  type: "LIKE",
  payload: ideaId,
});
