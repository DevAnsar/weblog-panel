import { ApiAxios, Axios } from "./index";

/**
 * create Contact CRUD apis
 *
 * @cateory api
 * @return Contact apis
 */
const ContactApis = {
  list: (page = 1) => ApiAxios().get("/contacts?page=" + page),
  showOne: (id: number) => ApiAxios().get("/contacts/" + id),
  remove: (id: number) => ApiAxios().delete("/contacts/" + id),
  answer: (id: number,content: string) => {
    // let form_data = ContactApis.toFormData(data);
    return ApiAxios().post(`/contacts/${id}/answer`, {answer : content});
  }
};
export default ContactApis;
