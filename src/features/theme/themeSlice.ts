// src/features/theme/themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const savedTheme = sessionStorage.getItem("theme") || "light";

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: savedTheme },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
      sessionStorage.setItem("theme", state.mode);
      //document.documentElement.setAttribute("data-theme", state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      sessionStorage.setItem("theme", action.payload);
      //document.documentElement.setAttribute("data-theme", action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
