import { PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import toast from "react-hot-toast";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { RootState } from "../../store";
import { CommentResponse, UserProfile } from "../../types/models";
import { fetchUserNames } from "../app/appApi";
import { hideLoader, showLoader } from "../app/appSlice";
import {
  addNewCommentsForIdeaApi,
  addNewLikeForIdeaApi,
  getAllCommentsForIdea,
} from "./ideaApi";
import {
  addRecipients,
  incrementCount,
  loadComments,
  postNewCommentFinal,
  postNewCommentInitial,
  updateCount,
} from "./ideaSlice";

dayjs.extend(relativeTime);

function* handlefetchCommentsSaga(action: PayloadAction<string>): Generator {
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
  action: PayloadAction<{ ideaId: string; content: string }>
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

function* handleNewLikeSaga(action: PayloadAction<string>): Generator {
  try {
    yield put(hideLoader());
    yield put(incrementCount("likes"));
    const recipients: number[] = yield select(
      (state: RootState) => state.idea.recipients
    );
    const ideaId = action.payload;
    yield call(addNewLikeForIdeaApi, ideaId, recipients);

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
}
