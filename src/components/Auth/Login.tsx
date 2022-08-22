import React, { useState, useEffect } from "react";
import { AtSymbolIcon, KeyIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import Auth from "../../apis/Auth";

import type { GetAuthnticationValidationFields } from "./../../types/auth";
import type { GetUser } from "./../../types/user";

import { saveUserDataInLocalStorage } from "../../utils/helper";

/**
 * Login page component.
 *
 * @category layouts
 * @returns React Component
 */
const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error_message, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<GetAuthnticationValidationFields | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.remove("skin-green");
    document.body.classList.add("login-page");
  }, []);

  // email input handler - change email state with input value
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // password input handler - change password state with input value
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Login form handler - this function calls login api and give data to it for get response from server
  // and save token after takes data
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessage(null);
    setErrors(null);

    if (email === "" || password === "") {
      setErrorMessage("Please enter login credentials");
      return false;
    }
    Auth.login(
      { email, password },
      (response) => {
        if (response.user.is_admin === 1) {
          const user: GetUser = response.user;
          saveUserDataInLocalStorage(user);
          // (Object.keys(user) as (keyof GetUser)[]).forEach((key) => {
          //   localStorage.setItem("user." + key, JSON.stringify(user[key]));
          // });
          setTimeout(() => {
            navigate("/", { replace: true });
          }, 500);
        } else {
          localStorage.clear();
          setErrorMessage("Unauthorized");
        }
      },
      (err) => {
        // console.log(err.message);
        setErrorMessage(err.response?.data?.message || err.message);
        setErrors(err.response?.data?.errors || null);
      }
    );
  };

  return (
    <div className="flex justify-center pt-20">
      <div className="p-5 bg-white border border-slate-400 rounded-2xl w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
        <div className="text-center text-gray-800 text-base mb-5">
          ورود به پنل مدیریت
        </div>
        <div className="login-box-body">
          <div className="mb-3">
            {error_message ? (
              <div className="bg-red-200 text-red-500 border border-red-400 rounded text-sm px-3 py-1 mb-3">
                {error_message}
              </div>
            ) : null}
          </div>
          <form
            method="post"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <div
              className={`flex flex-col ${
                errors && errors.email ? "has-error" : ""
              }`}
            >
              <div className="flex gap-3 items-center">
                <AtSymbolIcon className="w-8 h-8 text-blue-500" />
                <input
                  className="bg-white border text-gray-700 text-base border-gray-400 rounded-2xl py-2 px-4 w-full"
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleEmail}
                  value={email}
                />
              </div>
              {errors && errors.email ? (
                <div className="text-red-600 text-sm mt-1">
                  {errors.email[0]}
                </div>
              ) : null}
            </div>

            <div
              className={`flex flex-col ${
                errors && errors.password ? "has-error" : ""
              }`}
            >
              <div className="flex gap-3 items-center">
                <KeyIcon className="w-8 h-8 text-blue-500" />
                <input
                  className="bg-white border text-gray-700 text-base border-gray-400 rounded-2xl py-2 px-4 w-full"
                  type="password"
                  name="password"
                  placeholder="رمز عبور"
                  onChange={handlePassword}
                  value={password}
                />
              </div>
              {errors && errors.password ? (
                <div className="text-red-600 text-sm mt-1">
                  {errors.password[0]}
                </div>
              ) : null}
            </div>
            <div className="flex justify-center items-center w-full">
              <button
                type="submit"
                className="rounded-2xl bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-2/4"
              >
                ورود
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
