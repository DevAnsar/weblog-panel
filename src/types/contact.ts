import type { GetPaginationWithData } from "./index";

/**
 * Contact interface
 * @public
 */
export interface GetContact {
  id: number;
  name: string;
  email: string;
  content: string;
  seen: boolean;
  parent_id: number;
  answers : GetContact[];
  answers_count ? : number;
}

/**
 * Create initial data for contant slice
 *
 *  * Structure:
 * ```
 * export interface GetContactInitialState {
 * contacts: GetPaginationWithData<GetContact[]>;
 * contact: GetContact;
 * success_message: string;
 * error_message: string;
 * validation_errors: GetUserValidationFields;
 * list_spinner: boolean;
 * create_update_spinner: boolean;
 * page?: number;
 * }
 * ```
 */
export interface GetContactInitialState {
  contacts: GetPaginationWithData<GetContact[]>;
  contact: GetContact;
  answerContent : string,
  success_message: string;
  error_message: string;
  validation_errors: GetContactValidationFields;
  list_spinner: boolean;
  create_update_spinner: boolean;
  page?: number;
}

export interface CreateContactValidationErrors {
  errors: GetContactValidationFields;
  message: string;
}

/**
 * Contact validation data in the ContactForm used in the contact slice
 *
 * Structure:
 * ```
 * export interface GetContactValidationFields {
 *   content : null | [""];
 * }
 * ```
 *
 */
export interface GetContactValidationFields {
  content: null | [""];
}
