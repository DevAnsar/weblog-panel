import Spinner from "../partials/Spinner";
import SuccessAlert from "../partials/SuccessAlert";
import ErrorAlert from "../partials/ErrorAlert";
import type {
  GetNewsletter,
  GetNewsletterValidationFields,
} from "../../types/newsletter";

/**
 * Newsletter form component.
 *
 * This component creates form content to show in the newsletter form.
 * @newsletter core
 * @param newsletter
 * @param handleNewsletterChange
 * @param create_update_spinner
 * @param success_message
 * @param error_message
 * @param validation_errors
 * @returns React component including newsletter inputs
 */
const NewsletterForm = ({
  newsletter,
  handleNewsletterChange,
  create_update_spinner,
  success_message,
  error_message,
  validation_errors,
}: {
  newsletter: GetNewsletter;
  handleNewsletterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  create_update_spinner: boolean;
  success_message: string;
  error_message: string;
  validation_errors: GetNewsletterValidationFields;
}) => {
  return (
    <div className="col-span-2 lg:col-span-2">
      <Spinner show={create_update_spinner} />
      <SuccessAlert msg={success_message} />
      <ErrorAlert msg={error_message} />
      <div className=" relative ">
        <input
          name="email"
          value={newsletter.email || ""}
          type="text"
          id="contact-form-name"
          className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="ایمیل"
          onChange={handleNewsletterChange}
        />
        {validation_errors?.email != null ? (
          <div className="help-block">{validation_errors.email[0]}</div>
        ) : null}
      </div>
    </div>
  );
};
export default NewsletterForm;
