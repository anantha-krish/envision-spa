import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  fetchTopIdeas,
  fetchTopContributors,
  fetchIdeaSubmissionRate,
  fetchIdeaStatusDistribution,
  fetchTrendingTags,
} from "./dashboardAction";
import { ideaStatsApi } from "./dashboardApi";
import {
  setTopIdeas,
  setTopContributors,
  setIdeaSubmissionRate,
  setIdeaStatusDistribution,
  setTrendingTags,
} from "./dashboardSlice";
import {
  IdeaSubmissionResponse,
  StatusDistributionResponse,
  TopContributorsResponse,
  TopIdeasResponse,
  TrendingTagResponse,
  UserProfile,
} from "../../types/models";
import { AxiosResponse } from "axios";
import { fetchUserNames } from "../app/appApi";

function* handleFetchTopIdeas() {
  try {
    const response: AxiosResponse<TopIdeasResponse> = yield call(
      ideaStatsApi.fetchTopIdeas
    );
    yield put(setTopIdeas(response.data));
  } catch (error) {
    console.error(error);
  }
}

function* handleFetchTopContributors() {
  try {
    const response: AxiosResponse<TopContributorsResponse> = yield call(
      ideaStatsApi.fetchTopContributors
    );
    const contributorIds = response.data.map((user) => user.userId);
    const contributorProfiles: UserProfile[] = yield call(
      fetchUserNames,
      contributorIds
    );
    const contributorList = [...response.data].map(({ userId, ideaCount }) => {
      const contributor = contributorProfiles.find(
        (user) => user.userId == userId
      );
      return {
        ideaCount,
        userFullName: [
          contributor?.firstName ?? "",
          contributor?.lastName ?? "",
        ].join(" "),
        userId,
      };
    });

    yield put(setTopContributors(contributorList));
  } catch (error) {
    console.error(error);
  }
}

function* handleFetchIdeaSubmissionRate() {
  try {
    const response: AxiosResponse<IdeaSubmissionResponse> = yield call(
      ideaStatsApi.fetchIdeaSubmissionRate
    );
    yield put(setIdeaSubmissionRate(response.data));
  } catch (error) {
    console.error(error);
  }
}

function* handleFetchIdeaStatusDistribution() {
  try {
    const response: AxiosResponse<StatusDistributionResponse> = yield call(
      ideaStatsApi.fetchIdeaStatusDistribution
    );
    yield put(setIdeaStatusDistribution(response.data));
  } catch (error) {
    console.error(error);
  }
}

function* handleFetchTrendingTags() {
  try {
    const response: AxiosResponse<TrendingTagResponse> = yield call(
      ideaStatsApi.fetchTrendingTags
    );
    yield put(setTrendingTags(response.data));
  } catch (error) {
    console.error(error);
  }
}

export default function* dashboardSaga() {
  yield all([
    takeLatest(fetchTopIdeas.type, handleFetchTopIdeas),
    takeLatest(fetchTopContributors.type, handleFetchTopContributors),
    takeLatest(fetchIdeaSubmissionRate.type, handleFetchIdeaSubmissionRate),
    takeLatest(
      fetchIdeaStatusDistribution.type,
      handleFetchIdeaStatusDistribution
    ),
    takeLatest(fetchTrendingTags.type, handleFetchTrendingTags),
  ]);
}
