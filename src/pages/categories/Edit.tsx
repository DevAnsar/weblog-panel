import { useEffect } from "react";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { useParams, useNavigate } from "react-router-dom";
import CategoryForm from "../../components/Categories/CategoryForm";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

// category actions
import {
  handleCategoryTitle,
  editCategory,
  showCategory,
  setCategoryDefaults,
  resetCategoryFields,
} from "../../store/slices/categorySlice";

/**
 * category edit page.
 *
 * @category pages
 * @returns React component
 */
const EditPage = () => {
  //get category id from the dynamic params from the current URL
  const { id } = useParams();

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

  // Refreshing and initializing category store and geting category data for show in the CategoryForm
  useEffect(() => {
    dispatch(setCategoryDefaults());
    dispatch(resetCategoryFields());
    dispatch(showCategory({ id: id || "0" }));
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleCategoryTitle({ title: e.target.value }));
  };

  // category edit form submit handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      editCategory({
        title: category.title,
        id: id || "0",
        cb: function () {
          // reset title
          dispatch(handleCategoryTitle({ title: "" }));
          // redirect
          setTimeout(() => navigate("/categories"), 1000);
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
                ایجاد دسته
              </div>
              <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                <CategoryForm
                  category={category}
                  handleCategoryChange={handleCategoryChange}
                  error_message={error_message}
                  success_message={success_message}
                  create_update_spinner={create_update_spinner}
                  validation_errors={validation_errors}
                />
                <div className="col-span-2 text-right">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    ویرایش دسته
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

export default EditPage;
