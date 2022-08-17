import type { GetPaginationWithData } from "./index";
import type { GetTag } from "./tag";
import type { GetCategory } from "./category";
import type {GetUser} from "./user";

/**
 * Post interface
 * @public
 */
export interface GetPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  image_url :string;
  date_formatted : string;
  published: number;
  category_id: string;
  category: GetCategory;
  tags: number[];
  user : GetUser;
}

/**
 * Create initial data for cateory slice
 *
 *  * Structure:
 * ```
 * export interface GetPostInitialState {
 * posts: GetPaginationWithData<GetPost[]>;
 * all_posts : [],
 * post: GetPost;
 * success_message: string;
 * error_message: string;
 * validation_errors: GetUserValidationFields;
 * list_spinner: boolean;
 * create_update_spinner: boolean;
 * page?: number;
 * }
 * ```
 */
export interface GetPostInitialState {
  posts: GetPaginationWithData<GetPost[]>;
  post: GetPost;
  success_message: string;
  error_message: string;
  validation_errors: GetPostValidationFields;
  list_spinner: boolean;
  create_update_spinner: boolean;
  page?: number;
}

export interface CreatePostValidationErrors {
  errors: GetPostValidationFields;
  message: string;
}

/**
 * User validation data in the UserForm used in the user slice
 *
 * Structure:
 * ```
 * export interface GetPostValidationFields {
 *    title: null | [""];
 * }
 * ```
 *
 */
export interface GetPostValidationFields {
  title: null | [""];
  excerpt: null | [""];
  content : null | [""];
  category_id : null | [""];
  image : null | [""];
}
