import { createSlice } from "@reduxjs/toolkit";
import { IdeaItem } from "../../types/models";

interface IdeaListState {
  ideas: IdeaItem[];
}

const initialState: IdeaListState = {
  ideas: [],
};

const ideaListSlice = createSlice({
  name: "ideaList",
  initialState,
  reducers: {
    setIdeaList: () => {},
  },
});

export const { setIdeaList } = ideaListSlice.actions;
export default ideaListSlice.reducer;
