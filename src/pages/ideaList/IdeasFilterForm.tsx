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
import { SortOptionsWithLabel, STATUS_CODES } from "../../utils/constants";
import { Status } from "../../components/StatusBadge";
import { searchIdeas } from "../../features/ideaList/IdeaListAction";

export type IdeaFilterFormValues = typeof initialValues;

const initialValues = {
  sortBy: validSortOptions[4] as SortOption,
  sortOrder: "DESC",
  page: 1,
  pageSize: 10,
  search: "",
  statusCode: "",
  tags: [] as number[],
  andTags: false,
};

export const IdeaFilterForm = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //page load perform operation
    dispatch(searchIdeas(initialValues));
    dispatch(fetchAllTagsAction());
  }, [dispatch]);

  const tagList = useSelector((state: RootState) => state.app.dropdowns.tags);
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={(values) => {
        dispatch(searchIdeas(values));
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => {
        return (
          <Form
            onSubmit={handleSubmit}
            className="p-4 px-6 space-y-4 bg-base-100 rounded-xl shadow-md"
          >
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
                      htmlFor={"andTags"}
                      className="text-sm mb-2 ml-1 block font-medium text-gray-900 dark:text-white"
                    >
                      Match
                    </label>
                    <button
                      type="button"
                      onClick={() => setFieldValue("andTags", !values.andTags)}
                      className={clsx(
                        "btn btn-primary btn-dash flex items-center gap-2 tracking-widest"
                      )}
                    >
                      {values.andTags ? "AND" : "OR"}
                    </button>
                  </span>
                  <span className="flex-1">
                    <SearchableFormSelect
                      name="tags"
                      label="Tags"
                      isMulti
                      options={tagList.map(({ name }) => ({
                        value: name,
                        label: name,
                      }))}
                      noValidtion
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex-1">
                <FormSelect
                  name="statusCode"
                  label="Idea Status"
                  defaultOptionLabel="ALL"
                  noValidtion
                >
                  {STATUS_CODES.map((statusCode: Status, index: number) => (
                    <option key={index + 1} value={statusCode}>
                      {statusCode.replace(/_/g, " ")}
                    </option>
                  ))}
                </FormSelect>
              </div>

              <div className="flex-1">
                <FormSelect
                  name="sortBy"
                  label="Sort By"
                  noDefaultOption
                  noValidtion
                >
                  {Object.entries(SortOptionsWithLabel).map(
                    ([value, label], index) => (
                      <option key={index} value={value}>
                        {label}
                      </option>
                    )
                  )}
                </FormSelect>
              </div>
              <div className="flex">
                <div className="flex-1">
                  <label
                    htmlFor={"sortOrder"}
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Sort Order
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setFieldValue(
                        "sortOrder",
                        values.sortOrder === "ASC" ? "DESC" : "ASC"
                      );
                      handleSubmit();
                    }}
                    className="btn btn-dash flex items-center gap-2"
                  >
                    <span className="w-5">
                      {values.sortOrder === "ASC" ? (
                        <ArrowUpIcon />
                      ) : (
                        <ArrowDownIcon />
                      )}
                    </span>
                    <span className="min-w-[50px]">{values.sortOrder}</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-1 justify-end">
                <div className="flex mt-5 p-2 items-center gap-2">
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

              <div className="flex">
                <FormSelect name="pageSize" label={"Page Size"} noValidtion>
                  {[5, 10, 20, 50].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </FormSelect>
              </div>
              <div className="px-4">&nbsp;</div>
              <div className="flex-1 mt-5 p-2 justify-end">
                <div className="flex gap-4">
                  <FormButton
                    type="reset"
                    color="secondary"
                    style="outline"
                    label="Clear"
                    className="w-25"
                  />

                  <FormButton type="submit" className="w-40" label="Apply" />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
