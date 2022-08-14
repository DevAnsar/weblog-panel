import { useAppSelector, useAppDispatch } from "../store/hooks";
import { listTags,deleteTag } from "../store/slices/tagSlice";
import type { GetTag } from "../types/tag";

/**
 * Tag delete handlers hook.
 * 
 * This hook takes tag information and create delete function with React hook rules.
 * @tag core
 * @param tag tag information type:<GetTag>
 * @returns React hook
 */
export const useTagDelete = ({tag}:{tag : GetTag}) => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.tag);

  /**
   * Tag destroy event handler.
   *
   * This function fires "window.confirm" to take the answer from the client and then dispatch deleteTag action.
   * @tag tags
   * @param event
   * @returns React component
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      dispatch(
        deleteTag({
          id: tag.id,
          cb: () => {
            dispatch(listTags({ page: page || 1 }));
          },
        })
      );
    }
  };

  return handleDelete
};
