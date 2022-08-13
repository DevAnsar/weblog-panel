import { useAppSelector, useAppDispatch } from "../store/hooks";
import { listUsers,deleteUser } from "../store/slices/user";
import type { GetUser } from "../types/user";

/**
 * User delete handlers hook.
 * 
 * This hook takes user information and create delete function with React hook rules.
 * @category core
 * @param user user information type:<GetUser>
 * @returns React hook
 */
export const useUserDelete = ({user}:{user : GetUser}) => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.user);

  /**
   * User destroy event handler.
   *
   * This function fires "window.confirm" to take the answer from the client and then dispatch deleteUser action.
   * @category users
   * @param event
   * @returns React component
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      dispatch(
        deleteUser({
          id: user.id,
          cb: () => {
            dispatch(listUsers({ page: page || 1 }));
          },
        })
      );
    }
  };

  return handleDelete
};
