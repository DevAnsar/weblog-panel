import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { useNavigate } from "react-router-dom";
import CategoryForm from "../../components/Categories/CategoryForm";
import {
  handleCategoryTitle,
  addCategory,
  setCategoryDefaults,
  resetCategoryFields
} from "../../store/slices/categorySlice";

/**
 * category create page.
 *
 * @category pages
 * @returns React component
 */
const AddPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // take categories information from redux store
  const {
    category,
    success_message,
    error_message,
    validation_errors,
    create_update_spinner,
  } = useAppSelector((state) => state.category);

  // Refreshing and initializing category store
  useEffect(() => {
    dispatch(setCategoryDefaults());
    dispatch(resetCategoryFields())
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleCategoryTitle({ title: e.target.value }));
  };

  // category create form submit handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      addCategory({
        title: category.title,
        cb: () => {
          // reset title
          dispatch(handleCategoryTitle({ title: "" }));
          // redirect
          setTimeout(() => navigate("/categories"), 2000);
        },
      })
    );
  };
  return (
    <div className="flex flex-col min-h-full">
      <Breadcrumb />
      <div className="container mx-auto px-4 sm:px-8 max-w-md">
        <div className="py-8">
          <form className="flex w-full" onSubmit={handleFormSubmit}>
            <div className="w-full max-w-2xl px-5 py-5 m-auto bg-white rounded-2xl shadow dark:bg-gray-800">
              <div className="mb-5 text-base text-gray-800 dark:text-white">
                ایجاد دسته جدید
              </div>
              <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                <CategoryForm
                  category={category}
                  success_message={success_message}
                  error_message={error_message}
                  create_update_spinner={create_update_spinner}
                  validation_errors={validation_errors}
                  handleCategoryChange={handleCategoryChange}
                />
                <div className="col-span-2 text-right">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    ثبت دسته جدید
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPage;
