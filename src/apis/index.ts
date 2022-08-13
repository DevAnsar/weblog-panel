import axios,{AxiosInstance} from "axios";

// create instance of axios 
export const Axios : AxiosInstance = axios.create({
    baseURL : "http://localhost:8000/api"
});

// create instance of axios for apis - add token in to the request header
export const ApiAxios : AxiosInstance = axios.create({
    baseURL : "http://localhost:8000/api",
    headers : {
        Authorization :  "Bearer " + localStorage.getItem("user.api_token"),
    }
});