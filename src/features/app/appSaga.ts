// sagas.ts
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchDesignationsApi,
  fetchManagersApi,
  fetchNotificationsApi,
  fetchRolesApi,
  fetchUserNames,
} from "./appApi";

import toast from "react-hot-toast";
import {
  Designation,
  NotificationResponse,
  Role,
  UserProfile,
} from "../../types/models";
import {
  clearRegisterPageDropDownOptions,
  fetchNotificationFailure,
  fetchNotificationSuccess,
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
function* fetchNotificationSaga() {
  try {
    const response = (yield call(
      fetchNotificationsApi
    )) as NotificationResponse;
    const { unreadCount, notifications } = response;
    let updateNotifications = notifications;

    if (notifications.length > 0) {
      const actorsArray = [
        ...new Set(notifications.map((item) => item.actorIds[0])),
      ];
      const profiles = (yield call(
        fetchUserNames,
        actorsArray
      )) as UserProfile[];
      const userMap = new Map(
        profiles.map((user) => [`USER-${user.userId}`, user.firstName])
      );
      updateNotifications = notifications.map((item) => {
        return { ...item, message: replacePlaceholders(item.message, userMap) };
      });
    }

    yield put(
      fetchNotificationSuccess({
        unreadCount,
        notifications: updateNotifications,
      })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      yield put(fetchNotificationFailure());
    }
  }
}
function replacePlaceholders(
  message: string,
  map: Map<string, string>
): string {
  return message.replace(/%USER-\d+%/g, (match) => {
    const key = match.replace(/%/g, ""); // remove `%`
    return map.get(key) || match; // fallback to original if not found
  });
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
  yield takeLatest("FETCH_NOTIFICATIONS", fetchNotificationSaga);
}
