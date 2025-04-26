import { useSelector } from "react-redux";
import StatusBadge, { Status } from "../../components/StatusBadge";
import type { IdeaTag } from "../../types/models";
import {
  HandThumbUpIcon as OutlineLikeIcon,
  ChatBubbleBottomCenterTextIcon as OutlineCommentIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";
import { RootState } from "../../store";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const IdeaList = () => {
  const ideas = useSelector((state: RootState) => state.ideaList.ideas);
  const isLoading = useSelector(
    (state: RootState) => state.app.activeRequests > 0
  );
  return ideas?.length > 0 ? (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {ideas.map((idea) => (
        <div
          key={idea.id}
          className="card bg-base-100 shadow-md hover:shadow-lg transition"
        >
          <div className="card-body ">
            <Link
              to={"/ideas/$ideaId/$mode"}
              params={{ ideaId: idea.id.toString(), mode: "view" }}
            >
              <div className="flex flex-end mb-0.5">
                <sup>
                  <time className="opacity-80">
                    {/* update format in redux */}
                    {dayjs(idea.createdAt).fromNow()}
                  </time>
                </sup>
              </div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="card-title text-lg">{idea.title}</h2>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {idea.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-2">
                {idea.tags.map((tag: IdeaTag) => (
                  <span
                    key={tag.tagId}
                    className="badge py-1 badge-primary dark:bg-sky-900 dark:border-sky-900"
                  >
                    {tag.tagName}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <span className="w-7">
                      <OutlineLikeIcon />
                    </span>
                    {idea.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-7">
                      <OutlineCommentIcon fontSize={14} />
                    </span>
                    {idea.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-7">
                      <EyeIcon fontSize={14} />
                    </span>
                    {idea.views}
                  </span>
                </div>
                <StatusBadge
                  status={idea.statusName as Status}
                  className="text-xs"
                />
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  ) : isLoading ? (
    <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500 dark:text-gray-400">
      <span className="loading loading-spinner loading-lg mb-4"></span>
      <p className="text-lg">Loading ideas...</p>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center py-15 text-center text-gray-500 dark:text-gray-400">
      <div className="">
        <svg
          className="mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="154"
          height="161"
          viewBox="0 0 154 161"
          fill="none"
        >
          <path
            d="M0.0616455 84.4268C0.0616455 42.0213 34.435 7.83765 76.6507 7.83765C118.803 7.83765 153.224 42.0055 153.224 84.4268C153.224 102.42 147.026 118.974 136.622 132.034C122.282 150.138 100.367 161 76.6507 161C52.7759 161 30.9882 150.059 16.6633 132.034C6.25961 118.974 0.0616455 102.42 0.0616455 84.4268Z"
            className="fill-sky-100  dark:fill-gray-900"
          />
          <path
            d="M96.8189 0.632498L96.8189 0.632384L96.8083 0.630954C96.2034 0.549581 95.5931 0.5 94.9787 0.5H29.338C22.7112 0.5 17.3394 5.84455 17.3394 12.4473V142.715C17.3394 149.318 22.7112 154.662 29.338 154.662H123.948C130.591 154.662 135.946 149.317 135.946 142.715V38.9309C135.946 38.0244 135.847 37.1334 135.648 36.2586L135.648 36.2584C135.117 33.9309 133.874 31.7686 132.066 30.1333C132.066 30.1331 132.065 30.1329 132.065 30.1327L103.068 3.65203C103.068 3.6519 103.067 3.65177 103.067 3.65164C101.311 2.03526 99.1396 0.995552 96.8189 0.632498Z"
            fill="white"
            className="fill-white dark:fill-gray-800"
            stroke="#E5E7EB"
          />
          <ellipse
            cx="80.0618"
            cy="81"
            rx="28.0342"
            ry="28.0342"
            className="fill-sky-100 dark:fill-gray-700"
          />
          <path
            d="M99.2393 61.3061L99.2391 61.3058C88.498 50.5808 71.1092 50.5804 60.3835 61.3061C49.6423 72.0316 49.6422 89.4361 60.3832 100.162C71.109 110.903 88.4982 110.903 99.2393 100.162C109.965 89.4363 109.965 72.0317 99.2393 61.3061ZM105.863 54.6832C120.249 69.0695 120.249 92.3985 105.863 106.785C91.4605 121.171 68.1468 121.171 53.7446 106.785C39.3582 92.3987 39.3582 69.0693 53.7446 54.683C68.1468 40.2965 91.4605 40.2966 105.863 54.6832Z"
            stroke="#E5E7EB"
          />
          <path
            d="M110.782 119.267L102.016 110.492C104.888 108.267 107.476 105.651 109.564 102.955L118.329 111.729L110.782 119.267Z"
            stroke="#E5E7EB"
          />
          <path
            d="M139.122 125.781L139.122 125.78L123.313 109.988C123.313 109.987 123.313 109.987 123.312 109.986C121.996 108.653 119.849 108.657 118.521 109.985L118.871 110.335L118.521 109.985L109.047 119.459C107.731 120.775 107.735 122.918 109.044 124.247L109.047 124.249L124.858 140.06C128.789 143.992 135.191 143.992 139.122 140.06C143.069 136.113 143.069 129.728 139.122 125.781Z"
            className="fill-sky-600"
          />
          <path
            d="M83.185 87.2285C82.5387 87.2285 82.0027 86.6926 82.0027 86.0305C82.0027 83.3821 77.9987 83.3821 77.9987 86.0305C77.9987 86.6926 77.4627 87.2285 76.8006 87.2285C76.1543 87.2285 75.6183 86.6926 75.6183 86.0305C75.6183 80.2294 84.3831 80.2451 84.3831 86.0305C84.3831 86.6926 83.8471 87.2285 83.185 87.2285Z"
            className="fill-sky-600"
          />
          <path
            d="M93.3528 77.0926H88.403C87.7409 77.0926 87.2049 76.5567 87.2049 75.8946C87.2049 75.2483 87.7409 74.7123 88.403 74.7123H93.3528C94.0149 74.7123 94.5509 75.2483 94.5509 75.8946C94.5509 76.5567 94.0149 77.0926 93.3528 77.0926Z"
            className="fill-sky-600"
          />
          <path
            d="M71.5987 77.0925H66.6488C65.9867 77.0925 65.4507 76.5565 65.4507 75.8945C65.4507 75.2481 65.9867 74.7122 66.6488 74.7122H71.5987C72.245 74.7122 72.781 75.2481 72.781 75.8945C72.781 76.5565 72.245 77.0925 71.5987 77.0925Z"
            className="fill-sky-600"
          />
          <rect
            x="38.3522"
            y="21.5128"
            width="41.0256"
            height="2.73504"
            rx="1.36752"
            className="fill-sky-600"
          />
          <rect
            x="38.3522"
            y="133.65"
            width="54.7009"
            height="5.47009"
            rx="2.73504"
            className="fill-sky-700"
          />
          <rect
            x="38.3522"
            y="29.7179"
            width="13.6752"
            height="2.73504"
            rx="1.36752"
            className="fill-sky-600"
          />
          <circle
            cx="56.13"
            cy="31.0854"
            r="1.36752"
            className="fill-sky-600"
          />
          <circle
            cx="61.6001"
            cy="31.0854"
            r="1.36752"
            className="fill-sky-600"
          />
          <circle
            cx="67.0702"
            cy="31.0854"
            r="1.36752"
            className="fill-sky-600"
          />
        </svg>
        <p className="text-lg">There’s no such idea available</p>
        <p> Try changing your filters to see more ideas</p>
      </div>
    </div>
  );
};
