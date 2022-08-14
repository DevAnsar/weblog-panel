import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import type { GetCategory } from "../../types/category";
import { useCategoryDelete } from "../../hooks/useCategoryDelete";

/**
 * Table tr for category.
 *
 * This component takes category information and creates tr instance to show in the table.
 * @category core
 * @param category category information `GetCategory`
 * @returns React component
 */
const CategoryTableRow = ({ category }: { category: GetCategory }) => {
  // create users delete handler
  const handleCategoryDelete = useCategoryDelete({ category });

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{category.id}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{category.title} </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="text-gray-900 whitespace-no-wrap">
          {category.slug}
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center gap-5">
        <Link
          to={"/categories/edit/" + category.id}
          className="text-indigo-600 hover:text-indigo-900"
        >
          <PencilIcon className="w-5 text-slate-500 hover:text-blue-500" />
        </Link>
        <a
          href="#"
          onClick={handleCategoryDelete}
          className="btn btn-danger btn-sm"
        >
          <TrashIcon className="w-5 text-slate-500 hover:text-red-500" />
        </a>
      </td>
    </tr>
  );
};

export default CategoryTableRow;
