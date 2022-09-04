import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import type { GetNewsletter } from "../../types/newsletter";
import { useNewsletterDelete } from "../../hooks/useNewsletterDelete";

/**
 * Table tr for newsletter.
 *
 * This component takes newsletter information and creates tr instance to show in the table.
 * @newsletter core
 * @param newsletter newsletter information `GetNewsletter`
 * @returns React component
 */
const NewsletterTableRow = ({ newsletter }: { newsletter: GetNewsletter }) => {
  // create users delete handler
  const handleNewsletterDelete = useNewsletterDelete({ newsletter });

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{newsletter.id}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{newsletter.email} </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center gap-5">
        <Link
          to={"/newsletters/edit/" + newsletter.id}
          className="text-indigo-600 hover:text-indigo-900"
        >
          <PencilIcon className="w-5 text-slate-500 hover:text-blue-500" />
        </Link>
        <a
          href="#"
          onClick={handleNewsletterDelete}
          className="btn btn-danger btn-sm"
        >
          <TrashIcon className="w-5 text-slate-500 hover:text-red-500" />
        </a>
      </td>
    </tr>
  );
};

export default NewsletterTableRow;
