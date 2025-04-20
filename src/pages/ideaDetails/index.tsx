import { useEffect } from "react";
import { ideaDetailsRoute } from "../../routes";
import { CommentSection } from "./CommentSection";

import { EditIdeaDetailsComponent } from "./EditIdeaDetailsComponent";
import { ImageCarousel } from "./ImageCarousel";
import { ViewIdeaDetailsPage } from "./ViewIdeaDetailsComponent";
import { useDispatch, useSelector } from "react-redux";
import { addRecipients, clearIdeaState } from "../../features/idea/ideaSlice";
import { RootState } from "../../store";

import {
  PencilIcon as SolidPencilIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { fetchParticpantsDetails } from "../../features/idea/ideaActions";

export interface IdeaDetailBaseComponentProps {
  ideaId: string;
}

export interface IdeaDetailEditableComponentProps
  extends IdeaDetailBaseComponentProps {
  isEditMode: boolean;
}

export const IdeaDetailsPage: React.FC = () => {
  const { ideaId, mode } = ideaDetailsRoute.useParams();
  const isEditMode = mode == "edit";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canEdit = useSelector((state: RootState) => state.idea.canEdit);
  const loggedInUser: number = useSelector(
    (state: RootState) => state.auth.userId
  );
  const tags = useSelector((state: RootState) => state.idea.tags);
  const statusName = useSelector((state: RootState) => state.idea.statusName);
  const submittedBy = useSelector((state: RootState) => state.idea.submittedBy);
  const managerId = useSelector((state: RootState) => state.idea.managerId);

  useEffect(() => {
    dispatch(addRecipients([loggedInUser]));
    dispatch(fetchParticpantsDetails(+ideaId));
    return () => {
      //idea state cleanup
      dispatch(clearIdeaState());
    };
  }, [dispatch]);

  return (
    <div className="idea_detail_container flex w-full p-6">
      <div className="idea_left_box flex-2/3">
        <div className="flex flex-col">
          <div className="idea_detail_content bg-gray-700 min-h-56">
            {isEditMode ? (
              <EditIdeaDetailsComponent ideaId={ideaId} />
            ) : (
              <ViewIdeaDetailsPage ideaId={ideaId} />
            )}
          </div>
          <div className="idea_detail_files">
            <ImageCarousel isEditMode={isEditMode} ideaId={ideaId} />
          </div>
          <div className="idea_detail_comments">
            <CommentSection ideaId={ideaId} />
          </div>
        </div>
      </div>
      <div className="idea_right_box flex-1/3">
        <div className="flex flex-col items-start gap-4 pl-8">
          <div className="flex w-full justify-center">
            {canEdit && (
              <button
                className={clsx(
                  "btn btn-wide btn-primary btn-outline shadow-sm",
                  { "btn-active": isEditMode }
                )}
                onClick={() =>
                  navigate({
                    to: "/ideas/$ideaId/$mode",
                    params: {
                      ideaId: ideaId,
                      mode: isEditMode ? "view" : "edit",
                    },
                  })
                }
              >
                <span className="w-4">
                  {isEditMode ? <SolidPencilIcon /> : <EyeIcon />}
                </span>
                <span className="capitalize">{mode} Mode</span>
              </button>
            )}
          </div>
          <div className="tag_container">
            <h2 className="mb-2 font-semibold text-gray-600">Tags</h2>
            <div className="tags flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div className="badge bg-gray-300 badge-lg p-4">{tag}</div>
              ))}
            </div>
          </div>
          <div className="status_row">
            <h2 className="mb-2 font-semibold  text-gray-600">Status</h2>
            <div className="badge bg-gray-300 badge-lg p-4">{statusName}</div>
          </div>
          <div className="submittedby_block">
            <h2 className="mb-2 font-semibold  text-gray-600">Contributors</h2>
            <div className="tags flex flex-wrap space-x-2 gap-2">
              {submittedBy.map((id) => (
                <div className="avatar">
                  <div className="w-20 rounded-full ring ring-gray-500 dark:ring-offset-gray-700 ring-offset-base-100 ring-offset-2">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${id}`}
                      className="inline "
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="manager">
            <h2 className="mb-2 font-semibold  text-gray-600">Manager</h2>
            <div className="avatar">
              <div className="w-20 rounded-full ring ring-gray-500 dark:ring-offset-gray-700 ring-offset-base-100 ring-offset-2">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${managerId}`}
                  className="inline "
                />
              </div>
            </div>
          </div>
          <div className="approver"></div>
        </div>
      </div>
    </div>
  );
};
