import { useEffect } from "react";
import { ideaDetailsRoute } from "../../routes";
import { CommentSection } from "./CommentSection";

import { EditIdeaDetailsComponent } from "./EditIdeaDetailsComponent";
import { ImageCarousel } from "./ImageCarousel";
import { ViewIdeaDetailsPage } from "./ViewIdeaDetailsComponent";
import { useDispatch, useSelector } from "react-redux";
import { addRecipients, clearIdeaState } from "../../features/idea/ideaSlice";
import { RootState } from "../../store";

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
  const loggedInUser: number = useSelector(
    (state: RootState) => state.auth.userId
  );
  useEffect(() => {
    dispatch(addRecipients([loggedInUser]));
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
      <div className="idea_right_box flex-1/3 bg-cyan-600">
        <div className="flex flex-col">
          <div className="action_menu"></div>
          <div className="tags"></div>
          <div className="status_row"></div>
          <div className="submittedby_block"></div>
          <div className="manager"></div>
          <div className="approver"></div>
        </div>
      </div>
    </div>
  );
};
