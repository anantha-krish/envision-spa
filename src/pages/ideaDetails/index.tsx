import { ideaDetailsRoute } from "../../routes";
import { EditIdeaDetailsComponent } from "./EditIdeaDetailsComponent copy";
import { ViewIdeaDetailsPage } from "./ViewIdeaDetailsComponent";

export interface IdeaDetailCommonComponentProps {
  ideaId: string;
}

export const IdeaDetailsPage: React.FC = () => {
  const { ideaId, mode } = ideaDetailsRoute.useParams();
  const isEditMode = mode == "edit";
  return (
    <div>
      {isEditMode ? (
        <EditIdeaDetailsComponent ideaId={ideaId} />
      ) : (
        <ViewIdeaDetailsPage ideaId={ideaId} />
      )}
    </div>
  );
};
