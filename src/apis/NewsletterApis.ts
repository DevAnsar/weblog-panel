import {ApiAxios,Axios} from "./index";

/** 
* create category CRUD apis
*
* @cateory api
* @return Newsletter apis
*/
const NewsletterApis = {
    list: (page = 1) =>  Axios().get("/newsletters?page=" + page),
    add: (email : string) => ApiAxios().post("/newsletters",{ email }),
    showOne: (id : number) => Axios().get("/newsletters/" + id),
    edit: (email : string, id : number) =>ApiAxios().put("/newsletters/" + id,{ email }),
    remove: (id :number) =>ApiAxios().delete("/newsletters/" + id)
};
export default NewsletterApis;
