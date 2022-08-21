import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
// partials
import UserForm from "../../components/Users/UserForm";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { useUserFieldChange } from "../../hooks/useUser";
import {useHandleUserEditForm} from "../../hooks/useUser"

// actions
import {
  showUser,
  setUserDefaults,
  resetUserFields,
} from "../../store/slices/userSlice";

/**
 * user edit page.
 *
 * @category pages
 * @returns React component
 */
const EditPage = () => {
  //get user id from the dynamic params from the current URL
  const { id } = useParams();

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

  // Refreshing and initializing user store and geting user data for show in the UserForm
  useEffect(() => {
    dispatch(setUserDefaults());
    dispatch(resetUserFields());
    dispatch(showUser({ id: id || "0" }));
  }, []);

  // user edit form submit handler
  const handleFormSubmit = useHandleUserEditForm({data : user , user_id : id || "0",navigateTo : "/users"});

  return (
    <div className="flex flex-col min-h-full">
      <Breadcrumb />
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <div className="py-8">
          <form className="flex w-full" onSubmit={handleFormSubmit}>
            <div className="w-full max-w-2xl px-5 py-5 m-auto bg-white rounded-2xl shadow dark:bg-gray-800">
              <div className="mb-5 text-base text-gray-800 dark:text-white">
                ویرایش کاربر
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
                    ویرایش کاربر
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
