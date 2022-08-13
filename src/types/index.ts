/**
 * Pagination per page data type
 * @public
 */
export interface GetPagination{
  current_page: number;
  last_page: number;
  per_page : number;
  total : number;
}

/**
 * Pagination data types
 *
 * @template T the type used for the action type.
 *
 * @public
 */
export interface GetPaginationWithData<T> extends GetPagination{
  data : T
}

/**
 * GetBreadcrumb links data type
 * @public
 */
export interface GetBreadcrumbLink{
  text : string;
  url : string;
  icon? : string
}

/**
 *  Sidebar items type
 * @public
 */
export interface GetSidebarItem{
  id: string;
  title : string;
  Icon : any;
  link : string;
}