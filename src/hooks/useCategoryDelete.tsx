import { useAppSelector, useAppDispatch } from "../store/hooks";
import { listCategories,deleteCategory } from "../store/slices/categorySlice";
import type { GetCategory } from "../types/category";

/**
 * Category delete handlers hook.
 * 
 * This hook takes category information and create delete function with React hook rules.
 * @category core
 * @param category category information type:<GetCategory>
 * @returns React hook
 */
export const useCategoryDelete = ({category}:{category : GetCategory}) => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.category);

  /**
   * Category destroy event handler.
   *
   * This function fires "window.confirm" to take the answer from the client and then dispatch deleteCategory action.
   * @category categorys
   * @param event
   * @returns React component
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      dispatch(
        deleteCategory({
          id: category.id,
          cb: () => {
            dispatch(listCategories({ page: page || 1 }));
          },
        })
      );
    }
  };

  return handleDelete
};
