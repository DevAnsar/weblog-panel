import React, { useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addTag,
  setTagDefaults,
  handleTagTitle,
  listAllTags,
} from "../../store/slices/tagSlice";

import TagForm from "./TagForm";

const AddTagModal = ({
  showModal,
  onCloseModal,
}: {
  showModal: boolean;
  onCloseModal: () => void;
}) => {
  const dispatch = useAppDispatch();

  // take category information from redux store
  const {
    tag,
    create_update_spinner,
    error_message,
    success_message,
    validation_errors,
  } = useAppSelector((state) => state.tag);

  useEffect(() => {
    dispatch(setTagDefaults());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(handleTagTitle({ title: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addTag({
        title: tag.title,
        cb: () => {
          // reset title
          dispatch(handleTagTitle({ title: "" }));
          setTimeout(() => {
            // close modal
            onCloseModal();
            // reset defaults
            dispatch(setTagDefaults());
            // refetch tags
            dispatch(listAllTags());
          }, 2000);
        },
      })
    );
  };

  return (
    <Transition appear show={showModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-sm font-sm leading-6 text-gray-800 text-right"
                >
                  افزودن تگ جدید
                </Dialog.Title>
                <div className="mt-2">
                  <form role="form" method="post" onSubmit={handleSubmit}>
                    <TagForm
                      tag={tag}
                      handleTagChange={handleChange}
                      create_update_spinner={create_update_spinner}
                      error_message={error_message}
                      success_message={success_message}
                      validation_errors={validation_errors}
                    />

                    <div className="mt-4 flex gap-5 justify-end">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={onCloseModal}
                      >
                        بیخیال
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      >
                        ذخیره
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddTagModal;
