import axios, { AxiosInstance } from "axios";
import { getLocalStorageValue } from "../utils/helper";
// create instance of axios
export const Axios = () : AxiosInstance => axios.create({
  baseURL: "http://localhost:8000/api",
});

// create instance of axios for apis - add token in to the request header
export const ApiAxios = () : AxiosInstance => {
  return axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
      Authorization:
        "Bearer " + getLocalStorageValue("user.api_token"),
    },
  })
};

/**
 * create apis
 *
 * @cateory api
 * @return apis
 */
const Apis = {
  dashboard: () => ApiAxios().get("/dashboard"),
};

export default Apis;
