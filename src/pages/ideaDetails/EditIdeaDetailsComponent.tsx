import { Form, Formik } from "formik";
import { FormInput } from "../../components/FormInput";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FormButton } from "../../components/FormButton";
import { useNavigate } from "@tanstack/react-router";
import { updateIdeaContents } from "../../features/idea/ideaApi";

export const EditIdeaDetailsComponent = () => {
  const ideaId = useSelector((state: RootState) => state.idea.id);
  const title = useSelector((state: RootState) => state.idea.title);
  const summary = useSelector((state: RootState) => state.idea.summary);
  const description = useSelector((state: RootState) => state.idea.description);
  const navigate = useNavigate();

  return (
    <div className="card shadow-md p-4 space-y-3 mr-6">
      <div className="overflow-hidden flex-1 pr-14">
        <Formik
          initialValues={{
            title,
            summary,
            description,
          }}
          enableReinitialize
          onSubmit={async (values) => {
            await updateIdeaContents(ideaId, values);
            navigate({
              to: "/ideas/$ideaId/$mode",
              params: { ideaId: ideaId.toString(), mode: "view" },
            });
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form autoComplete="off" onSubmit={handleSubmit}>
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
              <div className="flex gap-3 justify-end px-6 ">
                <FormButton
                  type="button"
                  color="secondary"
                  style="outline"
                  onClick={() =>
                    navigate({
                      to: "/ideas/$ideaId/$mode",
                      params: { ideaId: ideaId.toString(), mode: "view" },
                    })
                  }
                  label="Close"
                />

                <FormButton onClick={() => {}} type="submit" label="Submit" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
