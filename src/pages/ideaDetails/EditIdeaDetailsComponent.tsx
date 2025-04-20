import { Formik } from "formik";
import { FormInput } from "../../components/FormInput";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const EditIdeaDetailsComponent = () => {
  const title = useSelector((state: RootState) => state.idea.title);
  const summary = useSelector((state: RootState) => state.idea.summary);
  const description = useSelector((state: RootState) => state.idea.description);

  return (
    <div className="card shadow-md p-4 space-y-3">
      <div className="overflow-y-auto flex-1 pr-14">
        <Formik
          initialValues={{
            title,
            summary,
            description,
          }}
          enableReinitialize
          onSubmit={() => {
            toast.success("updated");
          }}
        >
          {({ errors, touched }) => (
            <form autoComplete="off">
              <div className="flex flex-col gap-4 mt-2">
                <FormInput
                  name="title"
                  label="Title"
                  type="textarea"
                  minRows={1}
                  maxRows={2}
                  maxLength={100}
                  errors={errors}
                  touched={touched}
                />
                <FormInput
                  name="summary"
                  label="Summary"
                  type="textarea"
                  minRows={2}
                  rows={5}
                  maxLength={300}
                  errors={errors}
                  touched={touched}
                />
                <FormInput
                  name="description"
                  label="Description"
                  type="quilltextarea"
                  rows={5}
                  maxLength={300}
                  errors={errors}
                  touched={touched}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
