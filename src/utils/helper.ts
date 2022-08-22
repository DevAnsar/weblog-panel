import type { GetUser } from "../types/user";

/**
 * Save authenticated user data in the local storage
 * @param user 
 */
export const saveUserDataInLocalStorage = (user : GetUser) => {
  (Object.keys(user) as (keyof GetUser)[]).forEach((key) => {
    localStorage.setItem("user." + key, JSON.stringify(user[key]));
  });
};

/**
 * Get authenticated user data from the local storage by data key
 */
export const getLocalStorageValue = (key : string) => JSON.parse(localStorage.getItem(key)|| "");
