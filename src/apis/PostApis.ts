import { ApiAxios, Axios } from "./index";

/**
 * create post CRUD apis
 *
 * @cateory api
 * @return Post apis
 */
const PostApis = {
  list: (page = 1) => Axios.get("/posts?page=" + page),
  add: (data: any) => {
    let form_data = PostApis.toFormData(data);
    return ApiAxios.post("/posts", form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  showOne: (id: number) => Axios.get("/posts/" + id),
  edit: (data: any, id: number) => {
    let form_data = PostApis.toFormData(data);
    form_data.append("_method", "PUT");
    return ApiAxios.post("/posts/" + id, form_data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  remove: (id: number) => ApiAxios.delete("/posts/" + id),
  toFormData: (payload: any) => {
    const formData = new FormData();
    for (let key in payload) {
      if (key != "tags") {
        formData.append(key, payload[key]);
      } else {
        for (let i = 0; i < payload[key].length; i++) {
          formData.append("tags[]", payload[key][i]);
        }
      }
    }
    return formData;
  },
};
export default PostApis;
