import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  id: number;
  ideaId: number;
  userName: string;
  text: string;
  createdAt: string;
}

interface IdeaState {
  comments: Comment[];
  recipients: number[];
}

const initialState: IdeaState = {
  comments: [],
  recipients: [],
};

const ideaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
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
    clearIdeaState: (state) => {
      state.comments = initialState.comments;
      state.recipients = initialState.recipients;
    },
  },
});

export const {
  addComment,
  loadComments,
  clearComments,
  addRecipients,
  clearRecipients,
  clearIdeaState,
} = ideaSlice.actions;
export default ideaSlice.reducer;
