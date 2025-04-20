import { all } from "redux-saga/effects";
import authSaga from "./features/auth/authSaga";
import appSaga from "./features/app/appSaga";
import ideaSaga from "./features/idea/ideaSaga";

export default function* rootSaga() {
  yield all([authSaga(), appSaga(), ideaSaga()]);
}
