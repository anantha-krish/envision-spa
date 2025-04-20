// interface EditIdeaDetailsComponentProps
//   extends IdeaDetailCommonComponentProps {}

import { IdeaDetailBaseComponentProps } from ".";

export const EditIdeaDetailsComponent: React.FC<
  IdeaDetailBaseComponentProps
> = ({ ideaId }) => <>Edit {ideaId}</>;
