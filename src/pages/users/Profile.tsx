import { useEffect, useState } from "react";
import UserLogoIcon from "../../assets/images/user-1.jpg";
// partials
import Breadcrumb from "../../components/partials/Breadcrumb";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  setUserDefaults,
  resetUserFields,
  showUser,
} from "../../store/slices/userSlice";

import UserProfileEditModal from "./../../components/Users/UserProfileEditModal";
/**
 * user profile page.
 *
 * @category pages
 * @returns React component
 */
const UserProfile = () => {
  const dispatch = useAppDispatch();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const { user } = useAppSelector((state) => state.user);

  // Refreshing and initializing user store and geting user data for show in the UserForm
  useEffect(() => {
    dispatch(setUserDefaults());
    dispatch(resetUserFields());
    dispatch(showUser({ id: localStorage.getItem("user.id") || "0" }));
  }, []);

  /**
   * Show edit modal dialog when client click on edit button
   */
  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  /**
   * Close edit modal dialog when client click on close button
   */
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="flex flex-col min-h-full">
      <Breadcrumb />
      <div className="container mx-auto px-4 sm:px-8 max-w-6xl">
        <div className="py-8">
          <div className="w-full max-w-2xl px-5 py-5 m-auto bg-white rounded-2xl shadow dark:bg-gray-800">
            <div className="mb-5 text-base text-gray-800 dark:text-white">
              پروفایل من
            </div>
            <div className="flex gap-5">
              <img
                alt="profil"
                src={UserLogoIcon}
                className="mx-auto object-cover rounded-full h-16 w-16 "
              />

              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between item-center h-16">
                  <div>
                    <h1 className="text-base text-gray-800">{user.name}</h1>
                    <h1 className="text-sm text-slate-500">{user.email}</h1>
                  </div>

                  <span>
                    تاریخ عضویت:
                    {user.created_at}
                  </span>
                </div>

                <p className="text-slate-500 text-base">
                  توضیحات پروفایل کاربر
                </p>
                <div className="flex justify-end w-full mt-5">
                  <button
                    className="px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-700 rounded-lg"
                    onClick={handleShowEditModal}
                  >
                    ویرایش
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserProfileEditModal
        show={showEditModal}
        onClose={handleCloseEditModal}
      />
    </div>
  );
};

export default UserProfile;
