import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
// partials
import UserForm from "../../components/Users/UserForm";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { useUserFieldChange } from "../../hooks/useUser";
// actions
import {
  setUserDefaults,
  resetUserFields,
  addUser,
} from "../../store/slices/userSlice";

/**
 * user create page.
 *
 * @category pages
 * @returns React component
 */
const AddPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // user field change  handler
  const handleUserChangeFn = useUserFieldChange();

  // take users information from redux store
  const {
    user,
    success_message,
    error_message,
    validation_errors,
    create_update_spinner,
  } = useAppSelector((state) => state.user);

  // Refreshing and initializing user store
  useEffect(() => {
    dispatch(setUserDefaults());
    dispatch(resetUserFields());
  }, []);

  // user create form submit handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addUser({
        data: user,
        cb: () => {
          dispatch(resetUserFields());
          setTimeout(() => navigate("/users"), 2000);
        },
      })
    );
  };

  return (
    <div className="flex flex-col min-h-full">
      <Breadcrumb />
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <div className="py-8">
          <form className="flex w-full" onSubmit={handleFormSubmit}>
            <div className="w-full max-w-2xl px-5 py-5 m-auto bg-white rounded-2xl shadow dark:bg-gray-800">
              <div className="mb-5 text-base text-gray-800 dark:text-white">
                ایجاد کاربر جدید
              </div>
              <div className="grid max-w-xl grid-cols-2 gap-4 m-auto">
                <UserForm
                  user={user}
                  create_update_spinner={create_update_spinner}
                  success_message={success_message}
                  error_message={error_message}
                  handleUserChange={handleUserChangeFn}
                  validation_errors={validation_errors}
                />
                <div className="col-span-2 text-right">
                  <button
                    type="submit"
                    className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    ثبت کاربر جدید
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
