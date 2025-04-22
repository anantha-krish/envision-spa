import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const ViewIdeaDetailsPage: React.FC = () => {
  const title = useSelector((state: RootState) => state.idea.title);
  const summary = useSelector((state: RootState) => state.idea.summary);
  const description = useSelector((state: RootState) => state.idea.description);
  return (
    <div className="card shadow-md p-4 space-y-3 mr-6">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-600 dark:text-gray-500">{summary}</p>
      <div
        className="description prose"
        dangerouslySetInnerHTML={{ __html: description }}
      ></div>
    </div>
  );
};
