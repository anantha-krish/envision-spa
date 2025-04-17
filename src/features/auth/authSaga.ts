import toast from "react-hot-toast";
import { call, put, takeLatest } from "redux-saga/effects";

import { AUTH_LOGIN_REQUEST, AUTH_REGISTER_REQUEST } from "./AuthActions";
import { loginAPI, refreshAccessTokenApi, registerAPI } from "./authApi";
import { loginSuccess, logout } from "./authSlice";
import { navigateTo } from "../app/appSlice";

type ActionWithPayload = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

function* handleLogin(action: ActionWithPayload): Generator {
  try {
    const response = yield call(loginAPI, action.payload);
    if (!response.accessToken) {
      throw new Error("Token missing");
    }
    yield put(loginSuccess(response));
    toast.success("Login successful!");
    yield put(navigateTo("/"));
  } catch (err) {
    toast.error("Login failed");
    console.error(err);
  }
}

function* handleRegister(action: ActionWithPayload): Generator {
  try {
    yield call(registerAPI, action.payload);
    toast.success("Registration successful!");
  } catch (err) {
    toast.error("Registration failed");
    console.log(err);
  }
}

function* refreshAccessTokenSaga(): Generator<
  unknown,
  void,
  { accessToken: string }
> {
  try {
    const response = yield call(refreshAccessTokenApi);
    yield put(loginSuccess(response));
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("Session expired. Please log in again.");
      yield put(logout());
      window.location.href = "/login";
    }
  }
}
export default function* authSaga() {
  yield takeLatest(AUTH_LOGIN_REQUEST, handleLogin);
  yield takeLatest(AUTH_REGISTER_REQUEST, handleRegister);
  yield takeLatest("REQUEST_ACCESS_TOKEN_REFRESH", refreshAccessTokenSaga);
}
