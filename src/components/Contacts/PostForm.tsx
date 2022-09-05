import Spinner from "../partials/Spinner";
import SuccessAlert from "../partials/SuccessAlert";
import ErrorAlert from "../partials/ErrorAlert";
import { Link } from "react-router-dom";
import { PlusIcon, ReplyIcon } from "@heroicons/react/solid";
import type { GetPost, GetPostValidationFields } from "../../types/post";
import type { GetCategory } from "../../types/category";
import type { GetTag } from "../../types/tag";

/**
 * Post form component.
 *
 * This component creates form content to show in the post form.
 * @post core
 * @param post
 * @param handleFieldChange
 * @param handleCkeditorChange
 * @param all_categories
 * @param all_tags
 * @param create_update_spinner
 * @param success_message
 * @param error_message
 * @param validation_errors
 * @param openAddCategoryModal
 * @param openAddTagModal
 * @param handleSave
 * @param submitRef
 * @returns React component including post inputs
 */
const PostForm = ({
  post,
  handleFieldChange,
  handleCkeditorChange,
  create_update_spinner,
  success_message,
  error_message,
  all_categories,
  all_tags,
  openAddCategoryModal,
  openAddTagModal,
  handleSave,
  submitRef,
  validation_errors,
}: {
  post: GetPost;
  handleFieldChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleCkeditorChange: (editor: any) => void;
  all_categories: GetCategory[];
  all_tags: GetTag[];
  openAddCategoryModal: any;
  openAddTagModal: any;
  handleSave: any;
  submitRef: any;
  create_update_spinner: boolean;
  success_message: string;
  error_message: string;
  validation_errors: GetPostValidationFields;
}) => {
  console.log(post);
  return (
    <div className="col-span-2 lg:col-span-2">
      <Spinner show={create_update_spinner} />
      <SuccessAlert msg={success_message} />
      <ErrorAlert msg={error_message} />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8">
          <div className=" bg-white rounded-2xl shadow dark:bg-gray-800 p-5">
            <div className="flex justify-between mb-5">
              <h3 className="box-title">
                {post?.id !== 0 ? "ویرایش پست #" + post.id : "افزودن پست جدید"}
              </h3>
              <Link
                to="/posts"
                className="px-3 py-1 rounded-lg bg-yellow-500 text-slate-50 text-sm"
              >
                <ReplyIcon className="w-5 " />
              </Link>
            </div>
            <div className="box-body">
              <div className="flex flex-col">
                <div className="flex items-center gap-5">
                  <label>عنوان</label>
                  <input
                    type="text"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="عنوان پست"
                    onChange={handleFieldChange}
                    value={post?.title ? post.title : ""}
                    name="title"
                  />
                </div>
                {validation_errors !== undefined &&
                validation_errors.hasOwnProperty("title") &&
                validation_errors.title !== null ? (
                  <div className="text-red-600 text-sm">
                    {validation_errors.title[0]}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col mt-5">
                <div className="flex items-center gap-5">
                  <label>چکیده</label>
                  <input
                    type="text"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="چکیده و گزیده پست"
                    onChange={handleFieldChange}
                    value={post?.excerpt ? post.excerpt : ""}
                    name="excerpt"
                  />
                </div>
                {validation_errors !== undefined &&
                validation_errors.hasOwnProperty("excerpt") &&
                validation_errors?.excerpt != null ? (
                  <div className="text-red-600 text-sm">
                    {validation_errors.excerpt[0]}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-2 mt-5 w-full">
                <div className="flex flex-col items-start justify-start lg:flex-row  gap-5 w-full">
                  <label>متن پست</label>
                  <textarea
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    name="content"
                    onChange={handleFieldChange}
                    rows={15}
                    value={post.content}
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

        <div className="col-span-12 lg:col-span-4">
          <div className=" bg-white rounded-2xl shadow dark:bg-gray-800 p-5 lg:sticky lg:top-28">
            <div className="box-body">
              <div className={`flex justify-between items-center gap-5`}>
                <select
                  name="category_id"
                  id="category_id"
                  className="rounded-lg border border-gary-700 text-sm px-3 py-1 w-full"
                  onChange={handleFieldChange}
                  value={post?.category_id}
                >
                  <option value="">انتخاب دسته</option>
                  {all_categories.map((cat) => {
                    return (
                      <option key={cat.id} value={cat.id}>
                        {cat.title}
                      </option>
                    );
                  })}
                </select>

                <button
                  type="button"
                  className="px-3 py-1 rounded-lg bg-blue-500 text-slate-50 text-sm flex justify-between items-center"
                  onClick={openAddCategoryModal}
                >
                  <PlusIcon className="w-4 " />
                </button>
              </div>
              {validation_errors !== undefined &&
              validation_errors.hasOwnProperty("category_id") &&
              validation_errors.category_id != null ? (
                <div className="text-red-600 text-sm">
                  {validation_errors.category_id[0]}
                </div>
              ) : null}

              <br />

              <div className="flex flex-col items-start">
                <label className="font-bold text-sm text-gray-800">تگ ها</label>
                <div className="flex flex-col mt-3">
                  {all_tags.map((tag) => {
                    return (
                      <div className="checkbox" key={tag.id}>
                        <label className="flex items-center gap-2 text-gray-800 text-sm">
                          <input
                            type="checkbox"
                            name="tag[]"
                            value={tag.id}
                            onChange={handleFieldChange}
                            checked={post ? post.tags.includes(tag.id) : false}
                          />
                          {tag.title}
                        </label>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="mt-3 px-3 py-1 rounded-lg bg-blue-500 text-slate-50 text-sm flex justify-between items-center"
                  onClick={openAddTagModal}
                >
                  <PlusIcon className="w-4 " />
                  افزودن تگ جدید
                </button>
              </div>

              {post?.image_url ? (
                <img src={post.image_url} className="w-full mt-8" />
              ) : null}
              <div className={`form-group mt-3`}>
                <label className="text-gray-800 text-sm">تصویر</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="mt-2 w-full rounded-lg border border-gray-800 text-sm"
                  onChange={handleFieldChange}
                  accept="image/*"
                />
                {validation_errors !== undefined &&
                validation_errors.hasOwnProperty("image") &&
                validation_errors.image != null ? (
                  <div className="text-red-600 text-sm">
                    {validation_errors.image[0]}
                  </div>
                ) : null}
              </div>
              <div className="flex items-center justify-between mt-5">
                <input
                  type="button"
                  name="savedraft"
                  value="ذخیره پیشنویس"
                  onClick={handleSave}
                  className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-300 cursor-pointer text-slate-500 text-sm flex justify-between items-center"
                />

                <input
                  type="button"
                  name="publish"
                  value="انتشار"
                  onClick={handleSave}
                  className="px-3 py-1 rounded-lg bg-green-500 hover:bg-green-600 cursor-pointer text-slate-50 text-sm flex justify-between items-center"
                />
                <input
                  type="submit"
                  ref={submitRef}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostForm;
