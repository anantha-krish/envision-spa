import { createAction } from "@reduxjs/toolkit";

export const fetchTopIdeas = createAction("FETCH_TOP_IDEAS");
export const fetchTopContributors = createAction("FETCH_TOP_CONTRIBUTORS");
export const fetchIdeaSubmissionRate = createAction("FETCH_IDEA_SUBMISSION");
export const fetchIdeaStatusDistribution = createAction(
  "FETCH_IDEA_STATUS_DISTRIBUTION"
);
export const fetchTrendingTags = createAction("FETCH_TRENDING_TAGS");
