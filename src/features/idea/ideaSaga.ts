import { getAllCommentsForIdea } from "./ideaApi";
import { call, put, takeLatest } from "redux-saga/effects";
import { CommentResponse, UserProfile } from "../../types/models";
import { addRecipients, loadComments } from "./ideaSlice";
import { fetchUserNames } from "../app/appApi";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { PayloadAction } from "@reduxjs/toolkit";
dayjs.extend(relativeTime);

function* handlefetchCommentsSaga(action: PayloadAction<string>): Generator {
  try {
    const comments: CommentResponse[] = yield call(
      getAllCommentsForIdea,
      action.payload
    );

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

export default function* ideaSaga() {
  yield takeLatest("FETCH_COMMENTS", handlefetchCommentsSaga);
}
