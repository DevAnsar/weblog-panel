import { useEffect } from "react";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { useParams, useNavigate } from "react-router-dom";
import TagForm from "../../components/Tags/TagForm";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

// tag actions
import {
  handleFieldChange,
  answerContact,
  showContact,
  setContactDefaults,
  resetContactFields,
} from "../../store/slices/contactSlice";

/**
 * tag edit page.
 *
 * @tag pages
 * @returns React component
 */
const ShowPage = () => {
  //get tag id from the dynamic params from the current URL
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // take tags information from redux store
  const {
    contact,
    answerContent,
    success_message,
    error_message,
    validation_errors,
    create_update_spinner,
  } = useAppSelector((state) => state.contact);

  // Refreshing and initializing tag store and geting tag data for show in the TagForm
  useEffect(() => {
    dispatch(setContactDefaults());
    dispatch(resetContactFields());
    dispatch(showContact({ id: id || "0" }));
  }, []);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(handleFieldChange({ data: e.target.value }));
  };

  // tag edit form submit handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      answerContact({
        content: answerContent,
        id: id || "0",
        cb: function () {
          // reset title
          dispatch(resetContactFields());
          // redirect
          setTimeout(() => navigate("/contact-us"), 1000);
        },
      })
    );
  };

  return (
    <div className="flex flex-col min-h-full">
      <Breadcrumb />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="w-full max-w-2xl px-5 py-5 m-auto bg-white rounded-2xl shadow dark:bg-gray-800">
            <div className="mb-5 text-base text-gray-800 dark:text-white">
              مشاهده پیام با آیدی {` ${contact.id}# `}
            </div>

            <div className="box-body">
              <div className="flex flex-col">
                <div className="flex items-center gap-5">
                  <label>نام فرستنده</label>
                  <div className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                    {contact.name}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-5">
                <div className="flex items-center gap-5">
                  <label>ایمیل</label>
                  <div className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                    {contact.email}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 mt-5 w-full">
                <div className="flex flex-col items-start justify-start lg:flex-row  gap-5 w-full">
                  <label>متن پست</label>
                  <div className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                    {contact.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
             {/* /send answer form/ */}
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
