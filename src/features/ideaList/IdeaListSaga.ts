import { call, put, takeLatest } from "redux-saga/effects";
import { getAllIdeas } from "./IdeaListAPI";
import { PayloadAction } from "@reduxjs/toolkit";
import { IdeaFilterFormValues } from "../../pages/ideaList/IdeasFilterForm";
import { setIdeaList } from "./ideaListSlice";
import toast from "react-hot-toast";

function* searchIdeaListSaga(
  action: PayloadAction<IdeaFilterFormValues>
): Generator {
  try {
    const ideas = yield call(getAllIdeas, action.payload);
    yield put(setIdeaList(ideas));
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("Unable to find Ideas");
    }
  }
}

export default function* ideaListSaga() {
  yield takeLatest("SEARCH_IDEAS", searchIdeaListSaga);
}
