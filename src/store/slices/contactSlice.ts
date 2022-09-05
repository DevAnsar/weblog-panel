import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GetContactInitialState,
  GetContact,
  CreateContactValidationErrors,
  GetContactValidationFields,
} from "../../types/contact";
import type { GetPaginationWithData } from "../../types";
import ContactApi from "../../apis/ContactApis";
import { AxiosError } from "axios";

const FakeContact: GetContact = {
  id: 0,
  name: "",
  email: "",
  content: "",
  parent_id: 0,
  seen: false,
  answers : []
};

const InitContacts: GetPaginationWithData<GetContact[]> = {
  current_page: 1,
  per_page: 1,
  last_page: 1,
  total: 1,
  data: [FakeContact],
};
const InitialValidationErrors: GetContactValidationFields = {
  content: null,
};

// Initial information for contact slice
const initialState: GetContactInitialState = {
  contacts: InitContacts,
  contact: { ...FakeContact },
  answerContent: "",
  success_message: "",
  error_message: "",
  validation_errors: InitialValidationErrors,
  list_spinner: false,
  create_update_spinner: false,
  page: 1,
};

/**
 *  Async listContacts action
 */
export const listContacts = createAsyncThunk(
  "contact/listContacts",
  async ({ page = 1 }: { page: number }) => {
    const response = await ContactApi.list(page);
    return await response.data;
  }
);

/**
 *  Async deleteContact action
 */
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async ({ id, cb = () => {} }: { id: number; cb?: () => void }) => {
    const response = await ContactApi.remove(id);
    cb();
    return await response.data;
  }
);

/**
 *  Async showContact action
 */
export const showContact = createAsyncThunk(
  "contact/showContact",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const response = await ContactApi.showOne(+id);
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateContactValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async answerContact action
 */
export const answerContact = createAsyncThunk(
  "contact/answerContact",
  async (
    { id, content, cb }: { id: string; content: string; cb: () => void },
    thunkAPI
  ) => {
    try {
      const response = await ContactApi.answer(+id, content);
      cb();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateContactValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * contact slice.
 *
 * @contact redux
 * @returns contactSlice & contact actions
 */
export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactDefaults: (state) => {
      state.contact = { ...state.contact };
      state.answerContent = "";
      state.success_message = "";
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
      state.list_spinner = false;
      state.create_update_spinner = false;
    },
    resetContactFields: (state) => {
      state.contact = { ...FakeContact };
    },
    handleFieldChange: (state, action) => {
      const { data } = action.payload;
      state.answerContent = data;
    },
  },

  extraReducers: (builder) => {
    // listContacts async thunk lifecycle
    builder.addCase(listContacts.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(listContacts.fulfilled, (state, action) => {
      const { current_page, last_page } = action.payload.data;
      state.contacts = action.payload.data;
      state.page = current_page > last_page ? last_page : current_page;
      state.list_spinner = false;
    });
    builder.addCase(listContacts.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.list_spinner = false;
    });

    // deleteContact async thunk lifecycle
    builder.addCase(deleteContact.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      let contacts = state.contacts;
      contacts.data = state.contacts.data.filter(
        (item: GetContact) => item.id !== action.payload.id
      );
      state.list_spinner = false;
      state.contacts = contacts;
      state.success_message = action.payload.message;
      state.error_message = "";
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.success_message = "";
      state.list_spinner = false;
    });

    // addContact async thunk lifecycle
    builder.addCase(answerContact.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(answerContact.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.contact = action.payload.data;
      state.success_message = action.payload.message;
      state.answerContent = "";
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
    });
    builder.addCase(answerContact.rejected, (state, action) => {
      console.log(action)
      state.error_message = (
        action.payload as CreateContactValidationErrors
      ).message ||  "مشکل در ارتباط با سرور رخ داد";
      state.create_update_spinner = false;
      state.validation_errors = (
        action.payload as CreateContactValidationErrors
      ).errors;
      state.success_message = "";
    });

    // showContact async thunk lifecycle
    builder.addCase(showContact.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(showContact.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.contact = action.payload.data;
    });
    builder.addCase(showContact.rejected, (state, action) => {
      state.create_update_spinner = false;
      state.error_message = (
        action.payload as CreateContactValidationErrors
      ).message;
      state.validation_errors = (
        action.payload as CreateContactValidationErrors
      ).errors;
      state.success_message = "";
    });
  },
});

export const { setContactDefaults, handleFieldChange, resetContactFields } =
  contactSlice.actions;
