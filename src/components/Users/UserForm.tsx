import Spinner from "../partials/Spinner";
import SuccessAlert from "../partials/SuccessAlert";
import ErrorAlert from "../partials/ErrorAlert";
import type {
  GetUserWithPassword,
  GetUserValidationFields,
} from "../../types/user";
import React from "react";

/**
 * User form component.
 *
 * This component creates form content to show in the user form.
 * @category core
 * @param user
 * @param handleUserChange
 * @param create_update_spinner
 * @param success_message
 * @param error_message
 * @param validation_errors
 * @returns React component including user inputs
 */

const UserForm = ({
  user,
  handleUserChange,
  create_update_spinner,
  success_message,
  error_message,
  validation_errors,
}: {
  user: GetUserWithPassword;
  handleUserChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  create_update_spinner: boolean;
  success_message: string;
  error_message: string;
  validation_errors: GetUserValidationFields;
}) => {
  return (
    <div className="col-span-2 lg:col-span-2">
      <Spinner show={create_update_spinner} />
      <SuccessAlert msg={success_message} />
      <ErrorAlert msg={error_message} />
      <div className="flex flex-col gap-5">
        <div className="">
          <input
            name="name"
            value={user?.name || ""}
            type="text"
            id="contact-form-name"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="نام کاربر"
            onChange={handleUserChange}
          />
          {validation_errors !== undefined &&
          validation_errors.hasOwnProperty("name") &&
          validation_errors.name != null ? (
            <div className="text-red-600 text-sm">
              {validation_errors.name[0]}
            </div>
          ) : null}
        </div>

        <div className="">
          <input
            name="email"
            value={user?.email || ""}
            type="email"
            id="contact-form-name"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="ایمیل کاربر"
            onChange={handleUserChange}
          />
          {validation_errors !== undefined &&
          validation_errors.hasOwnProperty("email") &&
          validation_errors.email != null ? (
            <div className="text-red-600 text-sm">
              {validation_errors.email[0]}
            </div>
          ) : null}
        </div>

        <div className="">
          {user?.image_url ? (
            <img
              alt=""
              src={user.image_url}
              className="w-20 h-20 rounded-md mt-2 mb-1"
            />
          ) : null}
          <input
            name="image"
            type="file"
            accept="image/*"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={handleUserChange}
          />
          {validation_errors !== undefined &&
          validation_errors.hasOwnProperty("image") &&
          validation_errors.image != null ? (
            <div className="text-red-600 text-sm">
              {validation_errors.image[0]}
            </div>
          ) : null}
        </div>

        <div className="">
          <textarea
            rows={4}
            name="bio"
            value={user?.bio || ""}
            id="contact-form-name"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="توضیحات بایو کاربر"
            onChange={handleUserChange}
          ></textarea>
          {validation_errors !== undefined &&
          validation_errors.hasOwnProperty("bio") &&
          validation_errors.bio != null ? (
            <div className="text-red-600 text-sm">
              {validation_errors.bio[0]}
            </div>
          ) : null}
        </div>

        <div className="">
          <input
            name="password"
            value={user?.password || ""}
            type="text"
            id="contact-form-name"
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="رمز عبور کاربر"
            onChange={handleUserChange}
          />
          {validation_errors !== undefined &&
          validation_errors.hasOwnProperty("password") &&
          validation_errors.password != null ? (
            <div className="text-red-600 text-sm">
              {validation_errors.password[0]}
            </div>
          ) : null}
        </div>

        <div className="">
          <label>
            <input
              type="checkbox"
              onChange={handleUserChange}
              value="1"
              checked={user?.is_admin === 1}
              name="is_admin"
            />
            ادمین
          </label>
          {validation_errors !== undefined &&
          validation_errors.hasOwnProperty("is_admin") &&
          validation_errors.is_admin != null ? (
            <div className="text-red-600 text-sm">
              {validation_errors.is_admin[0]}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default UserForm;
