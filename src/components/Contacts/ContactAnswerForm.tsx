import SuccessAlert from "../partials/SuccessAlert";
import ErrorAlert from "../partials/ErrorAlert";
import type {
  GetContact,
  GetContactValidationFields,
} from "../../types/contact";

/**
 * Contact Answer form component.
 *
 * This component creates form for answer a question (or request) from the contact-us
 * @post core
 * @param answer
 * @param handleFieldChange
 * @param handleCkeditorChange
 * @param create_update_spinner
 * @param success_message
 * @param error_message
 * @param validation_errors
 * @returns React component
 */
const ContactAnswerForm = ({
  answer,
  answerContent,
  handleFieldChange,
  success_message,
  error_message,
  validation_errors,
}: {
  answer?: GetContact;
  answerContent: string;
  handleFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  success_message: string;
  error_message: string;
  validation_errors: GetContactValidationFields;
}) => {
  return (
    <div className="col-span-2 lg:col-span-2">
      <SuccessAlert msg={success_message} />
      <ErrorAlert msg={error_message} />

      <div className=" w-full">
        <div className="flex justify-between mb-5">
          <h3 className="box-title  ">
            {answer !== undefined
              ? " ویرایش پاسخ داده شده به "
              : " ارسال پاسخ  "}
          </h3>
        </div>
        <div className="box-body">
          <div className="flex flex-col items-start gap-2 mt-5 w-full">
            <div className="flex flex-col items-start justify-start lg:flex-row  gap-5 w-full">
              <textarea
                placeholder="متن پاسخ را اینجا بنویسید"
                className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                name="content"
                onChange={handleFieldChange}
                rows={10}
                value={answerContent}
                // value={answer !== undefined ? answer.content : answerContent}
              ></textarea>
            </div>
            {validation_errors !== undefined &&
            validation_errors.hasOwnProperty("content") &&
            validation_errors.content != null ? (
              <div className="text-red-600 text-sm">
                {validation_errors.content[0]}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactAnswerForm;
