import { useAppSelector, useAppDispatch } from "../store/hooks";
import { listNewsletters,deleteNewsletter } from "../store/slices/newsletterSlice";
import type { GetNewsletter } from "../types/newsletter";

/**
 * Newsletter delete handlers hook.
 * 
 * This hook takes newsletter information and create delete function with React hook rules.
 * @newsletter core
 * @param newsletter newsletter information type:<GetNewsletter>
 * @returns React hook
 */
export const useNewsletterDelete = ({newsletter}:{newsletter : GetNewsletter}) => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.newsletter);

  /**
   * Newsletter destroy event handler.
   *
   * This function fires "window.confirm" to take the answer from the client and then dispatch deleteNewsletter action.
   * @newsletter newsletters
   * @param event
   * @returns React component
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      dispatch(
        deleteNewsletter({
          id: newsletter.id,
          cb: () => {
            dispatch(listNewsletters({ page: page || 1 }));
          },
        })
      );
    }
  };

  return handleDelete
};
