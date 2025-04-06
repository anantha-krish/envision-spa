import { call, put, takeLatest } from "redux-saga/effects";
import toast from "react-hot-toast";
import { AUTH_LOGIN_REQUEST, AUTH_REGISTER_REQUEST } from "./AuthActions";
import { loginAPI, registerAPI } from "./authApi";
import { loginSuccess } from "./authSlice";

type ActionWithPayload = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
};

function* handleLogin(action: ActionWithPayload): Generator {
  try {
    const response = yield call(loginAPI, action.payload);
    yield put(loginSuccess(response));
    toast.success("Login successful!");
  } catch (err) {
    toast.error("Login failed ");
    console.log(err);
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

export default function* authSaga() {
  yield takeLatest(AUTH_LOGIN_REQUEST, handleLogin);
  yield takeLatest(AUTH_REGISTER_REQUEST, handleRegister);
}
