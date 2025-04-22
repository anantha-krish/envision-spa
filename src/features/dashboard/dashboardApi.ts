import api from "../../api/axiosInstance";
import {
  IdeaSubmissionResponse,
  StatusDistributionResponse,
  TopContributorsResponse,
  TopIdeasResponse,
  TrendingTagResponse,
} from "../../types/models";

export const ideaStatsApi = {
  fetchTopIdeas: () =>
    api.get<TopIdeasResponse>("/ideas/stats/top-ideas?limit=3"),
  fetchIdeaStatusDistribution: () =>
    api.get<StatusDistributionResponse>("/ideas/stats/status-distribution"),
  fetchIdeaSubmissionRate: () =>
    api.get<IdeaSubmissionResponse>("/ideas/stats/idea-submissions"),
  fetchTopContributors: () =>
    api.get<TopContributorsResponse>("/ideas/stats/top-contributors"),
  fetchTrendingTags: () =>
    api.get<TrendingTagResponse>("/ideas/stats/trending-tags"),
};
