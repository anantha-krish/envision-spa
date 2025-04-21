import { PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { RootState } from "../../store";
import {
  Approver,
  CommentResponse,
  IdeaDetail,
  LikeResponse,
  PocTeamMember,
  UserProfile,
} from "../../types/models";
import { fetchUserNames } from "../app/appApi";
import { hideLoader, navigateTo, showLoader } from "../app/appSlice";
import {
  addNewCommentsForIdeaApi,
  addNewLikeForIdeaApi,
  fetchApproverForIdea,
  fetchIdeaDetailsById,
  fetchLikeCountForIdeaApi,
  fetchLikeStatusForIdeaApi,
  fetchPocTeamForIdea,
  getAllCommentsForIdea,
} from "./ideaApi";
import {
  addRecipients,
  decrementCount,
  incrementCount,
  loadComments,
  loadIdeaDetailsState,
  postNewCommentFinal,
  postNewCommentInitial,
  setApprover,
  setManager,
  setPocTeamMembers,
  setPocTeamName,
  setSubmitters,
  updateCanEditStatus,
  updateCount,
  updateLikeStatus,
} from "./ideaSlice";
import { AxiosError, AxiosResponse } from "axios";

dayjs.extend(relativeTime);

function* handlefetchCommentsSaga(action: PayloadAction<number>): Generator {
  try {
    const comments: CommentResponse[] = yield call(
      getAllCommentsForIdea,
      action.payload
    );

    yield put(updateCount({ comments: comments.length }));

    const userIds = comments.map((cmt) => cmt.userId);
    yield put(addRecipients(userIds));
    const userProfiles = (yield call(fetchUserNames, userIds)) as UserProfile[];

    const mergedComments = comments.map((comment) => {
      const user = userProfiles.find(
        (profile) => profile.userId === comment.userId
      );
      return {
        userName: user
          ? [user.firstName, user.lastName].join(" ")
          : `User-${comment.userId}`,
        text: comment.content,
        id: comment.id,
        ideaId: comment.ideaId,
        createdAt: dayjs(comment.createdAt).fromNow(),
      };
    });
    yield put(loadComments(mergedComments));
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
}

function* handleAddNewCommentSaga(
  action: PayloadAction<{ ideaId: number; content: string }>
): Generator {
  try {
    yield put(hideLoader());
    const { ideaId, content } = action.payload;
    yield put(
      postNewCommentInitial({
        ideaId: +ideaId,
        id: Math.random(),
        text: content,
        //TODO aafter keeping profile name in app
        userName: "User",
        createdAt: dayjs(Date.now()).fromNow(),
      })
    );
    const recipients: number[] = yield select(
      (state: RootState) => state.idea.recipients
    );

    const comment: CommentResponse = yield call(
      addNewCommentsForIdeaApi,
      ideaId,
      content,
      recipients
    );

    const userProfiles = (yield call(fetchUserNames, [
      comment.userId,
    ])) as UserProfile[];
    const user = userProfiles.find(
      (profile) => profile.userId === comment.userId
    );
    const mergedComment = {
      userName: user
        ? [user.firstName, user.lastName].join(" ")
        : `User-${comment.userId}`,
      text: comment.content,
      id: comment.id,
      ideaId: comment.ideaId,
      createdAt: dayjs(comment.createdAt).fromNow(),
    };
    yield put(postNewCommentFinal(mergedComment));
    yield put(incrementCount("comments"));
    yield put(showLoader());
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
}

function* handleNewLikeSaga(
  action: PayloadAction<{ ideaId: number; liked: boolean }>
): Generator {
  try {
    const { ideaId, liked } = action.payload;
    yield put(hideLoader());
    yield put(updateLikeStatus(liked));
    yield put(liked ? incrementCount("likes") : decrementCount("likes"));

    const recipients: number[] = yield select(
      (state: RootState) => state.idea.recipients
    );
    const result: LikeResponse = yield call(
      addNewLikeForIdeaApi,
      ideaId,
      recipients
    );
    yield put(updateCount({ likes: result.totalCount }));
    yield put(showLoader());
  } catch (error: unknown) {
    if (error instanceof Error) {
      //     toast.error(error.message);
    }
  }
}

function* handleFetchParticipantsDetailsSaga(
  action: PayloadAction<number>
): Generator {
  try {
    const ideaId = action.payload;
    yield put(hideLoader());
    const approver: Approver = yield call(fetchApproverForIdea, ideaId);
    const pocTeamMembers: PocTeamMember[] = yield call(
      fetchPocTeamForIdea,
      ideaId
    );
    if (pocTeamMembers.length > 0) {
      yield put(setPocTeamName(pocTeamMembers[0].teamName));
    }
    const approverId = approver?.userId;
    const pocTeamMemberIds = pocTeamMembers?.map((item) => item.userId) ?? [];
    const submittersIds = yield select(
      (state: RootState) => state.idea.submittedBy
    );

    const managerId = yield select((state: RootState) => state.idea.managerId);
    const recipientsForIdea = [
      ...new Set([
        approverId,
        ...submittersIds,
        ...pocTeamMemberIds,
        managerId,
      ]),
    ];

    yield put(addRecipients(recipientsForIdea));

    const userProfiles: UserProfile[] = yield call(
      fetchUserNames,
      recipientsForIdea
    );
    const approverProfile = userProfiles.find(
      (user) => user.userId === approverId
    );
    yield put(setApprover(approverProfile ?? null));

    const manager = userProfiles.find((user) => user.userId === managerId);
    yield put(setManager(manager ?? null));

    const submitters = userProfiles.filter((user) =>
      submittersIds.includes(user.userId)
    );
    yield put(setSubmitters(submitters));

    const pocTeamMemberProfiles = userProfiles.filter((user) =>
      pocTeamMemberIds.includes(user.userId)
    );
    yield put(setPocTeamMembers(pocTeamMemberProfiles));
    yield put(showLoader());
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
}

function* handleFetchLikeStatusSaga(action: PayloadAction<number>): Generator {
  try {
    const ideaId = action.payload;
    yield put(hideLoader());
    const status: boolean = yield call(fetchLikeStatusForIdeaApi, ideaId);
    const count: number = yield call(fetchLikeCountForIdeaApi, ideaId);
    yield put(updateLikeStatus(status));
    yield put(updateCount({ likes: count }));
    yield put(showLoader());
  } catch (error: unknown) {
    if (error instanceof Error) {
      //     toast.error(error.message);
    }
  }
}

function* handleFetchIdeaDetailsSaga(
  action: PayloadAction<{ ideaId: number; isEditMode: boolean }>
): Generator {
  try {
    const { ideaId, isEditMode } = action.payload;
    const response: AxiosResponse<IdeaDetail> = yield call(
      fetchIdeaDetailsById,
      ideaId
    );

    yield put(loadIdeaDetailsState(response.data));

    const loggedInUserId = yield select(
      (state: RootState) => state.auth.userId
    );
    const submittersId = yield select(
      (state: RootState) => state.idea.submittedBy
    );
    const managerId = yield select((state: RootState) => state.idea.managerId);
    const canEdit = [...submittersId, managerId].includes(loggedInUserId);
    yield put(updateCanEditStatus(canEdit));
    if (isEditMode && ![...submittersId, managerId].includes(loggedInUserId)) {
      yield put(navigateTo("/permission-error"));
    }
    // yield put(addRecipients([loggedInUserId]));
    yield call(handleFetchParticipantsDetailsSaga, {
      type: "FETCH_PARTCIPANTS_DETAILS",
      payload: ideaId,
    });
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.status === 404) {
        yield put(navigateTo("/ideas/not-found"));
        return;
      }
    }
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
}

export default function* ideaSaga() {
  yield takeLatest("FETCH_COMMENTS", handlefetchCommentsSaga);
  yield takeLatest("COMMENT", handleAddNewCommentSaga);
  yield takeLatest("LIKE", handleNewLikeSaga);
  yield takeLatest("FETCH_LIKE_STATUS", handleFetchLikeStatusSaga);
  yield takeLatest("FETCH_IDEA_DETAILS", handleFetchIdeaDetailsSaga);
}
