import { ApiAxios } from "./index";

/**
 * create user CRUD apis
 *
 * @cateory api
 * @return User apis
 */
const UserApis = {
  list: (page = 1) => {
    return ApiAxios().get("/users?page=" + page);
  },
  add: (payload: any) => {
    let form_data = UserApis.toFormData(payload);
    return ApiAxios().post("/users", form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  showOne: (id: number) => {
    return ApiAxios().get("/users/" + id);
  },
  edit: (payload: any, id: number) => {
    let form_data = UserApis.toFormData(payload);
    form_data.append("_method", "PUT");
    return ApiAxios().post("/users/" + id, form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  remove: (id: number) => {
    return ApiAxios().delete("/users/" + id);
  },
  toFormData: (payload: any) => {
    const formData = new FormData();
    for (let key in payload) {
      formData.append(key, payload[key]);
    }
    return formData;
  },
};
export default UserApis;
