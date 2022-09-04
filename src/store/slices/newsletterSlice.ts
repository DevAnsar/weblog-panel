import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GetNewsletterInitialState,
  GetNewsletter,
  CreateNewsletterValidationErrors,
  GetNewsletterValidationFields,
} from "../../types/newsletter";
import type { GetPaginationWithData } from "../../types";
import NewsletterApi from "../../apis/NewsletterApis";
import { AxiosError } from "axios";

const FakeNewsletter: GetNewsletter = {
  id: 0,
  email: "",
};

const InitNewsletters: GetPaginationWithData<GetNewsletter[]> = {
  current_page: 1,
  per_page: 1,
  last_page: 1,
  total: 1,
  data: [FakeNewsletter],
};
const InitialValidationErrors: GetNewsletterValidationFields = {
  email: null,
};

// Initial information for newsletter slice
const initialState: GetNewsletterInitialState = {
  newsletters: InitNewsletters,
  newsletter: { ...FakeNewsletter },
  success_message: "",
  error_message: "",
  validation_errors: InitialValidationErrors,
  list_spinner: false,
  create_update_spinner: false,
  page: 1,
};

/**
 *  Async listNewsletters action
 */
export const listNewsletters = createAsyncThunk(
  "newsletter/listNewsletters",
  async ({ page = 1 }: { page: number }) => {
    const response = await NewsletterApi.list(page);
    return await response.data;
  }
);

/**
 *  Async deleteNewsletter action
 */
export const deleteNewsletter = createAsyncThunk(
  "newsletter/deleteNewsletter",
  async ({ id, cb = () => {} }: { id: number; cb?: () => void }) => {
    const response = await NewsletterApi.remove(id);
    cb();
    return await response.data;
  }
);

/**
 *  Async addNewsletter action
 */
export const addNewsletter = createAsyncThunk(
  "newsletter/addNewsletter",
  async ({ email, cb }: { email: string; cb: () => void }, thunkAPI) => {
    try {
      const response = await NewsletterApi.add(email);
      cb();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateNewsletterValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async showNewsletter action
 */
export const showNewsletter = createAsyncThunk(
  "newsletter/showNewsletter",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const response = await NewsletterApi.showOne(+id);
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateNewsletterValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async editNewsletter action
 */
export const editNewsletter = createAsyncThunk(
  "newsletter/editNewsletter",
  async (
    { id, email, cb }: { id: string; email: string; cb: () => void },
    thunkAPI
  ) => {
    try {
      const response = await NewsletterApi.edit(email, +id);
      cb();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateNewsletterValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * newsletter slice.
 *
 * @newsletter redux
 * @returns newsletterSlice & newsletter actions
 */
export const newsletterSlice = createSlice({
  name: "newsletter",
  initialState,
  reducers: {
    setNewsletterDefaults: (state) => {
      state.newsletter = { ...state.newsletter };
      state.success_message = "";
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
      state.list_spinner = false;
      state.create_update_spinner = false;
    },
    resetNewsletterFields: (state) => {
      state.newsletter = { ...FakeNewsletter };
    },
    handleNewsletterEmail: (state, action) => {
      state.newsletter = { ...state.newsletter, email: action.payload.email };
    },
  },

  extraReducers: (builder) => {
    // listNewsletters async thunk lifecycle
    builder.addCase(listNewsletters.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(listNewsletters.fulfilled, (state, action) => {
      console.log("action:",action);
      const { current_page, last_page } = action.payload.data;
      state.newsletters = action.payload.data;
      state.page = current_page > last_page ? last_page : current_page;
      state.list_spinner = false;
    });
    builder.addCase(listNewsletters.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.list_spinner = false;
    });

    // deleteNewsletter async thunk lifecycle
    builder.addCase(deleteNewsletter.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(deleteNewsletter.fulfilled, (state, action) => {
      let cats = state.newsletters;
      cats.data = state.newsletters.data.filter(
        (item: GetNewsletter) => item.id !== action.payload.id
      );
      state.list_spinner = false;
      state.newsletters = cats;
      state.success_message = action.payload.message;
      state.error_message = "";
    });
    builder.addCase(deleteNewsletter.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.success_message = "";
      state.list_spinner = false;
    });

    // addNewsletter async thunk lifecycle
    builder.addCase(addNewsletter.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(addNewsletter.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.newsletter = action.payload.data;
      state.success_message = action.payload.message;
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
    });
    builder.addCase(addNewsletter.rejected, (state, action) => {
      state.error_message = (
        action.payload as CreateNewsletterValidationErrors
      ).message;
      state.create_update_spinner = false;
      state.validation_errors = (
        action.payload as CreateNewsletterValidationErrors
      ).errors;
      state.success_message = "";
    });

    // editNewsletter async thunk lifecycle
    builder.addCase(editNewsletter.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(editNewsletter.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.newsletter = action.payload.data;
      state.success_message = action.payload.message;
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
    });
    builder.addCase(editNewsletter.rejected, (state, action) => {
      state.error_message = (
        action.payload as CreateNewsletterValidationErrors
      ).message;
      state.create_update_spinner = false;
      state.validation_errors = (
        action.payload as CreateNewsletterValidationErrors
      ).errors;
      state.success_message = "";
    });

    // showNewsletter async thunk lifecycle
    builder.addCase(showNewsletter.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(showNewsletter.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.newsletter = action.payload.data;
    });
    builder.addCase(showNewsletter.rejected, (state, action) => {
      state.create_update_spinner = false;
      state.error_message = (
        action.payload as CreateNewsletterValidationErrors
      ).message;
      state.validation_errors = (
        action.payload as CreateNewsletterValidationErrors
      ).errors;
      state.success_message = "";
    });
  },
});

export const { setNewsletterDefaults, handleNewsletterEmail, resetNewsletterFields } =
  newsletterSlice.actions;
