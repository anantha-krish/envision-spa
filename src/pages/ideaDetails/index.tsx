import { ideaDetailsRoute } from "../../routes";
import { EditIdeaDetailsComponent } from "./EditIdeaDetailsComponent copy";
import { ImageCarousel } from "./ImageCarousel";
import { ViewIdeaDetailsPage } from "./ViewIdeaDetailsComponent";

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
          <div className="idea_detail_comments bg-amber-200 min-h-50">
            <div className="comment_toolBar"></div>
            <div className="comment_toolbox"></div>
            <div className="comment_list"></div>
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
