// sagas.ts
import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchAllUsersApi,
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
  Tag,
  UserProfile,
  UserWithCompleteProfile,
} from "../../types/models";
import {
  clearIdeaPageDropDownOptions,
  clearRegisterPageDropDownOptions,
  fetchIdeaPageDropDownOptionsSuccess,
  fetchNotificationFailure,
  fetchNotificationSuccess,
  fetchRegisterPageDropDownOptionsSuccess,
} from "./appSlice";
import { fetchAllTagsApi } from "../idea/ideaApi";

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

function* fetchIdeaPageDropdownOptionsSaga(): Generator<
  unknown,
  void,
  [UserProfile[], UserWithCompleteProfile[], Tag[]]
> {
  try {
    const [managers, users, tags] = yield all([
      call(fetchManagersApi),
      call(fetchAllUsersApi),
      call(fetchAllTagsApi),
    ]);
    yield put(fetchIdeaPageDropDownOptionsSuccess({ managers, users, tags }));
  } catch (error: unknown) {
    if (error instanceof Error) {
      yield put(clearIdeaPageDropDownOptions());
      toast.error(error.message);
    }
  }
}

function* clearIdeaPageDropdownOptionsSaga(): Generator<unknown, void, void> {
  try {
    yield put(clearIdeaPageDropDownOptions());
  } catch (error: unknown) {
    if (error instanceof Error) {
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
  yield takeLatest(
    "FETCH_IDEA_DROPDOWN_OPTIONS",
    fetchIdeaPageDropdownOptionsSaga
  );
  yield takeLatest(
    "CLEAR_IDEA_DROPDOWN_OPTIONS",
    clearIdeaPageDropdownOptionsSaga
  );
  yield takeLatest("FETCH_NOTIFICATIONS", fetchNotificationSaga);
}
