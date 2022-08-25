import {ApiAxios,Axios} from "./index";

/** 
* create category CRUD apis
*
* @cateory api
* @return Tag apis
*/
const TagApis = {
    list: (page = 1) =>  Axios().get("/tags?page=" + page),
    add: (title : string) => ApiAxios().post("/tags",{ title }),
    showOne: (id : number) => Axios().get("/tags/" + id),
    edit: (title : string, id : number) =>ApiAxios().put("/tags/" + id,{ title }),
    remove: (id :number) =>ApiAxios().delete("/tags/" + id),
    listAll: () => Axios().get("/tags?all=1"), // used to populate dropdowns
};
export default TagApis;
