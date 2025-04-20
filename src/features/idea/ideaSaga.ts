import { PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { RootState } from "../../store";
import { CommentResponse, LikeResponse, UserProfile } from "../../types/models";
import { fetchUserNames } from "../app/appApi";
import { hideLoader, showLoader } from "../app/appSlice";
import {
  addNewCommentsForIdeaApi,
  addNewLikeForIdeaApi,
  fetchLikeStatusForIdeaApi,
  getAllCommentsForIdea,
} from "./ideaApi";
import {
  addRecipients,
  decrementCount,
  incrementCount,
  loadComments,
  postNewCommentFinal,
  postNewCommentInitial,
  updateCount,
  updateLikeStatus,
} from "./ideaSlice";

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

function* handleFetchLikeStatusSaga(action: PayloadAction<number>): Generator {
  try {
    const ideaId = action.payload;
    yield put(hideLoader());
    const status: boolean = yield call(fetchLikeStatusForIdeaApi, ideaId);
    yield put(updateLikeStatus(status));
    yield put(showLoader());
  } catch (error: unknown) {
    if (error instanceof Error) {
      //     toast.error(error.message);
    }
  }
}

export default function* ideaSaga() {
  yield takeLatest("FETCH_COMMENTS", handlefetchCommentsSaga);
  yield takeLatest("COMMENT", handleAddNewCommentSaga);
  yield takeLatest("LIKE", handleNewLikeSaga);
  yield takeLatest("FETCH_LIKE_STATUS", handleFetchLikeStatusSaga);
}
