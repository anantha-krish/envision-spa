import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setTopIdeas: () => {},
  },
});

export const { setTopIdeas } = dashboard.actions;
export default dashboard.reducer;
