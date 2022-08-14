import { useEffect } from "react";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { useParams, useNavigate } from "react-router-dom";
import TagForm from "../../components/Tags/TagForm";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

// tag actions
import {
  handleTagTitle,
  editTag,
  showTag,
  setTagDefaults,
  resetTagFields,
} from "../../store/slices/tagSlice";

/**
 * tag edit page.
 *
 * @tag pages
 * @returns React component
 */
const EditPage = () => {
  //get tag id from the dynamic params from the current URL
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // take tags information from redux store
  const {
    tag,
    success_message,
    error_message,
    validation_errors,
    create_update_spinner,
  } = useAppSelector((state) => state.tag);

  // Refreshing and initializing tag store and geting tag data for show in the TagForm
  useEffect(() => {
    dispatch(setTagDefaults());
    dispatch(resetTagFields());
    dispatch(showTag({ id: id || "0" }));
  }, []);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleTagTitle({ title: e.target.value }));
  };

  // tag edit form submit handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      editTag({
        title: tag.title,
        id: id || "0",
        cb: function () {
          // reset title
          dispatch(handleTagTitle({ title: "" }));
          // redirect
          setTimeout(() => navigate("/tags"), 1000);
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
                ویرایش تگ
                {` ${tag.id}# `}
              </div>
              <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                <TagForm
                  tag={tag}
                  handleTagChange={handleTagChange}
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
                    ویرایش تگ
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
