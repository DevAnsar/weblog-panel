import { useAppSelector, useAppDispatch } from "../store/hooks";
import { listContacts,deleteContact } from "../store/slices/contactSlice";
import type { GetContact } from "../types/contact";

/**
 * Contact delete handlers hook.
 * 
 * This hook takes contact information and create delete function with React hook rules.
 * @contact core
 * @param contact contact information type:<GetContact>
 * @returns React hook
 */
export const useContactDelete = ({contact}:{contact : GetContact}) => {
  const dispatch = useAppDispatch();
  const { page } = useAppSelector((state) => state.contact);

  /**
   * Contact destroy event handler.
   *
   * This function fires "window.confirm" to take the answer from the client and then dispatch deleteContact action.
   * @contact contacts
   * @param event
   * @returns React component
   */
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm("Are you sure?")) {
      dispatch(
        deleteContact({
          id: contact.id,
          cb: () => {
            dispatch(listContacts({ page: page || 1 }));
          },
        })
      );
    }
  };

  return handleDelete
};
