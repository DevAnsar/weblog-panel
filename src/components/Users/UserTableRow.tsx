import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import type { GetUser } from "../../types/user";
import { useUserDelete } from "../../hooks/useUser";
import UserLogoIcon from "../../assets/images/user-1.jpg";
/**
 * Table tr for user.
 *
 * This component takes user information and creates tr instance to show in the table.
 * @category core
 * @param user user information GetUser
 * @returns React component
 */
const UserTableRow = ({ user }: { user: GetUser }) => {
  // create users delete handler
  const handleuserDelete = useUserDelete({ user });

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user.id}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <img
          alt=""
          src={user.image_url || UserLogoIcon}
          className="w-9 h-9 rounded-full"
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user.is_admin === 1 && (
          <span className="text-green-600 text-sm bg-green-100 border-green-600 border-md px-2 py-1 whitespace-no-wrap rounded-lg">
            ادمین
          </span>
        )}

        {user.is_admin !== 1 && (
          <span className="text-gray-800 text-sm bg-gray-100 border-gray-600 border-md px-2 py-1  whitespace-no-wrap rounded-lg">
            کاربر عادی
          </span>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="text-gray-900 whitespace-no-wrap">
          {user.created_at}
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className=" flex items-center gap-5 w-full">
          <Link
            to={"/users/edit/" + user.id}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <PencilIcon className="w-5 text-slate-500 hover:text-blue-500" />
          </Link>
          <button onClick={handleuserDelete} className="btn btn-danger btn-sm">
            <TrashIcon className="w-5 text-slate-500 hover:text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
