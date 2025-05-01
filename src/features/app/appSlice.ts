import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Designation,
  Role,
  Tag,
  UserProfile,
  UserWithCompleteProfile,
} from "../../types/models";
import { Notification } from "../../types/models";
import { EnvisionRoutePaths } from "../../types/router";

const savedTheme = sessionStorage.getItem("theme") || "light";
interface appState {
  theme: string;
  hideLoader: boolean;
  lazyLoader: boolean;
  activeRequests: number;
  navigationTarget: string | null;
  notifications: Notification[];
  sessionCountdown: number;
  showSessionExpiryModal: boolean;
  sessionExpiryTime: number | null;
  unreadNotificationCount: number;
  dropdowns: {
    roles: Role[];
    designations: Designation[];
    managers: UserProfile[];
    users: UserWithCompleteProfile[];
    tags: Tag[];
  };
}
const appSlice = createSlice({
  name: "app",

  initialState: {
    hideLoader: false,
    lazyLoader: false,
    activeRequests: 0,
    unreadNotificationCount: 0,
    notifications: [],
    sessionCountdown: 0,
    navigationTarget: null,
    showSessionExpiryModal: false,
    sessionExpiryTime: null,
    theme: savedTheme,
    dropdowns: {
      roles: [],
      designations: [],
      managers: [],
      users: [],
      tags: [],
    },
  } as appState,
  reducers: {
    requestStart: (state) => {
      state.activeRequests += 1;
    },
    hideLoader: (state) => {
      state.hideLoader = true;
      state.lazyLoader = true;
    },
    showLoader: (state) => {
      state.hideLoader = false;
      state.lazyLoader = false;
    },
    navigateTo: (state, action: PayloadAction<EnvisionRoutePaths>) => {
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
    fetchIdeaPageDropDownOptionsSuccess: (state, action) => {
      state.dropdowns.managers = action.payload.managers;
      state.dropdowns.users = action.payload.users;
      state.dropdowns.tags = action.payload.tags;
    },
    addNewTagOnSuccess: (state, action) => {
      state.dropdowns.tags = [...state.dropdowns.tags, action.payload];
    },
    updateTagsOnSuccess: (state, action: PayloadAction<Tag[]>) => {
      state.dropdowns.tags = action.payload;
    },
    clearIdeaPageDropDownOptions: (state) => {
      state.dropdowns.managers = [];
      state.dropdowns.users = [];
      state.dropdowns.tags = [];
    },
    clearRegisterPageDropDownOptions: (state) => {
      state.dropdowns.roles = [];
      state.dropdowns.managers = [];
      state.dropdowns.designations = [];
    },
    fetchNotificationSuccess: (state, action) => {
      state.notifications = action.payload.notifications;
      //  state.unreadNotificationCount = action.payload.unreadCount;
    },
    markAllNotificationAsRead: (state) => {
      state.notifications = state.notifications.map((item) => ({
        ...item,
        isRead: true,
      }));
      state.unreadNotificationCount = 0;
    },
    fetchNotificationFailure: (state) => {
      state.notifications = [];
      state.unreadNotificationCount = 0;
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
  fetchIdeaPageDropDownOptionsSuccess,
  clearRegisterPageDropDownOptions,
  clearIdeaPageDropDownOptions,
  requestStart,
  requestEnd,
  setNotificationCount,
  clearSessionExpiryData,
  setSessionExpiryTime,
  updateSessionCountdown,
  showSessionExpiryModal,
  navigateTo,
  clearNavigationTarget,
  fetchNotificationFailure,
  fetchNotificationSuccess,
  addNewTagOnSuccess,
  markAllNotificationAsRead,
  hideLoader,
  updateTagsOnSuccess,
  showLoader,
} = appSlice.actions;
export default appSlice.reducer;
