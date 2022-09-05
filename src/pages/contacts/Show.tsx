import { useEffect } from "react";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { useParams, useNavigate } from "react-router-dom";
import AnswerForm from "../../components/Contacts/ContactAnswerForm";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RefreshIcon } from "@heroicons/react/solid";
import type { GetContact } from "../../types/contact";

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

  const handleContactChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(handleFieldChange({ data: e.target.value }));
  };

  // tag edit form submit handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(answerContent);
    dispatch(
      answerContact({
        content: answerContent,
        id: id || "0",
        cb: function () {
          // reset title
          dispatch(resetContactFields());
          // redirect
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

            <AnswerCart contact={contact} />
            <div className="mt-11 flex gap-4 flex-col">
              {contact.answers?.length > 0 && (
                <span className="text-lg whitespace-nowrap text-fuchsia-900 mb-3">
                  پاسخ های ارسال شده :
                  <span className="whitespace-nowrap mx-7 bg-green-100 text-green-600 text-sm py-1 px-3 rounded-lg">
                    {contact.answers?.length}
                  </span>
                </span>
              )}

              {contact.answers?.map((answer, index) => (
                <div key={index} className="w-full p-5 rounded-lg border shadow-sm">
                  <AnswerCart  contact={answer} />
                </div>
              ))}
            </div>
          </div>

          <form
            className="flex flex-col gap-5 w-full mt-10 max-w-2xl px-5 py-5 m-auto bg-white rounded-2xl shadow dark:bg-gray-800"
            onSubmit={handleFormSubmit}
          >
            <AnswerForm
              answerContent={answerContent}
              handleFieldChange={handleContactChange}
              error_message={error_message}
              success_message={success_message}
              validation_errors={validation_errors}
            />
            <button
              disabled={create_update_spinner}
              type="submit"
              className="py-2 px-4 flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              {create_update_spinner ? (
                <RefreshIcon className="w-6 h-6 text-white animate-spin" />
              ) : (
                <span>ارسال </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const AnswerCart = ({ contact }: { contact: GetContact }) => {
  return (
    <div className="box-body">
      <div className="flex flex-col">
        <div className="flex  items-center justify-start gap-2">
          <label className="text-lg whitespace-nowrap text-fuchsia-900">
            نام فرستنده:
          </label>
          <div className=" w-full px-4 text-sm text-gray-700">
            {contact.name}
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        <div className="flex items-center justify-start gap-2">
          <label className="text-md whitespace-nowrap text-fuchsia-900">
            ایمیل
          </label>
          <div className=" w-full py-2 px-4 text-gray-700">{contact.email}</div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 mt-5 w-full">
        <div className="flex flex-col items-start gap-2">
          <label className="text-md whitespace-nowrap text-fuchsia-900">
            متن پست
          </label>
          <div className=" w-full py-2 px-4 text-gray-700">
            {contact.content}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowPage;
