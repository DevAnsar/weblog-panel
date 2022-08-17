import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GetPostInitialState,
  GetPost,
  CreatePostValidationErrors,
  GetPostValidationFields,
} from "../../types/post";
import type { GetPaginationWithData } from "../../types";
import PostApi from "../../apis/PostApis";
import { AxiosError } from "axios";
import { FakeCategory } from "./categorySlice";
import { FakeUser } from "./userSlice";

const FakePost: GetPost = {
  id: 0,
  title: "",
  slug: "",
  content: "",
  excerpt: "",
  image: "",
  image_url: "",
  date_formatted: "",
  published: 1,
  category_id: "",
  category: FakeCategory,
  tags: [],
  user: FakeUser,
};

const InitPosts: GetPaginationWithData<GetPost[]> = {
  current_page: 1,
  per_page: 1,
  last_page: 1,
  total: 1,
  data: [FakePost],
};
const InitialValidationErrors: GetPostValidationFields = {
  title: null,
  excerpt: null,
  content: null,
  category_id: null,
  image: null,
};

// Initial information for post slice
const initialState: GetPostInitialState = {
  posts: InitPosts,
  post: { ...FakePost },
  success_message: "",
  error_message: "",
  validation_errors: InitialValidationErrors,
  list_spinner: false,
  create_update_spinner: false,
  page: 1,
};

/**
 *  Async listPosts action
 */
export const listPosts = createAsyncThunk(
  "post/listPosts",
  async ({ page = 1 }: { page: number }) => {
    const response = await PostApi.list(page);
    return await response.data;
  }
);

/**
 *  Async deletePost action
 */
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ id, cb = () => {} }: { id: number; cb?: () => void }) => {
    const response = await PostApi.remove(id);
    cb();
    return await response.data;
  }
);

/**
 *  Async addPost action
 */
export const addPost = createAsyncThunk(
  "post/addPost",
  async ({ data, cb }: { data: any; cb: () => void }, thunkAPI) => {
    try {
      const response = await PostApi.add(data);
      cb();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreatePostValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async showPost action
 */
export const showPost = createAsyncThunk(
  "post/showPost",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const response = await PostApi.showOne(+id);
      console.log(response);
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreatePostValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async editPost action
 */
export const editPost = createAsyncThunk(
  "post/editPost",
  async (
    { id, data, cb }: { id: string; data: any; cb: () => void },
    thunkAPI
  ) => {
    console.log(data);
    try {
      const response = await PostApi.edit(data, +id);
      cb();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreatePostValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * post slice.
 *
 * @post redux
 * @returns postSlice & post actions
 */
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostDefaults: (state) => {
      state.post = { ...state.post };
      state.success_message = "";
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
      state.list_spinner = false;
      state.create_update_spinner = false;
    },
    resetPostFields: (state) => {
      state.post = { ...FakePost };
    },
    handleFieldChange: (state, action) => {
      const { data, field } = action.payload;
      if (
        field === "title" ||
        field === "content" ||
        field === "excerpt" ||
        field === "category_id" ||
        field === "published" ||
        field === "image"
      ) {
        state.post = {...state.post,[field]: data};
      } else if (field === "tag[]") {
        const { checked } = action.payload;
        let selected_tags = state.post.tags;

        if (checked) {
          if (!selected_tags.includes(data)) {
            selected_tags.push(parseInt(data));
          }
        } else {
          if (selected_tags.includes(parseInt(data))) {
            selected_tags = selected_tags.filter(
              (item) => item !== parseInt(data)
            );
          }
        }
        state.post = { ...state.post, tags: selected_tags };
      }
    },
  },

  extraReducers: (builder) => {
    let tags : Array<number> = [];
    // listPosts async thunk lifecycle
    builder.addCase(listPosts.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(listPosts.fulfilled, (state, action) => {
      console.log(action);
      const { current_page, last_page } = action.payload.data;
      state.posts = action.payload.data;
      state.page = current_page > last_page ? last_page : current_page;
      state.list_spinner = false;
    });
    builder.addCase(listPosts.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.list_spinner = false;
    });

    // deletePost async thunk lifecycle
    builder.addCase(deletePost.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      let posts = state.posts;
      posts.data = state.posts.data.filter(
        (item: GetPost) => item.id !== action.payload.id
      );
      state.list_spinner = false;
      state.posts = posts;
      state.success_message = action.payload.message;
      state.error_message = "";
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.success_message = "";
      state.list_spinner = false;
    });

    // addPost async thunk lifecycle
    builder.addCase(addPost.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      tags = action.payload.data.tags;
      if (tags) {
        tags = tags.map((x: any) => x["id"]);
      } else {
        tags = [];
      }
      action.payload.data.tags = tags;

      state.create_update_spinner = false;
      state.post = action.payload.data;
      state.success_message = action.payload.message;
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
    });
    builder.addCase(addPost.rejected, (state, action) => {
      state.error_message = (
        action.payload as CreatePostValidationErrors
      ).message;
      state.create_update_spinner = false;
      state.validation_errors = (
        action.payload as CreatePostValidationErrors
      ).errors;
      state.success_message = "";
    });

    // editPost async thunk lifecycle
    builder.addCase(editPost.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      tags = action.payload.data.tags;
      if (tags) {
        tags = tags.map((x: any) => x["id"]);
      } else {
        tags = [];
      }
      action.payload.data.tags = tags;

      state.create_update_spinner = false;
      state.post = action.payload.data;
      state.success_message = action.payload.message;
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.error_message = (
        action.payload as CreatePostValidationErrors
      ).message;
      state.create_update_spinner = false;
      state.validation_errors = (
        action.payload as CreatePostValidationErrors
      ).errors;
      state.success_message = "";
    });

    // showPost async thunk lifecycle
    builder.addCase(showPost.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(showPost.fulfilled, (state, action) => {
      tags = action.payload.data.tags;
      if (tags) {
        tags = tags.map((x: any) => x["id"]);
      } else {
        tags = [];
      }
      action.payload.data.tags = tags;
      action.payload.data.image = "";

      console.log(action);
      state.create_update_spinner = false;
      state.post = action.payload.data;
    });
    builder.addCase(showPost.rejected, (state, action) => {
      state.create_update_spinner = false;
      state.error_message = (
        action.payload as CreatePostValidationErrors
      ).message;
      state.validation_errors = (
        action.payload as CreatePostValidationErrors
      ).errors;
      state.success_message = "";
    });
  },
});

export const { setPostDefaults, handleFieldChange, resetPostFields } =
  postSlice.actions;
