import { UserIcon, LogoutIcon, BellIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import Auth from "../../apis/Auth";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import UserLogoIcon from "../../assets/images/user-1.jpg";
import { Link } from "react-router-dom";
import { getLocalStorageValue } from "../../utils/helper"
/**
 * User manu component -- powered by @headless/react
 *
 * menu list with user profile image in the header component
 *
 * @category layouts
 * @returns React Component
 */
const UserDataMenu = () => {
  const navigate = useNavigate();

  const handleLogout = (e: any) => {
    e.preventDefault();
    Auth.logout(
      (response) => {
        navigate("/login", { replace: true });
      },
      (err) => {
        alert(err.response?.data.message);
      }
    );
  };
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="w-full text-sm font-medium flex text-slate-100 items-center gap-2">
            <img
              alt="profil"
              src={getLocalStorageValue("user.image_url") || UserLogoIcon }
              className="mx-auto object-cover rounded-full h-10 w-10 "
            />
            <p>{getLocalStorageValue("user.name")}</p>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <Link
                    to={`/profile`}
                    className={`${
                      active ? "bg-violet-500 text-violet-50" : "text-gray-700"
                    } group flex w-full items-center rounded-xl px-2 py-2 text-sm`}
                  >
                    <UserIcon
                      className={`ml-2  w-5 ${
                        active ? "text-violet-100" : "text-violet-400"
                      }`}
                      aria-hidden="true"
                    />
                    پروفایل
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-violet-50" : "text-gray-700"
                    } group flex w-full items-center rounded-xl px-2 py-2 text-sm`}
                  >
                    <BellIcon
                      className={`ml-2  w-5 ${
                        active ? "text-violet-100" : "text-violet-400"
                      }`}
                      aria-hidden="true"
                    />
                    اطلاعیه ها
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-red-100 text-red-500" : "text-gray-700"
                    } group flex w-full items-center rounded-xl px-2 py-2 text-sm`}
                  >
                    <LogoutIcon
                      className={`ml-2  w-5 ${
                        active ? "text-red-400" : "text-violet-400"
                      }`}
                      aria-hidden="true"
                    />
                    خروج
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default UserDataMenu;
