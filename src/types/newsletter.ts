import type { GetPaginationWithData } from "./index";

/**
 * Newsletter interface
 * @public
 */
export interface GetNewsletter {
  id: number;
  email: string;
}

/**
 * Create initial data for newsletter slice
 * 
 *  * Structure:
 * ```
 * export interface GetNewsletterInitialState {
 * newsletters: GetPaginationWithData<GetNewsletter[]>;
 * newsletter: GetNewsletter;
 * success_message: string;
 * error_message: string;
 * validation_errors: GetUserValidationFields;
 * list_spinner: boolean;
 * create_update_spinner: boolean;
 * page?: number;
 * }
 * ```
 */
export interface GetNewsletterInitialState {
  newsletters: GetPaginationWithData<GetNewsletter[]>;
  newsletter: GetNewsletter;
  success_message: string;
  error_message: string;
  validation_errors: GetNewsletterValidationFields;
  list_spinner: boolean;
  create_update_spinner: boolean;
  page?: number;
}

export interface CreateNewsletterValidationErrors {
  errors: GetNewsletterValidationFields;
  message: string;
}

/**
 * User validation data in the UserForm used in the user slice
 * 
 * Structure:
 * ```
 * export interface GetNewsletterValidationFields {
 *    email: null | [""];
 * }
 * ```
 *
 */
export interface GetNewsletterValidationFields {
  email: null | [""];
}
