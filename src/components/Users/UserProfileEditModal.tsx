import { useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import UserForm from "../../components/Users/UserForm";
import { useHandleUserEditForm, useUserFieldChange } from "../../hooks/useUser";
import { showUser } from "../../store/slices/userSlice";

const UserProfileEditModal: React.FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
  const dispatch = useAppDispatch();
  const {
    user,
    create_update_spinner,
    error_message,
    validation_errors,
    success_message,
  } = useAppSelector((state) => state.user);

  // Refreshing and initializing user store and geting user data for show in the UserForm
  useEffect(() => {
    dispatch(showUser({ id: localStorage.getItem("user.id") || "0" }));
  }, [show]);

  // user field change  handler
  const handleUserChangeFn = useUserFieldChange();

  // user edit form submit handler
  const handleFormSubmit = useHandleUserEditForm({
    data: user,
    user_id: user.id.toString() || "0",
    navigateTo: false,
    cb: () => setTimeout(() => onClose(), 1500),
  });

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-sm font-sm leading-6 text-gray-800 text-right"
                >
                  افزودن تگ جدید
                </Dialog.Title>
                <div className="mt-2">
                  <form role="form" method="post" onSubmit={handleFormSubmit}>
                    <UserForm
                      user={user}
                      handleUserChange={handleUserChangeFn}
                      create_update_spinner={create_update_spinner}
                      error_message={error_message}
                      success_message={success_message}
                      validation_errors={validation_errors}
                    />

                    <div className="mt-4 flex gap-5 justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={onClose}
                      >
                        بیخیال
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      >
                        ذخیره
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserProfileEditModal;
