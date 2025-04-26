import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchIdeaStatusDistribution,
  fetchIdeaSubmissionRate,
  fetchTopContributors,
  fetchTopIdeas,
  fetchTrendingTags,
} from "../features/dashboard/dashboardAction";
import { RootState } from "../store";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
import { resetDashboardState } from "../features/dashboard/dashboardSlice";

const statusHexColorMap = {
  SUBMITTED: "#3B82F6", // blue-500
  UNDER_REVIEW: "#EAB308", // yellow-500
  WAITING_FOR_APPROVAL: "#F97316", // orange-500
  APPROVED: "#22C55E", // green-500
  REJECTED: "#EF4444", // red-500
  IN_DEVELOPMENT: "#6366F1", // indigo-500
  ON_HOLD: "#9CA3AF", // gray-400
  COMPLETED: "#10B981", // emerald-500
  ARCHIVED: "#94A3B8", // slate-400
  CANCELED: "#F43F5E", // rose-500
};

export const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTopContributors());
    dispatch(fetchIdeaStatusDistribution());
    dispatch(fetchIdeaSubmissionRate());
    dispatch(fetchTopIdeas());
    dispatch(fetchTrendingTags());
    return () => {
      dispatch(resetDashboardState());
    };
  }, [dispatch]);

  const dashboard = useSelector((state: RootState) => state.dashboard);
  const maxLikes = Math.max(...dashboard.topIdeas.map((idea) => idea.likes));
  const maxComments = Math.max(
    ...dashboard.topIdeas.map((idea) => idea.comments)
  );
  return (
    <>
      <div></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Submission Rate Line Chart */}
        <div className="p-4 rounded-2xl shadow bg-white dark:bg-gray-800 dark:text-white">
          <h2 className="text-lg font-semibold mb-4">Idea Submission Rate</h2>
          <ResponsiveContainer width="90%" height={250}>
            <LineChart
              width={350}
              height={250}
              data={dashboard.submissionRate ?? []}
            >
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                className="stroke-primary"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="p-4  bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Trending Tags</h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={dashboard.trendingTags}
                margin={{ top: 20, right: 50, left: 30, bottom: 20 }}
              >
                <XAxis type="number" allowDecimals={false} />
                <YAxis dataKey="tagName" type="category" width={100} />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="oklch(0.707 0.165 254.624)"
                  radius={[0, 6, 6, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="p-4 rounded-2xl shadow bg-white dark:bg-gray-800 dark:text-white">
          <h2 className="text-lg font-semibold mb-4">
            Idea Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart width={700} height={250}>
              <Pie
                data={dashboard.statusDistribution.map(
                  ({ statusName, count }) => ({
                    statusName: statusName.replace(/_/g, " "),
                    count,
                  })
                )}
                dataKey="count"
                nameKey="statusName"
                cx="60%" // push pie to the left
                cy="45%"
                outerRadius={80}
                label
              >
                {dashboard.statusDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      statusHexColorMap[
                        entry.statusName as keyof typeof statusHexColorMap
                      ]
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                content={({ payload }) => (
                  <div style={{ marginLeft: "20px" }}>
                    {payload?.map((entry, index) => (
                      <div
                        key={`item-${index}`}
                        style={{ marginLeft: 24, marginBottom: 2 }}
                      >
                        <span style={{ color: entry.color }}>⬤</span>{" "}
                        {entry.value}
                      </div>
                    ))}
                  </div>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Contributors Bar Chart */}
        <div className="p-4 bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Top Contributors</h2>

          <div className="overflow-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-sm uppercase bg-gray-100  dark:bg-gray-700 dark:text-gray-50">
                <tr>
                  <th className="px-4 py-2">Contributor</th>
                  <th className="px-4 py-2">Ideas</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.topContributors.map((contributor) => (
                  <tr
                    key={contributor.userId}
                    className=" dark:text-gray-50 border-b last:border-none"
                  >
                    <td className="px-4 py-2">{contributor.userFullName}</td>
                    <td className="px-4 py-2">{contributor.ideaCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Ideas Table */}
        <div className="p-4 bg-white  dark:bg-gray-800 dark:text-white rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">Top Ideas</h2>
          <div className="space-y-4">
            {dashboard.topIdeas.map((idea, index) => (
              <Link
                key={index}
                to={"/ideas/$ideaId/$mode"}
                params={{ ideaId: idea.ideaId.toString(), mode: "view" }}
              >
                <div className="p-4 py-2 bg-gray-50  dark:bg-gray-700 dark:text-white  rounded-xl hover:bg-gray-100 transition">
                  <div className="font-medium text-gray-800 dark:text-white   mb-1 truncate">
                    {idea.title}
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex-1">
                      <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-100 ">
                        <span>Likes: {idea.likes}</span>
                        <span className="w-4 mb-1">
                          <HandThumbUpIcon />
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-800  rounded">
                        <div
                          className="h-2 bg-blue-400 rounded"
                          style={{ width: `${(idea.likes / maxLikes) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1 text-gray-500  dark:text-gray-100">
                        <span>Comments: {idea.comments}</span>
                        <span>{idea.comments}</span>
                      </div>
                      <div className="h-2 bg-gray-200  dark:bg-gray-800 rounded">
                        <div
                          className="h-2 bg-emerald-400 rounded"
                          style={{
                            width: `${(idea.comments / maxComments) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
