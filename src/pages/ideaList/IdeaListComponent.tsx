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

export const IdeaList = () => {
  const ideas = useSelector((state: RootState) => state.ideaList.ideas);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {ideas?.length > 0 ? (
        <>
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition"
            >
              <div className="card-body">
                <Link
                  to={"/ideas/$ideaId/$mode"}
                  params={{ ideaId: idea.id.toString(), mode: "view" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="card-title text-lg">{idea.title}</h2>
                    <StatusBadge
                      status={idea.statusName as Status}
                      className="text-xs"
                    />
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
                    <time className="text-xs">
                      {/* update format in redux */}
                      {new Date(idea.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-10 text-center text-gray-500 dark:text-gray-400">
          <img
            src="https://illustrations.popsy.co/gray/no-results.svg"
            alt="No Ideas Found"
            className="w-64 h-64 mb-4"
          />
          <p className="text-lg">No ideas found!</p>
        </div>
      )}
    </div>
  );
};
