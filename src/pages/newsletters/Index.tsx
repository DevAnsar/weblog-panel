import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { Link } from "react-router-dom";
import { PlusIcon, ShieldExclamationIcon } from "@heroicons/react/solid";
import Spinner from "../../components/partials/Spinner";
import Pagination from "../../components/partials/Pagination";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";
import { listNewsletters, setNewsletterDefaults } from "../../store/slices/newsletterSlice";
import NewsletterTableHead from "../../components/Newsletters/NewsletterTableHead";
import NewsletterTableRow from "../../components/Newsletters/NewsletterTableRow";

/**
 * Newsletter index page component.
 *
 * The component created for the post list page.
 * @post pages
 * @returns React component
 */
const IndexPage = () => {
  // dispatcher for redux actions
  const dispatch = useAppDispatch();

  // take users information from redux store
  const { newsletters, list_spinner, success_message, error_message } =
    useAppSelector((state) => state.newsletter);

  useEffect(() => {
    dispatch(setNewsletterDefaults());
    dispatch(listNewsletters({ page: 1 }));
  }, []);
  return (
    <div className="flex flex-col min-h-ful">
      <Breadcrumb />
      <div className="container mx-auto lg:px-8 max-w-4xl">
        <div className="py-8">
          <div className="py-4">
            <div className="py-5 flex justify-between">
              <span className="text-gray-800 text-base">ایمیل های عضو شده در خبرنامه</span>
              <Link to="/newsletters/add">
                <button className="flex items-center px-3 py-1 border text-base rounded-xl bg-blue-500 text-white hover:bg-blue-700">
                  <span className="text-sm">ایجاد کاربر</span>
                  <PlusIcon className="w-4 " />
                </button>
              </Link>
            </div>
            <div className="min-w-full shadow rounded-lg bg-white overflow-hidden">
              <SuccessAlert msg={success_message} />
              <ErrorAlert msg={error_message} />
              <div className="w-full  overflow-x-auto inline-block">
                <table className="min-w-full leading-normal">
                  <NewsletterTableHead />
                  <tbody>
                    {newsletters.data &&
                      newsletters.data.map((item) => (
                        <NewsletterTableRow key={item.id} newsletter={item} />
                      ))}
                  </tbody>
                </table>
                {!newsletters.data && (
                  <div className="flex justify-center">
                    <span className="flex justify-center align-center text-base mx-auto my-10 text-gray-500 bg-gray-100 px-4 py-2 rounded-lg text-center whitespace-nowrap">
                      <ShieldExclamationIcon className="w-5 text-gray-500 ml-2" />
                       مشترکی برای نمایش وجود ندارد
                    </span>
                  </div>
                )}
              </div>
              <Pagination data={newsletters} action={listNewsletters} />
            </div>
            <Spinner show={list_spinner} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndexPage;
