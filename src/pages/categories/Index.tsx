import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { Link } from "react-router-dom";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import Spinner from "../../components/partials/Spinner";
import Pagination from "../../components/partials/Pagination";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";
import {
  listCategories,
  setCategoryDefaults,
} from "../../store/slices/categorySlice";
import CategoryTableHead from "../../components/Categories/CategoryTableHead";
import CategoryTableRow from "../../components/Categories/CategoryTableRow";

/**
 * Category index page component.
 *
 * The component created for the category list page.
 * @category pages
 * @returns React component
 */
const IndexPage = () => {
  // dispatcher for redux actions
  const dispatch = useAppDispatch();

  // take users information from redux store
  const { categories, list_spinner, success_message, error_message } =
    useAppSelector((state) => state.category);

  useEffect(() => {
    dispatch(setCategoryDefaults());
    dispatch(listCategories({ page: 1 }));
  }, []);
  return (
    <div className="flex flex-col min-h-ful">
      <Breadcrumb />

      <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="px-5 py-5 flex justify-between">
              <span className="text-gray-800 text-base">دسته بندی ها</span>
              <Link to="/categories/add">
                <button className="flex items-center px-3 py-1 border text-base rounded-xl bg-blue-500 text-white hover:bg-blue-700">
                  <span className="text-sm">ایجاد دسته</span>
                  <PlusIcon className="w-4 " />
                </button>
              </Link>
            </div>
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <SuccessAlert msg={success_message} />
              <ErrorAlert msg={error_message} />
              <table className="min-w-full leading-normal">
                <CategoryTableHead />
                <tbody>
                  {categories.data
                    ? categories.data.map((item) => (
                        <CategoryTableRow key={item.id} category={item} />
                      ))
                    : null}
                </tbody>
              </table>

              <Pagination data={categories} action={listCategories} />
              <Spinner show={list_spinner} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndexPage;
