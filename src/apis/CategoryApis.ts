import {ApiAxios,Axios} from "./index";

/** 
* create category CRUD apis
*
* @cateory api
* @return Category apis
*/
const CategoryApis = {
    list: (page = 1) =>  Axios.get("/categories?page=" + page),
    add: (title : string) => ApiAxios.post("/categories",{ title }),
    showOne: (id : number) => Axios.get("/categories/" + id),
    edit: (title : string, id : number) =>ApiAxios.put("/categories/" + id,{ title }),
    remove: (id :number) =>ApiAxios.delete("/categories/" + id),
    listAll: () => Axios.get("/categories?all=1"), // used to populate dropdowns
};
export default CategoryApis;
