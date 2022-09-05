import { Link } from "react-router-dom";
import { EyeIcon, TrashIcon } from "@heroicons/react/solid";
import type { GetContact } from "../../types/contact";
import { useContactDelete } from "../../hooks/useContactDelete";
import { str_truncate } from "../../utils/helper"

/**
 * Table tr for contact.
 *
 * This component takes contact information and creates tr instance to show in the table.
 * @contact core
 * @param contact contact information `GetContact`
 * @returns React component
 */
const ContactTableRow = ({ contact }: { contact: GetContact }) => {
  // create users delete handler
  const handleContactDelete = useContactDelete({ contact });

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{contact.id}</p>
      </td>
      <td className="px-5 py-5 whitespace-nowrap border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{contact.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{contact.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{str_truncate(contact.content)}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {contact.seen ? (
          <span className="whitespace-nowrap text-green-600 text-sm bg-green-100 border-green-600 border-md px-2 py-1 whitespace-no-wrap rounded-lg">
            شده
          </span>
        ) : (
          <span className="whitespace-nowrap text-gray-800 text-sm bg-gray-100 border-gray-600 border-md px-2 py-1  whitespace-no-wrap rounded-lg">
            نشده
          </span>
        )}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className=" flex items-center gap-5 w-full">
          <Link
            to={"/contact-us/show/" + contact.id}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <EyeIcon className="w-5 text-slate-500 hover:text-blue-500" />
          </Link>
          <button
            onClick={handleContactDelete}
            className="btn btn-danger btn-sm"
          >
            <TrashIcon className="w-5 text-slate-500 hover:text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ContactTableRow;
