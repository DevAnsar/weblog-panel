import axios, { Axios } from "axios";
interface newWindow extends Window {
  axios?: Axios;
}
const Window: newWindow = window;

export const axios_starter = () => {
  Window.axios = axios;
  Window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
  Window.axios.defaults.headers.common["Accept"] = "application/json";
  Window.axios.defaults.baseURL = "/api";
};
