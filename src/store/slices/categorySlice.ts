import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GetCategoryInitialState,
  GetCategory,
  CreateCategoryValidationErrors,
  GetCategoryValidationFields,
} from "../../types/category";
import type { GetPaginationWithData } from "../../types";
import CategoryApi from "../../apis/CategoryApis";
import { AxiosError } from "axios";

const FakeCategory: GetCategory = {
  id: 0,
  title: "",
  slug: ""
};

const InitCategories: GetPaginationWithData<GetCategory[]> = {
  current_page: 1,
  per_page: 1,
  last_page: 1,
  total: 1,
  data: [FakeCategory],
};
const InitialValidationErrors: GetCategoryValidationFields = {
  title: null
};

// Initial information for category slice
const initialState: GetCategoryInitialState = {
  categories: InitCategories,
  all_categories :[],
  category: { ...FakeCategory },
  success_message: "",
  error_message: "",
  validation_errors: InitialValidationErrors,
  list_spinner: false,
  create_update_spinner: false,
  page: 1,
};

/**
 *  Async listCategories action
 */
export const listCategories = createAsyncThunk(
  "category/listCategories",
  async ({ page = 1 }: { page: number }) => {
    const response = await CategoryApi.list(page);
    return await response.data;
  }
);

/**
 *  Async deleteCategory action
 */
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ id, cb = () => {} }: { id: number; cb?: () => void }) => {
    const response = await CategoryApi.remove(id);
    cb();
    return await response.data;
  }
);

/**
 *  Async addCategory action
 */
export const addCategory = createAsyncThunk(
  "user/addCategory",
  async ({ title, cb }: { title: string ; cb: () => void }, thunkAPI) => {
    try {
      const response = await CategoryApi.add(title);
      cb();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateCategoryValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async showCategory action
 */
export const showCategory = createAsyncThunk(
  "user/showCategory",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const response = await CategoryApi.showOne(+id);
      console.log(response);
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateCategoryValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async editCategory action
 */
export const editCategory = createAsyncThunk(
  "user/editCategory",
  async (
    { id, title, cb }: { id: string; title: string; cb: () => void },
    thunkAPI
  ) => {
    try {
      const response = await CategoryApi.edit(title, +id);
      cb();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateCategoryValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * category slice.
 *
 * @category redux
 * @returns categorySlice & category actions
 */
export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryDefaults: (state) => {
      state.category = { ...state.category };
      state.success_message = "";
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
      state.list_spinner = false;
      state.create_update_spinner = false;
    },
    resetCategoryFields: (state) => {
      state.category = {...FakeCategory};
    },
    handleCategoryTitle: (state, action) => {
      state.category = {...state.category,title : action.payload.title }
    },
  },

  extraReducers: (builder) => {
    // listCategorys async thunk lifecycle
    builder.addCase(listCategories.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(listCategories.fulfilled, (state, action) => {
      const { current_page, last_page } = action.payload.data;
      state.categories = action.payload.data;
      state.page = current_page > last_page ? last_page : current_page;
      state.list_spinner = false;
    });
    builder.addCase(listCategories.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.list_spinner = false;
    });

    // deleteCategory async thunk lifecycle
    builder.addCase(deleteCategory.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      let cats = state.categories;
      cats.data = state.categories.data.filter(
        (item: GetCategory) => item.id !== action.payload.id
      );
      state.list_spinner = false;
      state.categories = cats;
      state.success_message = action.payload.message;
      state.error_message = "";
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.success_message = "";
      state.list_spinner = false;
    });

    // addCategory async thunk lifecycle
    builder.addCase(addCategory.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.category = action.payload.data;
      state.success_message = action.payload.message;
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
    });
    builder.addCase(addCategory.rejected, (state, action) => {
      state.error_message = (
        action.payload as CreateCategoryValidationErrors
      ).message;
      state.create_update_spinner = false;
      state.validation_errors = (
        action.payload as CreateCategoryValidationErrors
      ).errors;
      state.success_message = "";
    });

    // editCategory async thunk lifecycle
    builder.addCase(editCategory.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(editCategory.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.category = action.payload.data;
      state.success_message = action.payload.message;
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
    });
    builder.addCase(editCategory.rejected, (state, action) => {
      state.error_message = (
        action.payload as CreateCategoryValidationErrors
      ).message;
      state.create_update_spinner = false;
      state.validation_errors = (
        action.payload as CreateCategoryValidationErrors
      ).errors;
      state.success_message = "";
    });

    // showCategory async thunk lifecycle
    builder.addCase(showCategory.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(showCategory.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.category = action.payload.data;
    });
    builder.addCase(showCategory.rejected, (state, action) => {
      state.create_update_spinner = false;
      state.error_message = (
        action.payload as CreateCategoryValidationErrors
      ).message;
      state.validation_errors = (
        action.payload as CreateCategoryValidationErrors
      ).errors;
      state.success_message = "";
    });
  },
});

export const { setCategoryDefaults, handleCategoryTitle,resetCategoryFields } = categorySlice.actions;
