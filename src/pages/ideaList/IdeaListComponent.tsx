import StatusBadge, { Status } from "../../components/StatusBadge";
import type { IdeaTag } from "../../types/models";
import {
  HandThumbUpIcon as OutlineLikeIcon,
  ChatBubbleBottomCenterTextIcon as OutlineCommentIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon } from "@heroicons/react/24/solid";

export const IdeaList = () => {
  const ideas = [
    {
      id: 7,
      title: "CryptoCover — Insurance Solutions for Cryptocurrency Wallets",
      summary:
        " A decentralized insurance platform protecting crypto wallets against hacks and theft.",
      statusName: "SUBMITTED",
      likes: 3,
      comments: 3,
      views: 18,
      createdAt: "2025-04-19T06:40:58.832Z",
      tags: [
        {
          tagId: 13,
          tagName: "Blockchain",
        },
        {
          tagId: 14,
          tagName: "Cryptocurrency",
        },
        {
          tagId: 15,
          tagName: "Security",
        },
      ],
    },
    {
      id: 15,
      title:
        "StockPulse — Real-Time Sentiment Analytics for Stock Market Traders",
      summary:
        "Uses AI to analyze news, tweets, and reports for stock sentiment insights.",
      statusName: "SUBMITTED",
      likes: 2,
      comments: 3,
      views: 42,
      createdAt: "2025-04-19T07:19:27.562Z",
      tags: [
        {
          tagId: 30,
          tagName: "Stock Trading",
        },
        {
          tagId: 11,
          tagName: "AI",
        },
        {
          tagId: 31,
          tagName: "Analytics",
        },
        {
          tagId: 32,
          tagName: "Investment Tools",
        },
      ],
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {ideas.map((idea) => (
        <div
          key={idea.id}
          className="card bg-base-100 shadow-md hover:shadow-lg transition"
        >
          <div className="card-body">
            <div className="flex items-center justify-between mb-2">
              <h2 className="card-title text-lg">{idea.title}</h2>
              <StatusBadge status={idea.statusName as Status} />
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {idea.summary}
            </p>

            <div className="flex flex-wrap gap-1 mb-2">
              {idea.tags.map((tag: IdeaTag) => (
                <span key={tag.tagId} className="badge badge-outline">
                  {tag.tagName}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <OutlineLikeIcon fontSize={14} />
                  {idea.likes}
                </span>
                <span className="flex items-center gap-1">
                  <OutlineCommentIcon fontSize={14} />
                  {idea.comments}
                </span>
                <span className="flex items-center gap-1">
                  <EyeIcon fontSize={14} />
                  {idea.views}
                </span>
              </div>
              <time className="text-xs">
                {/* update format in redux */}
                {new Date(idea.createdAt).toLocaleDateString()}
              </time>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
