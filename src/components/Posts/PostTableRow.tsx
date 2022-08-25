import { Link } from "react-router-dom";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";
import type { GetPost } from "../../types/post";
import { usePostDelete } from "../../hooks/usePostDelete";

/**
 * Table tr for post.
 *
 * This component takes post information and creates tr instance to show in the table.
 * @post core
 * @param post post information `GetPost`
 * @returns React component
 */
const PostTableRow = ({ post }: { post: GetPost }) => {
  // create users delete handler
  const handlePostDelete = usePostDelete({ post });

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{post.id}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{post.title}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <img src={post.image_url} className="w-14 rounded-sm" />
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {post.published === 1 && (
          <span className="whitespace-nowrap text-green-600 text-sm bg-green-100 border-green-600 border-md px-2 py-1 whitespace-no-wrap rounded-lg">
            منتشر شده
          </span>
        )}

        {post.published === 2 && (
          <span className="whitespace-nowrap text-gray-800 text-sm bg-gray-100 border-gray-600 border-md px-2 py-1  whitespace-no-wrap rounded-lg">
            پیش نویس
          </span>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="text-gray-900 whitespace-no-wrap">
          {post.category ? (
            post.category?.title
          ) : (
            <span className="text-sm line-through text-slate-500 whitespace-nowrap">
              فاقد دسته
            </span>
          )}
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="text-gray-900 whitespace-no-wrap">
          {post.user ? (
            post.user?.name
          ) : (
            <span className="text-sm line-through text-slate-500 whitespace-nowrap">
              فاقد نویسنده
            </span>
          )}
        </span>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className=" flex items-center gap-5 w-full">
          <Link
            to={"/posts/edit/" + post.id}
            className="text-indigo-600 hover:text-indigo-900"
          >
            <PencilIcon className="w-5 text-slate-500 hover:text-blue-500" />
          </Link>
          <button onClick={handlePostDelete} className="btn btn-danger btn-sm">
            <TrashIcon className="w-5 text-slate-500 hover:text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default PostTableRow;
