import type { GetPaginationWithData } from "./index";

/**
 * User interface
 * @public
 */
export interface GetUser {
  id: number;
  email: string;
  name: string;
  is_admin: number;
  created_at: string;
  image: string,
  image_url: string | null,
}

/**
 * Merge `api_token` to `GetUser` interface
 * @public
 */
export interface GetUserWithToken extends GetUser {
  api_token: string;
}

/**
 * Merge `password` to `GetUser` interface
 * @public
 */
export interface GetUserWithPassword extends GetUser {
  password: string;
}

/**
 * Create initial data for user slice
 * 
 *  * Structure:
 * ```
 * export interface GetUserInitialState {
 * users: GetPaginationWithData<GetUser[]>;
 * user: GetUserWithPassword;
 * success_message: string;
 * error_message: string;
 * validation_errors: GetUserValidationFields;
 * list_spinner: boolean;
 * create_update_spinner: boolean;
 * page?: number;
 * }
 * ```
 * @see  https://github.com/DevAnsar/weblog-admin/tree/main/src/store/slices/user.ts#GetUserInitialState
 */
export interface GetUserInitialState {
  users: GetPaginationWithData<GetUser[]>;
  user: GetUserWithPassword;
  success_message: string;
  error_message: string;
  validation_errors: GetUserValidationFields;
  list_spinner: boolean;
  create_update_spinner: boolean;
  page?: number;
}

export interface CreateUserValidationErrors {
  errors: GetUserValidationFields;
  message: string;
}

/**
 * User validation data in the UserForm used in the user slice
 * 
 * Structure:
 * ```
 * export interface GetUserValidationFields {
 *  email: null | [""];
 *  name: null | [""];
 *  password: null | [""];
 *  is_admin: null | [""];
 *  image : null | [""];
 * }
 * ```
 * @see  https://github.com/DevAnsar/weblog-admin/tree/main/src/store/slices/user.ts#GetUserValidationFields
 */
export interface GetUserValidationFields {
  email: null | [""];
  name: null | [""];
  password: null | [""];
  is_admin: null | [""];
  image : null | [""];
}
