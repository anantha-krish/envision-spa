import { Formik } from "formik";
import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import * as Yup from "yup";
import { FormInput } from "./FormInput";

const IdeaSchema = Yup.object({
  title: Yup.string().required("Idea title is required."),
  summary: Yup.string().required("Idea Summary is required."),
  tags: Yup.array().of(Yup.number()).min(1),
  managerId: Yup.number().optional(),
  submittedBy: Yup.array().of(Yup.number()).min(1),
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

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      modalRef.current?.showModal();
    } else {
      document.body.classList.remove("modal-open");
      modalRef.current?.close();
    }
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  return ReactDOM.createPortal(
    <dialog
      ref={modalRef}
      className="modal"
      style={{ scrollbarGutter: "auto" }}
      onClose={onClose}
    >
      <div className="modal-box w-10/12 max-w-5xl">
        {/* Close Button Outside Any Form */}
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          // validationSchema={IdeaSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 p-3">
                <FormInput
                  name="title"
                  label="Title"
                  type="textarea"
                  errors={errors}
                  rows={1}
                  maxLength={100}
                  touched={touched}
                />

                <FormInput
                  name="summary"
                  label="Summary"
                  type="textarea"
                  errors={errors}
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
              </div>
              <div className="modal-action">
                <button className="btn" type="button" onClick={onClose}>
                  Close
                </button>
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </dialog>,
    document.body
  );
};

export default SubmitNewIdeaModal;
