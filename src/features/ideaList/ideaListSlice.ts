import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IdeaListApiResponse, IdeaListItem } from "../../types/models";

interface IdeaListState {
  ideas: IdeaListItem[];
  totalCount: number;
}

const initialState: IdeaListState = {
  ideas: [],
  totalCount: 0,
};

const ideaListSlice = createSlice({
  name: "ideaList",
  initialState,
  reducers: {
    setIdeaList: (state, action: PayloadAction<IdeaListApiResponse>) => {
      state.ideas = action.payload.ideas;
      state.totalCount = action.payload.totalCount;
    },
    clearIdeaList: (state) => {
      state.ideas = initialState.ideas;
    },
  },
});

export const { setIdeaList, clearIdeaList } = ideaListSlice.actions;
export default ideaListSlice.reducer;
