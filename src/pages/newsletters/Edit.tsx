import { useEffect } from "react";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { useParams, useNavigate } from "react-router-dom";
import NewsletterForm from "../../components/Newsletters/NewsletterForm";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

// newsletter actions
import {
  handleNewsletterEmail,
  editNewsletter,
  showNewsletter,
  setNewsletterDefaults,
  resetNewsletterFields,
} from "../../store/slices/newsletterSlice";

/**
 * newsletter edit page.
 *
 * @newsletter pages
 * @returns React component
 */
const EditPage = () => {
  //get newsletter id from the dynamic params from the current URL
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // take newsletters information from redux store
  const {
    newsletter,
    success_message,
    error_message,
    validation_errors,
    create_update_spinner,
  } = useAppSelector((state) => state.newsletter);

  // Refreshing and initializing newsletter store and geting newsletter data for show in the NewsletterForm
  useEffect(() => {
    dispatch(setNewsletterDefaults());
    dispatch(resetNewsletterFields());
    dispatch(showNewsletter({ id: id || "0" }));
  }, []);

  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleNewsletterEmail({ email: e.target.value }));
  };

  // newsletter edit form submit handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      editNewsletter({
        email: newsletter.email,
        id: id || "0",
        cb: function () {
          // reset email
          dispatch(handleNewsletterEmail({ email: "" }));
          // redirect
          setTimeout(() => navigate("/newsletters"), 1000);
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
                ویرایش ایمیل
                {` ${newsletter.id}# `}
              </div>
              <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                <NewsletterForm
                  newsletter={newsletter}
                  handleNewsletterChange={handleNewsletterChange}
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
                    ویرایش ایمیل
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
