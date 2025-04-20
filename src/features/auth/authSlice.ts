import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { decodeJwt } from "../../utils/tokenUtils";
import { Designation, Role, UserWithCompleteProfile } from "../../types/models";

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  role: string;
  userId: number;
  email?: string;
  firstName: string;
  lastName: string;
  roleCode: Role["roleCode"];
  designationCode: Designation["designationCode"];
  roleName?: string;
  designationName?: string;
  managerId: number | null;
}

const getInitialAuthState = (): AuthState => {
  const accessToken = sessionStorage.getItem("accessToken") ?? null;
  const decodedToken =
    (accessToken?.length ?? 0) > 0 ? decodeJwt(accessToken!) : null;
  return {
    accessToken,
    role: decodedToken?.role ?? "USER",
    isAuthenticated: !!accessToken,
    userId: decodedToken?.user_id ?? -1,
    firstName: "",
    lastName: "",
    roleCode: "",
    designationCode: "",
    email: "",
    roleName: "",
    designationName: "",
    managerId: null,
  };
};

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.role = decodeJwt(action.payload.accessToken)?.role ?? "user";
      state.userId = decodeJwt(action.payload.accessToken)?.user_id ?? -1;
      state.isAuthenticated = true;
      sessionStorage.setItem("accessToken", action.payload.accessToken);
    },
    fetchLoggedInUserProfileSuccess: (
      state,
      action: PayloadAction<UserWithCompleteProfile>
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.roleCode = action.payload.roleCode;
      state.designationCode = action.payload.designationCode;
      state.email = action.payload.email;
      state.roleName = action.payload.roleName;
      state.designationName = action.payload.designationName;
      state.managerId = action.payload.managerId ?? null;
    },
    logout: (state) => {
      sessionStorage.removeItem("accessToken");
      state.accessToken = "";
      state.role = "USER";
      state.userId = -1;
      state.isAuthenticated = false;
      state.firstName = initialState.firstName;
      state.lastName = initialState.lastName;
      state.roleCode = initialState.roleCode;
      state.designationCode = initialState.designationCode;
      state.email = initialState.email;
      state.roleName = initialState.roleName;
      state.designationName = initialState.designationName;
      state.managerId = initialState.managerId ?? null;
    },
  },
});

export const { loginSuccess, logout, fetchLoggedInUserProfileSuccess } =
  authSlice.actions;
export default authSlice.reducer;
