import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchIdeaStatusDistribution,
  fetchIdeaSubmissionRate,
  fetchTopContributors,
  fetchTopIdeas,
} from "../features/dashboard/dashboardAction";

export const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopContributors());
    dispatch(fetchIdeaStatusDistribution());
    dispatch(fetchIdeaSubmissionRate());
    dispatch(fetchTopIdeas());
  }, []);
  return <>Dashboard</>;
};
