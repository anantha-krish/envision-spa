import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  id: number;
  ideaId: number;
  userName: string;
  text: string;
  createdAt: string;
}

interface EngagementCount {
  likes: number;
  comments: number;
  views: number;
}
interface IdeaState {
  comments: Comment[];
  recipients: number[];
  count: EngagementCount;
}
const initialState: IdeaState = {
  comments: [],
  recipients: [],
  count: { likes: 0, comments: 0, views: 0 },
};

const ideaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {
    addRecipients: (state, action: PayloadAction<number[]>) => {
      state.recipients = [...new Set([...state.recipients, ...action.payload])];
    },
    clearRecipients: (state) => {
      state.recipients = [];
    },
    loadComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    clearComments: (state) => {
      state.comments = [];
    },
    postNewCommentInitial: (state, action: PayloadAction<Comment>) => {
      state.comments.unshift(action.payload);
    },
    postNewCommentFinal: (state, action: PayloadAction<Comment>) => {
      state.comments[0] = action.payload;
      state.comments.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    clearIdeaState: (state) => {
      state.comments = initialState.comments;
      state.recipients = initialState.recipients;
      state.count = initialState.count;
    },
    resetCounts: (state) => {
      state.count = initialState.count;
    },
    updateCount: (state, action: PayloadAction<Partial<EngagementCount>>) => {
      state.count = { ...state.count, ...action.payload };
    },
    incrementCount: (state, action: PayloadAction<keyof EngagementCount>) => {
      const field = action.payload;
      state.count[field] += 1;
    },
  },
});

export const {
  loadComments,
  clearComments,
  addRecipients,
  clearRecipients,
  clearIdeaState,
  postNewCommentInitial,
  postNewCommentFinal,
  resetCounts,
  updateCount,
  incrementCount,
} = ideaSlice.actions;
export default ideaSlice.reducer;
