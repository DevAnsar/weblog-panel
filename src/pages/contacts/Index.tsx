import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { ShieldExclamationIcon } from "@heroicons/react/solid";
import Spinner from "../../components/partials/Spinner";
import Pagination from "../../components/partials/Pagination";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";
import {
  listContacts,
  setContactDefaults,
} from "../../store/slices/contactSlice";
import ContactTableHead from "../../components/Contacts/ContactTableHead";
import ContactTableRow from "../../components/Contacts/ContactTableRow";

/**
 * Contact index page component.
 *
 * The component created for the contact list page.
 * @category pages
 * @returns React component
 */
const IndexPage = () => {
  // dispatcher for redux actions
  const dispatch = useAppDispatch();

  // take users information from redux store
  const { contacts, list_spinner, success_message, error_message } =
    useAppSelector((state) => state.contact);

  useEffect(() => {
    dispatch(setContactDefaults());
    dispatch(listContacts({ page: 1 }));
  }, []);
  return (
    <div className="flex flex-col min-h-ful">
      <Breadcrumb />
      <div className="container mx-auto lg:px-8 max-w-4xl">
        <div className="py-8">
          <div className="py-4">
            <div className="py-5 flex justify-between">
              <span className="text-gray-800 text-base">پست ها</span>
            </div>
            <div className="min-w-full shadow rounded-lg bg-white overflow-hidden">
              <SuccessAlert msg={success_message} />
              <ErrorAlert msg={error_message} />
              <div className="w-full  overflow-x-auto inline-block">
                <table className="min-w-full leading-normal">
                  <ContactTableHead />
                  <tbody>
                    {contacts.data &&
                      contacts.data.map((item) => (
                        <ContactTableRow key={item.id} contact={item} />
                      ))}
                  </tbody>
                </table>
                {contacts.data.length === 0 && (
                  <div className="flex justify-center">
                    <span className="flex justify-center align-center text-base mx-auto my-10 text-gray-500 bg-gray-100 px-4 py-2 rounded-lg text-center whitespace-nowrap">
                      <ShieldExclamationIcon className="w-5 text-gray-500 ml-2" />
                      پیامی برای نمایش وجود ندارد
                    </span>
                  </div>
                )}
              </div>
              <Pagination data={contacts} action={listContacts} />
            </div>
            <Spinner show={list_spinner} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndexPage;
