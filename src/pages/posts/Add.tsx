import { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Breadcrumb from "../../components/partials/Breadcrumb";
import { useNavigate } from "react-router-dom";
import PostForm from "../../components/Posts/PostForm";
import {
  handleFieldChange,
  addPost,
  setPostDefaults,
  resetPostFields,
} from "../../store/slices/postSlice";
import { listAllCategories } from "../../store/slices/categorySlice";
import { listAllTags } from "../../store/slices/tagSlice";

import AddCategoryModal from "../../components/Categories/AddCategoryModal";
import AddTagModal from "../../components/Tags/AddTagModal";

/**
 * post create page.
 *
 * @category pages
 * @returns React component
 */
const AddPage = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showAddCategoryModal, setShowAddCategoryModal] =
    useState<boolean>(false);
  const [showAddTagModal, setShowAddTagModal] = useState<boolean>(false);

  const submitRef = useRef<any>();

  // take posts information from redux store
  const {
    post,
    success_message,
    error_message,
    validation_errors,
    create_update_spinner,
  } = useAppSelector((state) => state.post);
  const { all_categories } = useAppSelector((state) => state.category);
  const { all_tags } = useAppSelector((state) => state.tag);

  // Refreshing and initializing post store
  useEffect(() => {
    dispatch(setPostDefaults());
    dispatch(resetPostFields());
    dispatch(listAllCategories());
    dispatch(listAllTags());
  }, []);

  const openAddCategoryModal = () => {
    setShowAddCategoryModal(true);
  };
  const closeAddCategoryModal = () => {
    setShowAddCategoryModal(false);
  };

  const openAddTagModal = () => {
    setShowAddTagModal(true);
  };
  const closeAddTagModal = () => {
    setShowAddTagModal(false);
  };

  const handleFieldChangeFn = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    
    if (e.target.name === "tag[]") {
      dispatch(
        handleFieldChange({
          field: e.target.name,
          data: e.target.value,
          checked: (e.target as HTMLInputElement).checked,
        })
      );
    } else if (e.target.name === "image") {
      dispatch(
        handleFieldChange({
          field: e.target.name,
          data: (e.target as HTMLInputElement).files![0],
        })
      );
    } else {
      dispatch(
        handleFieldChange({ field: e.target.name, data: e.target.value })
      );
    }
  };

  const handleCkeditorChange = (editor: any) => {
    if (editor) {
      dispatch(handleFieldChange({ field: "content", data: editor.getData() }));
    } else {
      console.log("editor is undefined!");
    }
  };

  // Save the article as published or draft, then submit form with submitRef
  const handleSave = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(
      handleFieldChange({
        field: "published",
        data: e.target.name === "publish" ? 1 : 2,
      })
    );
    setTimeout(() => submitRef.current.click(), 200);
  };

  // post create form submit handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      addPost({
        data: post,
        cb: () => {
          // reset title
          dispatch(resetPostFields());
          // redirect
          setTimeout(() => navigate("/posts"), 2000);
        },
      })
    );
  };

  return (
    <div className="flex flex-col min-h-full">
      <Breadcrumb />
      <div className="container mx-auto px-4 sm:px-8 ">
        <div className="py-8">
          <form className="flex w-full" onSubmit={handleFormSubmit}>
            <div className="grid grid-cols-2 gap-4 m-auto">
              <PostForm
                post={post}
                handleFieldChange={handleFieldChangeFn}
                handleCkeditorChange={handleCkeditorChange}
                create_update_spinner={create_update_spinner}
                success_message={success_message}
                error_message={error_message}
                all_categories={all_categories}
                all_tags={all_tags}
                openAddCategoryModal={openAddCategoryModal}
                openAddTagModal={openAddTagModal}
                handleSave={handleSave}
                submitRef={submitRef}
                validation_errors={validation_errors}
              />
            </div>
          </form>
        </div>
      </div>
      <AddCategoryModal
        showModal={showAddCategoryModal}
        onCloseModal={closeAddCategoryModal}
      />
      <AddTagModal
        showModal={showAddTagModal}
        onCloseModal={closeAddTagModal}
      /> 
    </div>
  );
};

export default AddPage;
