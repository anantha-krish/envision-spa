import { Formik, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { fetchIdeaDropDownOptions } from "../features/app/appActions";
import {
  createNewTagApi,
  submitNewIdeaApi,
  uploadNewAttachementsApi,
} from "../features/idea/ideaApi";
import { addNewTagOnSuccess } from "../features/app/appSlice";
import { RootState } from "../store";
import { ConfirmationPopup } from "./ConfirmPopup";
import { CreatableFormSelect, SelectOptionType } from "./CreateableFormSelect";
import { FormButton } from "./FormButton";
import { FormInput } from "./FormInput";
import { IdeaFileInputUploader } from "./IdeaFileInputUploader";
import { SearchableFormSelect } from "./SearchableFormSelect";

const IdeaSchema = Yup.object({
  title: Yup.string().required("Idea title is required."),
  summary: Yup.string().required("Idea Summary is required."),
  description: Yup.string()
    .transform((value) => {
      const text = value.replace(/<[^>]*>/g, "").trim(); // strip HTML
      return text;
    })
    .required("Idea Description is required."),
  tags: Yup.array().of(Yup.number()).min(1),
  managerId: Yup.number().optional(),
  submittedBy: Yup.array()
    .of(Yup.number())
    .min(1)
    .required("Submitted by is required"),
});

const SubmitNewIdeaModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: VoidFunction;
}) => {
  const modalRef = useRef<null | HTMLDialogElement>(null);
  const formikRef = useRef<FormikProps<typeof initialValues> | null>(null);
  const confirmRef = useRef<null | HTMLDialogElement>(null);

  const managers = useSelector(
    (state: RootState) => state.app.dropdowns.managers
  );

  const loggedInUserId = useSelector((state: RootState) => state.auth.userId);
  const users = useSelector((state: RootState) => state.app.dropdowns.users);
  const tagList = useSelector((state: RootState) => state.app.dropdowns.tags);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const initialValues = {
    title: "",
    summary: "",
    description: "",
    statusId: 1,
    tags: [] as number[],
    managerId: -1,
    submittedBy: [loggedInUserId] as number[],
  };

  const handleAttemptClose = () => {
    const formik = formikRef.current;
    if (
      formik &&
      JSON.stringify(formik.values) !== JSON.stringify(initialValues)
    ) {
      confirmRef.current?.showModal(); // Show confirm popup
    } else {
      onClose();
    }
  };
  const dispatch = useDispatch();
  const refetch = managers.length == 0 || users.length == 0;
  useEffect(() => {
    if (isOpen) {
      if (refetch) {
        dispatch(fetchIdeaDropDownOptions());
      }
      document.body.classList.add("modal-open");
      modalRef.current?.showModal();
      formikRef.current?.resetForm();
      setTimeout(() => {
        const focusable = modalRef.current?.querySelectorAll(
          "input, select, textarea, button"
        );
        const first = focusable?.[0] as HTMLInputElement | null;
        first?.focus();
      }, 300);
    } else {
      document.body.classList.remove("modal-open");
      modalRef.current?.close();
    }
    return () => document.body.classList.remove("modal-open");
  }, [dispatch, isOpen, refetch]);

  return ReactDOM.createPortal(
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box  bg-gray-100 dark:bg-gray-900 w-10/12 px-0 pr-0.5 relative max-w-5xl flex flex-col max-h-[90vh]">
          <div className="flex justify-between items-center mb-2 px-6">
            <h2 className="text-lg font-semibold">Submit Idea</h2>
            <button
              autoFocus
              onClick={handleAttemptClose}
              className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>

          {/* Formik Form */}
          <Formik
            innerRef={(instance) => {
              formikRef.current = instance;
            }}
            initialValues={{ ...initialValues, submittedBy: [loggedInUserId] }}
            validationSchema={IdeaSchema}
            enableReinitialize
            onSubmit={async (values) => {
              const formData = new FormData();
              if (selectedFiles.length > 0) {
                selectedFiles.forEach((file: File) =>
                  formData.append("files", file)
                );
              }
              const { status, data } = await submitNewIdeaApi(values);
              if (status === 201 && data.ideaId) {
                //no alert for creation
                await uploadNewAttachementsApi(
                  data.ideaId,
                  formData,
                  [],
                  false
                );
              }
              toast.success(`Idea: ${data.title} created successfully `);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <>
                <div className="overflow-y-auto flex-1 px-6">
                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 mt-2">
                      <FormInput
                        name="title"
                        label="Title"
                        type="textarea"
                        minRows={1}
                        maxRows={2}
                        maxLength={100}
                        touched={touched}
                      />
                      <FormInput
                        name="summary"
                        label="Summary"
                        type="textarea"
                        errors={errors}
                        minRows={2}
                        rows={5}
                        maxLength={300}
                        touched={touched}
                      />
                      <CreatableFormSelect
                        name="tags"
                        label="Tag"
                        isMulti
                        onCreateOption={async (val) => {
                          const { id, name } = await createNewTagApi(val);
                          dispatch(addNewTagOnSuccess({ id, name }));
                          const newOption: SelectOptionType = {
                            label: name,
                            value: id,
                          };
                          return Promise.resolve(newOption);
                        }}
                        options={tagList.map(({ id, name }) => ({
                          value: id,
                          label: name,
                        }))}
                      />
                      <FormInput
                        name="description"
                        label="Description"
                        type="quilltextarea"
                        errors={errors}
                        rows={5}
                        maxLength={300}
                        touched={touched}
                      />
                      <IdeaFileInputUploader
                        setSelectedFiles={setSelectedFiles}
                      />

                      <SearchableFormSelect
                        name="managerId"
                        label="Reporting Manager"
                        options={managers.map((user) => ({
                          value: user.userId,
                          hint: [user.firstName, user.lastName].join(" "),
                          label: [
                            user.firstName,
                            user.lastName,
                            `<${user.email}>`,
                          ].join(" "),
                        }))}
                      />

                      <SearchableFormSelect
                        name="submittedBy"
                        label="Contributors"
                        isMulti
                        options={users.map((user) => ({
                          value: user.userId,
                          hint: [user.firstName, user.lastName].join(" "),
                          label: [
                            user.firstName,
                            user.lastName,
                            `<${user.email}>`,
                          ].join(" "),
                        }))}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-action flex gap-3 justify-end px-6 ">
                  <FormButton
                    type="button"
                    color="secondary"
                    style="outline"
                    onClick={handleAttemptClose}
                    label="Close"
                  />

                  <FormButton
                    onClick={handleSubmit}
                    type="submit"
                    label="Submit"
                  />
                </div>
              </>
            )}
          </Formik>
        </div>
      </dialog>
      <ConfirmationPopup
        dialogRef={confirmRef}
        onConfirm={() => {
          confirmRef.current?.close();
          onClose();
        }}
        Message={() => (
          <>
            "Your idea has not been submitted. All changes will be lost."
            <br /> Are you sure you want to close?
          </>
        )}
        onCancel={() => confirmRef.current?.close()}
      />
    </>,
    document.body
  );
};

export default SubmitNewIdeaModal;
