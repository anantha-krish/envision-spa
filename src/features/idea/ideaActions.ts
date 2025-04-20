export const fetchComments = (ideaId: number) => ({
  type: "FETCH_COMMENTS",
  payload: ideaId,
});
