import { useAppDispatch } from "../store/hooks";
// actions
import { handleUserChange } from "../store/slices/user";


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
    if (e.target.name == "is_admin") {
      dispatch(
        handleUserChange({
          field: e.target.name,
          data: e.target.value,
          checked: e.target.checked,
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
