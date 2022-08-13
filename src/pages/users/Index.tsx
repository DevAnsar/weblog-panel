import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import type { GetUser } from "../../types/user";
import Spinner from "../../components/partials/Spinner";
import Pagination from "../../components/partials/Pagination";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";
import { listUsers, setUserDefaults } from "../../store/slices/user";
import UserTableHead from "../../components/Users/UserTableHead";
import UserTableRow from "../../components/Users/UserTableRow";

/**
 * Index page component.
 *
 * The component created for the users list page.
 * @category pages
 * @returns React component
 */
const IndexPage = () => {
  // dispatcher for redux actions
  const dispatch = useAppDispatch();

  // take users information from redux store
  const { users, list_spinner, success_message, error_message } =
    useAppSelector((state) => state.user);

  // Refreshing and initializing user data and getting a list of users in the first load
  useEffect(() => {
    dispatch(setUserDefaults());
    dispatch(listUsers({ page: 1 }));
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      <Breadcrumb />
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="px-5 py-5 flex justify-between">
              <span className="text-gray-800 text-base">کاربران</span>
              <Link to="/users/add">
                <button className="flex items-center px-3 py-1 border text-base rounded-xl bg-blue-500 text-white hover:bg-blue-700">
                  <span className="text-sm">ایجاد کاربر</span>
                  <PlusIcon className="w-4 " />
                </button>
              </Link>
            </div>
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-white ">
              <SuccessAlert msg={success_message} />
              <ErrorAlert msg={error_message} />
              <table className="min-w-full leading-normal">
                <UserTableHead />
                <tbody>
                  {users.data
                    ? users.data.map((item: GetUser) => (
                        <UserTableRow key={item.id} user={item} />
                      ))
                    : null}
                </tbody>
              </table>
              <Pagination data={users} />
            </div>
            <Spinner show={list_spinner} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
