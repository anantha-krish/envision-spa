import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IdeaSubmission,
  StatusDistribution,
  TopContributor,
  TopIdea,
  TrendingTag,
} from "../../types/models";

export interface DashboardState {
  topIdeas: TopIdea[];
  topContributors: TopContributor[];
  submissionRate: IdeaSubmission[] | null;
  statusDistribution: StatusDistribution[];
  trendingTags: TrendingTag[];
}

const initialState: DashboardState = {
  topIdeas: [],
  topContributors: [],
  submissionRate: null,
  statusDistribution: [],
  trendingTags: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTopIdeas: (state, action: PayloadAction<TopIdea[]>) => {
      state.topIdeas = action.payload;
    },
    setTopContributors: (state, action: PayloadAction<TopContributor[]>) => {
      state.topContributors = action.payload;
    },
    setTrendingTags: (state, action: PayloadAction<TrendingTag[]>) => {
      state.trendingTags = action.payload;
    },
    setIdeaSubmissionRate: (
      state,
      action: PayloadAction<IdeaSubmission[] | null>
    ) => {
      state.submissionRate = action.payload;
    },
    setIdeaStatusDistribution: (
      state,
      action: PayloadAction<StatusDistribution[]>
    ) => {
      state.statusDistribution = action.payload;
    },
  },
});

export const {
  setTopIdeas,
  setTopContributors,
  setIdeaSubmissionRate,
  setIdeaStatusDistribution,
  setTrendingTags,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
