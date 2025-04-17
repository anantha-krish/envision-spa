// src/features/theme/themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Designation, Role, UserProfile } from "../../types/models";

const savedTheme = sessionStorage.getItem("theme") || "light";
interface appState {
  theme: string;
  showSessionExpiryModal: boolean;
  activeRequests: number;
  unreadNotificationCount: number;
  dropdowns: {
    roles: Role[];
    designations: Designation[];
    managers: UserProfile[];
  };
}
const appSlice = createSlice({
  name: "app",

  initialState: {
    activeRequests: 0,
    unreadNotificationCount: 0,
    showSessionExpiryModal: false,
    theme: savedTheme,
    dropdowns: {
      roles: [],
      designations: [],
      managers: [],
    },
  } as appState,
  reducers: {
    requestStart: (state) => {
      state.activeRequests += 1;
    },
    setNotificationCount: (state, action) => {
      state.unreadNotificationCount = action.payload;
    },
    requestEnd: (state) => {
      state.activeRequests = Math.max(state.activeRequests - 1, 0);
    },
    showSessionExpiryModal: (state) => {
      state.showSessionExpiryModal = true;
    },
    hideSessionExpiryModal: (state) => {
      state.showSessionExpiryModal = false;
    },
    fetchRegisterPageDropDownOptionsSuccess: (state, action) => {
      state.dropdowns.roles = action.payload.roles;
      state.dropdowns.managers = action.payload.managers;
      state.dropdowns.designations = action.payload.designations;
    },
    clearRegisterPageDropDownOptions: (state) => {
      state.dropdowns = {
        roles: [],
        designations: [],
        managers: [],
      };
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      sessionStorage.setItem("theme", state.theme);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      sessionStorage.setItem("theme", action.payload);
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  fetchRegisterPageDropDownOptionsSuccess,
  clearRegisterPageDropDownOptions,
  requestStart,
  requestEnd,
  setNotificationCount,
  showSessionExpiryModal,
  hideSessionExpiryModal,
} = appSlice.actions;
export default appSlice.reducer;
