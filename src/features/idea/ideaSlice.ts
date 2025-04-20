import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IdeaDetail, UserProfile } from "../../types/models";
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
interface Participants {
  approver: UserProfile | null;
  submitters: UserProfile[];
  manager: UserProfile | null;
  pocTeamMembers: UserProfile[];
  pocTeamName: string;
}
interface IdeaState extends EngagementCount, IdeaDetail, Participants {
  commentList: Comment[];
  recipients: number[];
  isLiked: boolean;
  canEdit: boolean;
}

const initialState: IdeaState = {
  createdAt: "",
  description: "",
  id: -1,
  likes: 0,
  comments: 0,
  views: 0,
  submittedBy: [],
  managerId: null,
  summary: "",
  tags: [],
  statusName: "",
  title: "",
  updatedAt: "",
  commentList: [],
  recipients: [],
  isLiked: false,
  canEdit: false,
  approver: null,
  submitters: [],
  manager: null,
  pocTeamMembers: [],
  pocTeamName: "",
};

const ideaSlice = createSlice({
  name: "idea",
  initialState,
  reducers: {
    addRecipients: (state, action: PayloadAction<number[]>) => {
      state.recipients = [...new Set([...state.recipients, ...action.payload])];
    },
    updateLikeStatus: (state, action: PayloadAction<boolean>) => {
      state.isLiked = action.payload;
    },
    updateCanEditStatus: (state, action: PayloadAction<boolean>) => {
      state.canEdit = action.payload;
    },
    toggleLikeStatus: (state) => {
      state.isLiked = !state.isLiked;
    },
    resetLikeStatus: (state) => {
      state.isLiked = initialState.isLiked;
    },
    resetCanEditStatus: (state) => {
      state.canEdit = initialState.canEdit;
    },
    clearRecipients: (state) => {
      state.recipients = [];
    },
    loadComments: (state, action: PayloadAction<Comment[]>) => {
      state.commentList = action.payload;
    },
    clearComments: (state) => {
      state.commentList = [];
    },
    postNewCommentInitial: (state, action: PayloadAction<Comment>) => {
      state.commentList.unshift(action.payload);
    },
    postNewCommentFinal: (state, action: PayloadAction<Comment>) => {
      state.commentList[0] = action.payload;
    },
    loadIdeaDetailsState: (state, action: PayloadAction<IdeaDetail>) => {
      state.id = action.payload.id;
      state.createdAt = action.payload.createdAt;
      state.description = action.payload.description;
      state.likes = action.payload.likes;
      state.comments = action.payload.comments;
      state.views = action.payload.views;
      state.submittedBy = action.payload.submittedBy;
      state.managerId = action.payload.managerId;
      state.summary = action.payload.summary;
      state.tags = action.payload.tags;
      state.statusName = action.payload.statusName;
      state.title = action.payload.title;
      state.updatedAt = action.payload.updatedAt;
    },
    clearIdeaState: (state) => {
      state.id = initialState.id;
      state.createdAt = initialState.createdAt;
      state.description = initialState.description;
      state.likes = initialState.likes;
      state.comments = initialState.comments;
      state.views = initialState.views;
      state.submittedBy = initialState.submittedBy;
      state.managerId = initialState.managerId;
      state.summary = initialState.summary;
      state.tags = initialState.tags;
      state.statusName = initialState.statusName;
      state.title = initialState.title;
      state.updatedAt = initialState.updatedAt;
      state.commentList = initialState.commentList;
      state.recipients = initialState.recipients;
      state.isLiked = initialState.isLiked;
      state.canEdit = initialState.canEdit;
      state.approver = initialState.approver;
      state.submitters = initialState.submitters;
      state.manager = initialState.manager;
      state.pocTeamName = initialState.pocTeamName;
    },
    resetCounts: (state) => {
      state.likes = initialState.likes;
      state.comments = initialState.comments;
      state.views = initialState.views;
    },
    updateCount: (state, action: PayloadAction<Partial<EngagementCount>>) => {
      state.likes = action.payload.likes ?? state.likes;
      state.comments = action.payload.comments ?? state.comments;
      state.views = action.payload.views ?? state.views;
    },
    incrementCount: (state, action: PayloadAction<keyof EngagementCount>) => {
      const field = action.payload;
      state[field] = Number(state[field]) + 1;
    },
    decrementCount: (state, action: PayloadAction<keyof EngagementCount>) => {
      const field = action.payload;
      if (state[field] > 0) {
        state[field] = Number(state[field]) - 1;
      }
    },
    setApprover: (state, action: PayloadAction<UserProfile | null>) => {
      state.approver = action.payload;
    },
    setSubmitters: (state, action: PayloadAction<UserProfile[]>) => {
      state.submitters = action.payload;
    },
    setManager: (state, action: PayloadAction<UserProfile | null>) => {
      state.manager = action.payload;
    },
    setPocTeamMembers: (state, action: PayloadAction<UserProfile[]>) => {
      state.pocTeamMembers = action.payload;
    },
    setPocTeamName: (state, action: PayloadAction<string>) => {
      state.pocTeamName = action.payload;
    },
    clearAllParticpants: (state) => {
      state.approver = null;
      state.submitters = [];
      state.manager = null;
      state.pocTeamMembers = [];
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
  decrementCount,
  updateLikeStatus,
  loadIdeaDetailsState,
  resetLikeStatus,
  toggleLikeStatus,
  resetCanEditStatus,
  updateCanEditStatus,
  clearAllParticpants,
  setApprover,
  setManager,
  setPocTeamMembers,
  setSubmitters,
  setPocTeamName,
} = ideaSlice.actions;
export default ideaSlice.reducer;
