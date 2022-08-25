import { Axios } from "./index";
import axios, { AxiosError } from "axios";
import type {
  GetLoginResponse,
  GetLoginErrors,
  GetLogoutResponse,
  GetLogoutErrors,
  GetCheckAuthResponse,
  GetCheckAuthErrors,
} from "./../types/auth";
import { getLocalStorageValue } from "../utils/helper";

/**
 * create login and logout and checkAuth apis for app.
 *
 * @category api
 * @returns Auth apis
 */

const Auth = {
  login: (
    data: any,
    successCb: (response: GetLoginResponse) => void,
    failCb: (error: AxiosError<GetLoginErrors>) => void
  ) => {
    Axios().post<GetLoginResponse>("/login", data)
      .then((response) => {
        successCb(response.data);
      })
      .catch((error: Error | AxiosError<GetLoginErrors>) => {
        if (axios.isAxiosError(error)) {
          failCb(error);
        } else {
          console.log("unexpected error: ", error);
        }
      });
  },

  logout: (
    successCb: (response: GetLogoutResponse) => void,
    failCb: (error: AxiosError<GetLogoutErrors>) => void
  ) => {
    Axios().get("/logout", {
      headers: {
        Authorization: "Bearer " + getLocalStorageValue("user.api_token"),
      },
    })
      .then((response) => {
        localStorage.clear();
        console.log(response.data);
        successCb(response);
      })
      .catch((error: Error | AxiosError<GetLogoutErrors>) => {
        if (axios.isAxiosError(error)) {
          failCb(error);
        } else {
          console.log("unexpected error: ", error);
        }
      });
  },

  checkAuth: (
    successCb: (response: GetCheckAuthResponse) => void,
    failCb: (error: AxiosError<GetCheckAuthErrors>) => void
  ) => {
    Axios().get<GetCheckAuthResponse>("/check-auth", {
      headers: {
        Authorization: "Bearer " + getLocalStorageValue("user.api_token"),
      },
    })
      .then((response) => {
        successCb(response.data);
      })
      .catch((error: Error | AxiosError<GetCheckAuthErrors>) => {
        if (axios.isAxiosError(error)) {
          failCb(error);
        } else {
          console.log("unexpected error: ", error);
        }
      });
  },
};
export default Auth;
