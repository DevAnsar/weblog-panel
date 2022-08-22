import { useAppSelector, useAppDispatch } from "../store/hooks";
import {
  listUsers,
  deleteUser,
  editUser,
  handleUserChange,
} from "../store/slices/userSlice";
import type { GetUser, GetUserWithPassword } from "../types/user";
import { useNavigate } from "react-router-dom";

/**
 * User delete handlers hook.
 *
 * This hook takes user information and create delete function with React hook rules.
 * @category core
 * @param user user information type:<GetUser>
 * @returns React hook
 */
export const useUserDelete = ({ user }: { user: GetUser }) => {
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

  return handleDelete;
};

/**
 * User data change handlers hook.
 *
 * This hook takes input event and create function with React hook rules for change user fields in the redux store.
 * @category core
 * @returns React hook
 */
export const useUserFieldChange = () => {
  const dispatch = useAppDispatch();

  const handleUserChangeFn = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "is_admin") {
      dispatch(
        handleUserChange({
          field: e.target.name,
          data: e.target.value,
          checked: e.target.checked,
        })
      );
    } else if (e.target.name === "image") {
      dispatch(
        handleUserChange({
          field: e.target.name,
          data: (e.target as HTMLInputElement).files![0],
        })
      );
    } else {
      dispatch(
        handleUserChange({ field: e.target.name, data: e.target.value })
      );
    }
  };

  return handleUserChangeFn;
};

/**
 * user edit form submit handler hook
 *
 * This hook takes user information and create delete function with React hook rules.
 * @category core
 * @param e React.FormEvent<HTMLFormElement>
 * @param user_id user id
 * @returns React hook
 */
export const useHandleUserEditForm = ({
  data,
  user_id,
  navigateTo = false,
  cb,
}: {
  data: GetUserWithPassword;
  user_id: string;
  navigateTo: string | boolean;
  cb?: (user? : GetUser) => void;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      editUser({
        id: user_id,
        data,
        cb: (user) => {
          if (navigateTo) {
            setTimeout(() => navigate(navigateTo.toString()), 2000);
          } else {
            cb && cb(user);
          }
        },
      })
    );
  };

  return handleFormSubmit;
};
