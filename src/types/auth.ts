import type { GetUser } from "./user";

export interface GetLoginResponse {
  user: GetUser;
}


/**
 * User validation data in the UserForm used in the user slice
 * 
 * Structure:
 * ```
 * export interface GetAuthnticationValidationFields {
 *  email: null | [""];
 *  password: null | [""];
 * }
 * ```
 */
export interface GetAuthnticationValidationFields {
  email: null | [""];
  password: null | [""];
}

/**
 * GetLoginErrors interface
 * @public
 */
export interface GetLoginErrors {
  message?: string;
  errors?: GetAuthnticationValidationFields;
}

export interface GetLogoutResponse {
  data? : string
}
export interface GetLogoutErrors {
  message?: string;
}

export interface GetCheckAuthResponse {
  state : number;
}

export interface GetCheckAuthErrors{
  message?: string;
}