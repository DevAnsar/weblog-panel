import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/solid";
import Spinner from "../../components/partials/Spinner";
import Pagination from "../../components/partials/Pagination";
import SuccessAlert from "../../components/partials/SuccessAlert";
import ErrorAlert from "../../components/partials/ErrorAlert";
import {
  listPosts,
  setPostDefaults,
} from "../../store/slices/postSlice";
import PostTableHead from "../../components/Posts/PostTableHead";
import PostTableRow from "../../components/Posts/PostTableRow";

/**
 * Post index page component.
 *
 * The component created for the post list page.
 * @post pages
 * @returns React component
 */
const IndexPage = () => {
  // dispatcher for redux actions
  const dispatch = useAppDispatch();

  // take users information from redux store
  const { posts, list_spinner, success_message, error_message } =
    useAppSelector((state) => state.post);

  useEffect(() => {
    dispatch(setPostDefaults());
    dispatch(listPosts({ page: 1 }));
  }, []);
  return (
    <div className="flex flex-col min-h-ful">
      <Breadcrumb />

      <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="px-5 py-5 flex justify-between">
              <span className="text-gray-800 text-base">پست ها</span>
              <Link to="/posts/add">
                <button className="flex items-center px-3 py-1 border text-base rounded-xl bg-blue-500 text-white hover:bg-blue-700">
                  <span className="text-sm">ایجاد پست</span>
                  <PlusIcon className="w-4 " />
                </button>
              </Link>
            </div>
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <SuccessAlert msg={success_message} />
              <ErrorAlert msg={error_message} />
              <table className="min-w-full leading-normal">
                <PostTableHead />
                <tbody>
                  {posts.data
                    ? posts.data.map((item) => (
                        <PostTableRow key={item.id} post={item} />
                      ))
                    : null}
                </tbody>
              </table>

              <Pagination data={posts} action={listPosts} />
              <Spinner show={list_spinner} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndexPage;
