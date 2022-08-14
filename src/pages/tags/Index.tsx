import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";

import Breadcrumb from "../../components/partials/Breadcrumb";
import Spinner from "../../components/partials/Spinner";
import Pagination from "../../components/partials/Pagination";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";

import TagTableHead from "../../components/Tags/TagTableHead";
import TagTableRow from "../../components/Tags/TagTableRow";

import { listTags, setTagDefaults } from "../../store/slices/tagSlice";

/**
 * Tag index page component.
 *
 * The component created for the tag list page.
 * @category pages
 * @returns React component
 */
const IndexPage = () => {
  // dispatcher for redux actions
  const dispatch = useAppDispatch();

  // take users information from redux store
  const { tags, list_spinner, success_message, error_message } = useAppSelector(
    (state) => state.tag
  );

  useEffect(() => {
    dispatch(setTagDefaults());
    dispatch(listTags({ page: 1 }));
  }, []);
  return (
    <div className="flex flex-col min-h-ful">
      <Breadcrumb />

      <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="px-5 py-5 flex justify-between">
              <span className="text-gray-800 text-base"> تگ ها</span>
              <Link to="/tags/add">
                <button className="flex items-center px-3 py-1 border text-base rounded-xl bg-blue-500 text-white hover:bg-blue-700">
                  <span className="text-sm">ایجاد تگ</span>
                  <PlusIcon className="w-4 " />
                </button>
              </Link>
            </div>
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <SuccessAlert msg={success_message} />
              <ErrorAlert msg={error_message} />
              <table className="min-w-full leading-normal">
                <TagTableHead />
                <tbody>
                  {tags.data
                    ? tags.data.map((item) => (
                        <TagTableRow key={item.id} tag={item} />
                      ))
                    : null}
                </tbody>
              </table>

              <Pagination data={tags} action={listTags} />
              <Spinner show={list_spinner} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndexPage;
