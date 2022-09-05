import type { GetUser } from "../types/user";

/**
 * Save authenticated user data in the local storage
 * @param user
 */
export const saveUserDataInLocalStorage = (user: GetUser) => {
  (Object.keys(user) as (keyof GetUser)[]).forEach((key) => {
    localStorage.setItem("user." + key, JSON.stringify(user[key]));
  });
};

/**
 * Get authenticated user data from the local storage by data key
 */
export const getLocalStorageValue = (key: string): string | undefined => {
  const value = localStorage.getItem(key);
  if (value !== null) return JSON.parse(value);
  return undefined;
};

/**
 * Truncate a long string and return substring
 */
export const str_truncate = (str: string, n: number = 100): string => {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
};
