import { Form, Formik } from "formik";
import { SortOption, validSortOptions } from "../../types/models";
import { FormInput } from "../../components/FormInput";
import { FormSelect } from "../../components/FormSelect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";
import { SearchableFormSelect } from "../../components/SearchableFormSelect";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { FormButton } from "../../components/FormButton";
import { fetchAllTagsAction } from "../../features/app/appActions";

type IdeaFilterFormValues = typeof initialValues;

const initialValues = {
  sortBy: validSortOptions[4] as SortOption,
  sortOrder: "DESC",
  page: 1,
  pageSize: 10,
  search: "",
  statusCode: "",
  tags: "",
  andTag: false,
};

export const IdeaFilterForm = () => {
  const handleSubmit = (values: IdeaFilterFormValues) => {
    console.log(values);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    //page load perform operation
    handleSubmit(initialValues);
    dispatch(fetchAllTagsAction());
  }, [dispatch]);

  const tagList = useSelector((state: RootState) => state.app.dropdowns.tags);
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => {
        return (
          <Form className="p-4 px-6 space-y-4 bg-base-100 rounded-xl shadow-md">
            <div className="flex gap-10 min-h-20">
              <div className="flex-5/12">
                <FormInput
                  name="search"
                  type="textarea"
                  minRows={1}
                  maxRows={3}
                  label="Search"
                  noValidtion
                />
              </div>

              <div className="flex-2/3">
                <div className="flex gap-2 justify-center ">
                  <span className="min-w-20">
                    <label
                      htmlFor={"andTag"}
                      className="text-sm mb-2 ml-1 block font-medium text-gray-900 dark:text-white"
                    >
                      Match
                    </label>
                    <button
                      type="button"
                      onClick={() => setFieldValue("andTag", !values.andTag)}
                      className={clsx(
                        "btn btn-primary btn-dash flex items-center gap-2 tracking-widest"
                      )}
                    >
                      {values.andTag ? "AND" : "OR"}
                    </button>
                  </span>
                  <span className="flex-1">
                    <SearchableFormSelect
                      name="tags"
                      label="Tags"
                      isMulti
                      options={tagList.map(({ id, name }) => ({
                        value: id,
                        label: name,
                      }))}
                      noValidtion
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="flex w-1/3">
                <div className="flex-1">
                  <FormSelect
                    name="sortBy"
                    label="Sort By"
                    noDefaultOption
                    noValidtion
                  >
                    {validSortOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </FormSelect>
                </div>

                <div className="div">
                  <label
                    htmlFor={"sortOrder"}
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sort Order
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "sortOrder",
                        values.sortOrder === "ASC" ? "DESC" : "ASC"
                      )
                    }
                    className="btn btn-dash flex items-center gap-2"
                  >
                    <span className="w-5">
                      {values.sortOrder === "ASC" ? (
                        <ArrowUpIcon />
                      ) : (
                        <ArrowDownIcon />
                      )}
                    </span>
                    {values.sortOrder}
                  </button>
                </div>
              </div>
              <div className="flex flex-1 gap-8 justify-center">
                <div className="flex items-center gap-2">
                  <div>
                    <label
                      htmlFor={"Pagination"}
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      &nbsp;
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="btn"
                        disabled={values.page <= 1}
                        onClick={() => setFieldValue("page", values.page - 1)}
                      >
                        <span className="w-6">
                          <ChevronLeftIcon />
                        </span>
                      </button>

                      <span>Page {values.page}</span>

                      <button
                        type="button"
                        className="btn"
                        onClick={() => setFieldValue("page", values.page + 1)}
                      >
                        <span className="w-6">
                          <ChevronRightIcon />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <FormSelect name="pageSize" label={"Page Size"} noValidtion>
                    {[5, 10, 20, 50].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </FormSelect>
                </div>
              </div>

              <div className="flex pt-6 gap-8 justify-end">
                <FormButton
                  type="reset"
                  color="secondary"
                  style="outline"
                  label="Clear"
                />
                <FormButton modifier="wide" type="submit" label="Apply" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
