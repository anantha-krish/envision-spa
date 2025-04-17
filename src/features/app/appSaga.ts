// sagas.ts
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchDesignationsApi,
  fetchManagersApi,
  fetchRolesApi,
} from "./appApi";

import toast from "react-hot-toast";
import { Designation, Role, UserProfile } from "../../types/models";
import {
  clearRegisterPageDropDownOptions,
  fetchRegisterPageDropDownOptionsSuccess,
} from "./appSlice";

function* fetchRegisterPageDropdownOptionsSaga(): Generator<
  unknown,
  void,
  [Role[], Designation[], UserProfile[]]
> {
  try {
    const [roles, designations, managers] = yield all([
      call(fetchRolesApi),
      call(fetchDesignationsApi),
      call(fetchManagersApi),
    ]);

    yield put(
      fetchRegisterPageDropDownOptionsSuccess({ roles, designations, managers })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(clearRegisterPageDropDownOptions());
      toast.error(error.message);
    }
  }
}
function* clearRegisterPageDropdownOptionsSaga(): Generator<
  unknown,
  void,
  void
> {
  try {
    yield put(clearRegisterPageDropDownOptions());
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
}

export default function* appSaga() {
  yield takeLatest(
    "FETCH_REGISTER_DROPDOWN_OPTIONS",
    fetchRegisterPageDropdownOptionsSaga
  );
  yield takeLatest(
    "CLEAR_REGISTER_DROPDOWN_OPTIONS",
    clearRegisterPageDropdownOptionsSaga
  );
}
