import { useAppSelector, useAppDispatch } from "../store/hooks";
import { listPosts,deletePost } from "../store/slices/postSlice";
import type { GetPost } from "../types/post";

/**
 * Post delete handlers hook.
 * 
 * This hook takes post information and create delete function with React hook rules.
 * @post core
 * @param post post information type:<GetPost>
 * @returns React hook
 */
export const usePostDelete = ({post}:{post : GetPost}) => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.post);

  /**
   * Post destroy event handler.
   *
   * This function fires "window.confirm" to take the answer from the client and then dispatch deletePost action.
   * @post posts
   * @param event
   * @returns React component
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      dispatch(
        deletePost({
          id: post.id,
          cb: () => {
            dispatch(listPosts({ page: page || 1 }));
          },
        })
      );
    }
  };

  return handleDelete
};
