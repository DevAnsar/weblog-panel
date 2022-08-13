import {ApiAxios} from "./index";

/** 
* create user CRUD apis
*
* @cateory api
* @return User apis
*/
const User = {
    list: (page = 1) => {
        return ApiAxios.get("/users?page=" + page );
    },
    add: (payload: any) => {
        return ApiAxios.post("/users", payload);
    },
    showOne: (id : number) => {
        return ApiAxios.get("/users/" + id);
    },
    edit: (payload :any, id : number) => {
        return ApiAxios.put("/users/" + id, payload);
    },
    remove: (id : number) => {
        return ApiAxios.delete("/users/" + id);
    },
};
export default User;
