import axios, { AxiosInstance } from "axios";

// create instance of axios
export const Axios: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
});

// create instance of axios for apis - add token in to the request header
export const ApiAxios: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization:
      "Bearer " + JSON.parse(localStorage.getItem("user.api_token") || ""),
  },
});

/**
 * create apis
 *
 * @cateory api
 * @return apis
 */
const Apis = {
  dashboard: () => ApiAxios.get("/dashboard"),
};

export default Apis;