import type { GetPaginationWithData } from "./index";

/**
 * Tag interface
 * @public
 */
export interface GetTag {
  id: number;
  title: string;
}

/**
 * Create initial data for tag slice
 * 
 *  * Structure:
 * ```
 * export interface GetTagInitialState {
 * tags: GetPaginationWithData<GetTag[]>;
 * all_tags : [],
 * tag: GetTag;
 * success_message: string;
 * error_message: string;
 * validation_errors: GetUserValidationFields;
 * list_spinner: boolean;
 * create_update_spinner: boolean;
 * page?: number;
 * }
 * ```
 */
export interface GetTagInitialState {
  tags: GetPaginationWithData<GetTag[]>;
  all_tags : [],
  tag: GetTag;
  success_message: string;
  error_message: string;
  validation_errors: GetTagValidationFields;
  list_spinner: boolean;
  create_update_spinner: boolean;
  page?: number;
}

export interface CreateTagValidationErrors {
  errors: GetTagValidationFields;
  message: string;
}

/**
 * User validation data in the UserForm used in the user slice
 * 
 * Structure:
 * ```
 * export interface GetTagValidationFields {
 *    title: null | [""];
 * }
 * ```
 *
 */
export interface GetTagValidationFields {
  title: null | [""];
}
