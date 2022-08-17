import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GetTagInitialState,
  GetTag,
  CreateTagValidationErrors,
  GetTagValidationFields,
} from "../../types/tag";
import type { GetPaginationWithData } from "../../types";
import TagApi from "../../apis/TagApis";
import { AxiosError } from "axios";

const FakeTag: GetTag = {
  id: 0,
  title: "",
};

const InitTags: GetPaginationWithData<GetTag[]> = {
  current_page: 1,
  per_page: 1,
  last_page: 1,
  total: 1,
  data: [FakeTag],
};
const InitialValidationErrors: GetTagValidationFields = {
  title: null,
};

// Initial information for tag slice
const initialState: GetTagInitialState = {
  tags: InitTags,
  all_tags: [],
  tag: { ...FakeTag },
  success_message: "",
  error_message: "",
  validation_errors: InitialValidationErrors,
  list_spinner: false,
  create_update_spinner: false,
  page: 1,
};

/**
 *  Async listTags action
 */
export const listTags = createAsyncThunk(
  "tag/listTags",
  async ({ page = 1 }: { page: number }) => {
    const response = await TagApi.list(page);
    return await response.data;
  }
);

/**
 *  Async deleteTag action
 */
export const deleteTag = createAsyncThunk(
  "tag/deleteTag",
  async ({ id, cb = () => {} }: { id: number; cb?: () => void }) => {
    const response = await TagApi.remove(id);
    cb();
    return await response.data;
  }
);

/**
 *  Async addTag action
 */
export const addTag = createAsyncThunk(
  "tag/addTag",
  async ({ title, cb }: { title: string; cb: () => void }, thunkAPI) => {
    try {
      const response = await TagApi.add(title);
      cb();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateTagValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async showTag action
 */
export const showTag = createAsyncThunk(
  "tag/showTag",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const response = await TagApi.showOne(+id);
      console.log(response);
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateTagValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async editTag action
 */
export const editTag = createAsyncThunk(
  "tag/editTag",
  async (
    { id, title, cb }: { id: string; title: string; cb: () => void },
    thunkAPI
  ) => {
    try {
      const response = await TagApi.edit(title, +id);
      cb();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateTagValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async listAllTags action
 */
 export const listAllTags = createAsyncThunk(
  "tag/listAllTags",
  async (_, thunkAPI) => {
    try {
      const response = await TagApi.listAll();
      // cb();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateTagValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * tag slice.
 *
 * @tag redux
 * @returns tagSlice & tag actions
 */
export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTagDefaults: (state) => {
      state.tag = { ...state.tag };
      state.success_message = "";
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
      state.list_spinner = false;
      state.create_update_spinner = false;
    },
    resetTagFields: (state) => {
      state.tag = { ...FakeTag };
    },
    handleTagTitle: (state, action) => {
      state.tag = { ...state.tag, title: action.payload.title };
    },
  },

  extraReducers: (builder) => {
    // listTags async thunk lifecycle
    builder.addCase(listTags.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(listTags.fulfilled, (state, action) => {
      const { current_page, last_page } = action.payload.data;
      state.tags = action.payload.data;
      state.page = current_page > last_page ? last_page : current_page;
      state.list_spinner = false;
    });
    builder.addCase(listTags.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.list_spinner = false;
    });

    // deleteTag async thunk lifecycle
    builder.addCase(deleteTag.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(deleteTag.fulfilled, (state, action) => {
      let cats = state.tags;
      cats.data = state.tags.data.filter(
        (item: GetTag) => item.id !== action.payload.id
      );
      state.list_spinner = false;
      state.tags = cats;
      state.success_message = action.payload.message;
      state.error_message = "";
    });
    builder.addCase(deleteTag.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.success_message = "";
      state.list_spinner = false;
    });

    // addTag async thunk lifecycle
    builder.addCase(addTag.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(addTag.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.tag = action.payload.data;
      state.success_message = action.payload.message;
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
    });
    builder.addCase(addTag.rejected, (state, action) => {
      state.error_message = (
        action.payload as CreateTagValidationErrors
      ).message;
      state.create_update_spinner = false;
      state.validation_errors = (
        action.payload as CreateTagValidationErrors
      ).errors;
      state.success_message = "";
    });

    // editTag async thunk lifecycle
    builder.addCase(editTag.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(editTag.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.tag = action.payload.data;
      state.success_message = action.payload.message;
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
    });
    builder.addCase(editTag.rejected, (state, action) => {
      state.error_message = (
        action.payload as CreateTagValidationErrors
      ).message;
      state.create_update_spinner = false;
      state.validation_errors = (
        action.payload as CreateTagValidationErrors
      ).errors;
      state.success_message = "";
    });

    // showTag async thunk lifecycle
    builder.addCase(showTag.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(showTag.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.tag = action.payload.data;
    });
    builder.addCase(showTag.rejected, (state, action) => {
      state.create_update_spinner = false;
      state.error_message = (
        action.payload as CreateTagValidationErrors
      ).message;
      state.validation_errors = (
        action.payload as CreateTagValidationErrors
      ).errors;
      state.success_message = "";
    });

    // listAllCategories async thunk lifecycle
    builder.addCase(listAllTags.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(listAllTags.fulfilled, (state, action) => {
      state.list_spinner = false;
      state.all_tags = action.payload.data;
    });
    builder.addCase(listAllTags.rejected, (state, action) => {
      state.list_spinner = false;
      state.error_message = (
        action.payload as CreateTagValidationErrors
      ).message;
      state.validation_errors = (
        action.payload as CreateTagValidationErrors
      ).errors;
      state.success_message = "";
    });
  },
});

export const { setTagDefaults, handleTagTitle, resetTagFields } =
  tagSlice.actions;
