import Spinner from "../partials/Spinner";
import SuccessAlert from "../partials/SuccessAlert";
import ErrorAlert from "../partials/ErrorAlert";
import type {
  GetTag,
  GetTagValidationFields,
} from "../../types/tag";

/**
 * Tag form component.
 *
 * This component creates form content to show in the tag form.
 * @tag core
 * @param tag
 * @param handleTagChange
 * @param create_update_spinner
 * @param success_message
 * @param error_message
 * @param validation_errors
 * @returns React component including tag inputs
 */
const TagForm = ({
  tag,
  handleTagChange,
  create_update_spinner,
  success_message,
  error_message,
  validation_errors,
}: {
  tag: GetTag;
  handleTagChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  create_update_spinner: boolean;
  success_message: string;
  error_message: string;
  validation_errors: GetTagValidationFields;
}) => {
  return (
    <div className="col-span-2 lg:col-span-2">
      <Spinner show={create_update_spinner} />
      <SuccessAlert msg={success_message} />
      <ErrorAlert msg={error_message} />
      <div className=" relative ">
        <input
          name="title"
          value={tag.title || ""}
          type="text"
          id="contact-form-name"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="عنوان تگ"
          onChange={handleTagChange}
        />
        {validation_errors?.title != null ? (
          <div className="help-block">{validation_errors.title[0]}</div>
        ) : null}
      </div>
    </div>
  );
};
export default TagForm;
