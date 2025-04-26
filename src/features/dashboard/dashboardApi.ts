import api from "../../api/axiosInstance";
import {
  IdeaSubmissionResponse,
  StatusDistributionResponse,
  TopContributorsResponse,
  TopIdeasResponse,
  TrendingTagResponse,
} from "../../types/models";

const firstDayOfPreviousMonth = () => {
  const date = new Date(Date.now());
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().split("T")[0];
};
export const ideaStatsApi = {
  fetchTopIdeas: () =>
    api.get<TopIdeasResponse>("/ideas/stats/top-ideas?limit=3"),
  fetchIdeaStatusDistribution: () =>
    api.get<StatusDistributionResponse>("/ideas/stats/status-distribution"),
  fetchIdeaSubmissionRate: () =>
    api.get<IdeaSubmissionResponse>(
      `/ideas/stats/idea-submissions?startDate=${firstDayOfPreviousMonth()}`
    ),
  fetchTopContributors: () =>
    api.get<TopContributorsResponse>("/ideas/stats/top-contributors"),
  fetchTrendingTags: () =>
    api.get<TrendingTagResponse>(
      `/ideas/stats/trending-tags?startDate=${firstDayOfPreviousMonth()} `
    ),
};
