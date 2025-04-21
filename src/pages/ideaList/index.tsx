import { IdeaList } from "./IdeaListComponent";
import { IdeaFilterForm } from "./IdeasFilterForm";

export const IdeaListPage = () => (
  <div className="p-6">
    <IdeaFilterForm />
    <IdeaList />
  </div>
);
