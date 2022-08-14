import type { GetPaginationWithData } from "./index";

/**
 * Category interface
 * @public
 */
export interface GetCategory {
  id: number;
  title: string;
  slug: string;
}

/**
 * Create initial data for cateory slice
 * 
 *  * Structure:
 * ```
 * export interface GetCategoryInitialState {
 * categories: GetPaginationWithData<GetCategory[]>;
 * all_categories : [],
 * category: GetCategory;
 * success_message: string;
 * error_message: string;
 * validation_errors: GetUserValidationFields;
 * list_spinner: boolean;
 * create_update_spinner: boolean;
 * page?: number;
 * }
 * ```
 */
export interface GetCategoryInitialState {
  categories: GetPaginationWithData<GetCategory[]>;
  all_categories : [],
  category: GetCategory;
  success_message: string;
  error_message: string;
  validation_errors: GetCategoryValidationFields;
  list_spinner: boolean;
  create_update_spinner: boolean;
  page?: number;
}

export interface CreateCategoryValidationErrors {
  errors: GetCategoryValidationFields;
  message: string;
}

/**
 * User validation data in the UserForm used in the user slice
 * 
 * Structure:
 * ```
 * export interface GetCategoryValidationFields {
 *    title: null | [""];
 * }
 * ```
 *
 */
export interface GetCategoryValidationFields {
  title: null | [""];
}
