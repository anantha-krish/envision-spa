import { Formik, FormikProps } from "formik";
import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import * as Yup from "yup";
import { FormInput } from "./FormInput";
import { ConfirmationPopup } from "./ConfirmPopup";
import { FormSelect } from "./FormSelect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchIdeaDropDownOptions } from "../features/app/appActions";
import { FormButton } from "./FormButton";

const IdeaSchema = Yup.object({
  title: Yup.string().required("Idea title is required."),
  summary: Yup.string().required("Idea Summary is required."),
  description: Yup.string()
    .transform((value) => {
      const text = value.replace(/<[^>]*>/g, "").trim(); // strip HTML
      return text;
    })
    .required("Idea Description is required."),
  /* tags: Yup.array().of(Yup.number()).min(1),
  managerId: Yup.number().optional(),
  submittedBy: Yup.array().of(Yup.number()).min(1),*/
});

const initialValues = {
  title: "",
  summary: "",
  description: "",
  statusId: -1,
  tags: [] as number[],
  managerId: -1,
  submittedBy: [] as number[],
};

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

  useEffect(() => {
    if (isOpen) {
      if (managers.length == 0) {
        dispatch(fetchIdeaDropDownOptions());
      }
      document.body.classList.add("modal-open");
      modalRef.current?.showModal();
      formikRef.current?.resetForm();
    } else {
      document.body.classList.remove("modal-open");
      modalRef.current?.close();
    }
    return () => document.body.classList.remove("modal-open");
  }, [dispatch, isOpen, managers.length]);

  return ReactDOM.createPortal(
    <>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-10/12 px-0 pr-0.5 relative max-w-5xl flex flex-col max-h-[90vh]">
          <div className="flex justify-between items-center mb-2 px-6">
            <h2 className="text-lg font-semibold">Submit Idea</h2>
            <button
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
            initialValues={initialValues}
            validationSchema={IdeaSchema}
            onSubmit={(values) => {
              console.log(values);
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
                        errors={errors}
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
                      <FormInput
                        name="description"
                        label="Description"
                        type="quilltextarea"
                        errors={errors}
                        rows={5}
                        maxLength={300}
                        touched={touched}
                      />
                      <FormSelect name="managerId" label="Reporting Manager">
                        {managers.map((manager) => (
                          <option
                            key={`manager-${manager.userId}`}
                            value={manager.userId}
                          >
                            {[
                              manager.firstName,
                              manager.lastName,
                              `<${manager.email}>`,
                            ].join(" ")}
                          </option>
                        ))}
                      </FormSelect>
                      <FormSelect name="managerId" label="Reporting Manager">
                        {managers.map((manager) => (
                          <option
                            key={`manager-${manager.userId}`}
                            value={manager.userId}
                          >
                            {[
                              manager.firstName,
                              manager.lastName,
                              `<${manager.email}>`,
                            ].join(" ")}
                          </option>
                        ))}
                      </FormSelect>
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
        message={"Your idea has not been submitted. All changes will be lost."}
        onConfirm={() => {
          confirmRef.current?.close();
          onClose();
        }}
        onCancel={() => confirmRef.current?.close()}
      />
    </>,
    document.body
  );
};

export default SubmitNewIdeaModal;
