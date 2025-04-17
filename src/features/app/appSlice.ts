// src/features/theme/themeSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Designation, Role, UserProfile } from "../../types/models";

const savedTheme = sessionStorage.getItem("theme") || "light";
interface appState {
  theme: string;
  activeRequests: number;
  navigationTarget: string | null;
  sessionCountdown: number;
  showSessionExpiryModal: boolean;
  sessionExpiryTime: number | null;
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
    sessionCountdown: 0,
    navigationTarget: null,
    showSessionExpiryModal: false,
    sessionExpiryTime: null,
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
    navigateTo: (state, action) => {
      state.navigationTarget = action.payload;
    },
    clearNavigationTarget: (state) => {
      state.navigationTarget = null;
    },
    setNotificationCount: (state, action) => {
      state.unreadNotificationCount = action.payload;
    },
    requestEnd: (state) => {
      state.activeRequests = Math.max(state.activeRequests - 1, 0);
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
    setSessionExpiryTime(state, action) {
      state.sessionExpiryTime = action.payload;
    },
    clearSessionExpiryData(state) {
      state.sessionExpiryTime = null;
      state.sessionCountdown = 0;
      state.showSessionExpiryModal = false;
    },
    showSessionExpiryModal(state) {
      state.showSessionExpiryModal = true;
    },
    updateSessionCountdown(state, action) {
      state.sessionCountdown = action.payload;
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
  clearSessionExpiryData,
  setSessionExpiryTime,
  updateSessionCountdown,
  showSessionExpiryModal,
  navigateTo,
  clearNavigationTarget,
} = appSlice.actions;
export default appSlice.reducer;
