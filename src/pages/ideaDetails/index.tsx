import { useEffect, useState } from "react";
import { ideaDetailsRoute } from "../../routes";
import { CommentSection } from "./CommentSection";

import { EditIdeaDetailsComponent } from "./EditIdeaDetailsComponent";
import { ImageCarousel } from "./ImageCarousel";
import { ViewIdeaDetailsPage } from "./ViewIdeaDetailsComponent";
import { useDispatch, useSelector } from "react-redux";
import { clearIdeaState } from "../../features/idea/ideaSlice";
import { RootState } from "../../store";
import {
  PencilIcon as SolidPencilIcon,
  EyeIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import {
  fetchIdeaDetails,
  updateStatusChange,
} from "../../features/idea/ideaActions";
import StatusBadge, { Status } from "../../components/StatusBadge";
import { STATUS_CODES } from "../../utils/constants";
import { Form, Formik, FormikValues } from "formik";
import { SearchableFormSelect } from "../../components/SearchableFormSelect";
import { CheckBadgeIcon, PencilIcon } from "@heroicons/react/24/outline";
export interface IdeaDetailBaseComponentProps {
  ideaId: string;
}

const statusFormInitValue = {
  statusCode: "",
};

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
  const tags = useSelector((state: RootState) => state.idea.tags);

  const [isEditStatusMode, setIsEditStatusMode] = useState(false);

  const handleStatusChangeSubmit = async ({ statusCode }: FormikValues) => {
    dispatch(updateStatusChange(+ideaId, statusCode));
  };

  const statusName = useSelector(
    (state: RootState) => state.idea.statusName
  ) as Status;

  const lazyLoader = useSelector((state: RootState) => state.app.lazyLoader);

  const manager = useSelector((state: RootState) => state.idea.manager);
  const submitters = useSelector((state: RootState) => state.idea.submitters);
  const pocTeamMembers = useSelector(
    (state: RootState) => state.idea.pocTeamMembers
  );
  const approver = useSelector((state: RootState) => state.idea.approver);
  const pocTeamName = useSelector((state: RootState) => state.idea.pocTeamName);
  //const [selectedStatus, setSelectedStatus] = useState<string>("");

  useEffect(() => {
    dispatch(fetchIdeaDetails(+ideaId, mode === "edit"));
    return () => {
      //idea state cleanup
      dispatch(clearIdeaState());
    };
  }, [dispatch, ideaId, mode]);

  return (
    <div className="idea_detail_container flex w-full p-6">
      <div className="idea_left_box flex-2/3">
        <div className="flex flex-col">
          <div className="idea_detail_content">
            {isEditMode ? (
              <EditIdeaDetailsComponent />
            ) : (
              <ViewIdeaDetailsPage />
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
      <div
        className={clsx("idea_right_box flex-1/3", { skeleton: lazyLoader })}
      >
        <div className="flex flex-col items-start gap-6 pl-8">
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
            <h2 className="mb-2 font-semibold text-gray-600 dark:text-gray-400">
              Tags
            </h2>
            <div className="tags flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div
                  key={`tag-${index}`}
                  className="badge bg-gray-300 dark:bg-gray-800 badge-lg p-4"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="status_row">
            <h2 className="mb-2 font-semibold  text-gray-600 dark:text-gray-400">
              Status
            </h2>
            {isEditMode && isEditStatusMode ? (
              <Formik
                onSubmit={handleStatusChangeSubmit}
                initialValues={statusFormInitValue}
              >
                {({ handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="flex items-center w-full">
                      <span className="flex-1">
                        <SearchableFormSelect
                          name="statusCode"
                          noValidtion
                          label={""}
                          options={STATUS_CODES.map((statusCode: Status) => ({
                            label: statusCode.replace(/_/g, " "),
                            value: statusCode as string,
                          }))}
                        />
                      </span>
                      <span className="flex items-center">
                        <button
                          type="submit"
                          className="btn btn-primary min-w-0"
                        >
                          <span className="w-5">
                            <CheckBadgeIcon />
                          </span>
                        </button>
                        <button
                          type="submit"
                          className="btn btn-outline min-w-0"
                          onClick={() => setIsEditStatusMode(false)}
                        >
                          <span className="w-5">
                            <XMarkIcon />
                          </span>
                        </button>
                      </span>
                    </div>
                  </Form>
                )}
                {/* <Select
                      name="statusCode"
                      isSearchable={false}
                      options={STATUS_CODES.map((statusCode: Status) => ({
                        label: statusCode.replace(/_/g, " "),
                        value: statusCode as string,
                      }))}
                      onChange={
                        () => {}
                        //  setSelectedStatus(selected?.value ?? "")
                      }
                      components={{
                        // removes the line between value and chevron
                        IndicatorSeparator: () => null,
                      }}
                      classNames={{
                        control: ({ isFocused }) =>
                          `select h-auto  select-primary w-full p-2 ring-2 ring-transparent  ${
                            isFocused ? "ring-2 ring-primary" : ""
                          }`,
                        indicatorsContainer: () => "px-1",
                        option: ({ isFocused, isSelected }) =>
                          `p-2 cursor-pointer ${
                            isSelected
                              ? "bg-primary text-white"
                              : isFocused
                                ? "bg-primary/20"
                                : ""
                          }`,
                        menu: () =>
                          "shadow-lg border border-base-200 rounded-lg mt-1 bg-base-100",
                        singleValue: () => "text-base-content",
                        multiValue: () =>
                          "bg-primary text-white px-2 py-1 rounded mr-1 mb-1 text-sm",
                        multiValueLabel: () => "text-white",
                        multiValueRemove: () =>
                          "ml-1 text-white  cursor-pointer",
                      }}
                      unstyled
                    /> */}
              </Formik>
            ) : (
              <>
                <StatusBadge status={statusName} />
                {isEditMode && (
                  <button
                    type="submit"
                    className="btn btn-outline min-w-0"
                    onClick={() => setIsEditStatusMode(true)}
                  >
                    <span className="w-5">
                      <PencilIcon />
                    </span>
                  </button>
                )}
              </>
            )}
          </div>
          <div className="flex gap-15 w-32">
            {manager && (
              <div className="manager">
                <h2 className="mb-2 font-semibold  text-gray-600 dark:text-gray-400">
                  Manager
                </h2>
                <div className="flex flex-col items-center">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-gray-500 dark:ring-offset-gray-700 ring-offset-base-100 ring-offset-2">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${`${manager.firstName} ${manager.lastName}`}`}
                        className="inline "
                      />
                    </div>
                  </div>
                  <div className="opacity-80 mt-0.5">{manager.firstName}</div>
                </div>
              </div>
            )}
            {approver && (
              <div className="approver">
                <h2 className="mb-2 font-semibold  text-gray-600 dark:text-gray-400">
                  Approver
                </h2>
                <div className="flex flex-col items-center">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-gray-500 dark:ring-offset-gray-700 ring-offset-base-100 ring-offset-2">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${`${approver.firstName} ${approver.lastName}`}`}
                        className="inline "
                      />
                    </div>
                  </div>
                  <div className="opacity-80 mt-0.5">{approver.firstName}</div>
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-2 font-semibold  text-gray-600 dark:text-gray-400">
              Contributors
            </h2>
            <div className="tags flex flex-wrap space-x-2 gap-2">
              {submitters.map(({ firstName, lastName, userId }) => (
                <div
                  key={`author-${userId}`}
                  className="flex flex-col items-center"
                >
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-gray-500 dark:ring-offset-gray-700 ring-offset-base-100 ring-offset-2">
                      <img
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${`${firstName} ${lastName}`}`}
                        className="inline "
                      />
                    </div>
                  </div>
                  <div className="opacity-80 mt-0.5">{firstName}</div>
                </div>
              ))}
            </div>
          </div>

          {pocTeamMembers != null && pocTeamMembers.length > 1 && (
            <div>
              <h2 className="mb-2 font-semibold  text-gray-600 dark:text-gray-400">
                Team: {pocTeamName}
              </h2>
              <div className=" flex flex-wrap space-x-4 gap-2">
                {pocTeamMembers.map(({ firstName, lastName, userId }) => (
                  <div
                    key={`team-${userId}`}
                    className="flex flex-col items-center"
                  >
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-gray-500 dark:ring-offset-gray-700 ring-offset-base-100 ring-offset-2">
                        <img
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${`${firstName} ${lastName}`}`}
                          className="inline "
                        />
                      </div>
                    </div>
                    <div className="opacity-80 mt-0.5">{firstName}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
