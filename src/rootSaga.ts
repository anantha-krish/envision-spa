import { all } from "redux-saga/effects";
import authSaga from "./features/auth/authSaga";
import appSaga from "./features/app/appSaga";

export default function* rootSaga() {
  yield all([authSaga(), appSaga()]);
}
