import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import type { GetTag } from "../../types/tag";
import { useTagDelete } from "../../hooks/useTagDelete";

/**
 * Table tr for tag.
 *
 * This component takes tag information and creates tr instance to show in the table.
 * @tag core
 * @param tag tag information `GetTag`
 * @returns React component
 */
const TagTableRow = ({ tag }: { tag: GetTag }) => {
  // create users delete handler
  const handleTagDelete = useTagDelete({ tag });

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{tag.id}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{tag.title} </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center gap-5">
        <Link
          to={"/tags/edit/" + tag.id}
          className="text-indigo-600 hover:text-indigo-900"
        >
          <PencilIcon className="w-5 text-slate-500 hover:text-blue-500" />
        </Link>
        <a
          href="#"
          onClick={handleTagDelete}
          className="btn btn-danger btn-sm"
        >
          <TrashIcon className="w-5 text-slate-500 hover:text-red-500" />
        </a>
      </td>
    </tr>
  );
};

export default TagTableRow;
