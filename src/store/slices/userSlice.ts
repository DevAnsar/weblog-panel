import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  GetUserInitialState,
  GetUser,
  GetUserWithPassword,
  CreateUserValidationErrors,
  GetUserValidationFields,
} from "../../types/user";
import type { GetPaginationWithData } from "../../types";
import UserApi from "../../apis/User";
import { AxiosError } from "axios";

export const FakeUser: GetUser = {
  id: 0,
  email: "",
  name: "",
  username: "",
  is_admin: 0,
  created_at: "",
  image: "",
  image_url: null,
  bio : ""
};

const InitUsers: GetPaginationWithData<GetUser[]> = {
  current_page: 1,
  per_page: 1,
  last_page: 1,
  total: 1,
  data: [FakeUser],
};
const InitialValidationErrors: GetUserValidationFields = {
  name: null,
  username: null,
  email: null,
  password: null,
  is_admin: null,
  image : null,
  bio : null
};

// Initial information for user slice
const initialState: GetUserInitialState = {
  users: InitUsers,
  user: { ...FakeUser, password: "" },
  success_message: "",
  error_message: "",
  validation_errors: InitialValidationErrors,
  list_spinner: false,
  create_update_spinner: false,
  page: 1,
};

/**
 *  Async listUsers action
 */
export const listUsers = createAsyncThunk(
  "user/listUsers",
  async ({ page = 1 }: { page: number }) => {
    const response = await UserApi.list(page);
    return await response.data;
  }
);

/**
 *  Async deleteUser action
 */
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id, cb = () => {} }: { id: number; cb?: () => void }) => {
    const response = await UserApi.remove(id);
    cb();
    return await response.data;
  }
);

/**
 *  Async addUser action
 */
export const addUser = createAsyncThunk(
  "user/addUser",
  async ({ data, cb }: { data: GetUser; cb: () => void }, thunkAPI) => {
    try {
      const response = await UserApi.add(data);
      cb();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateUserValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async showUser action
 */
export const showUser = createAsyncThunk(
  "user/showUser",
  async ({ id }: { id: string }, thunkAPI) => {
    try {
      const response = await UserApi.showOne(+id);
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateUserValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 *  Async editUser action
 */
export const editUser = createAsyncThunk(
  "user/editUser",
  async (
    { id, data, cb }: { id: string; data: GetUserWithPassword; cb: (user? : GetUser) => void },
    thunkAPI
  ) => {
    try {
      const response = await UserApi.edit(data, +id);
      cb(response.data.data);
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<CreateUserValidationErrors> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * user slice.
 *
 * @category redux
 * @returns userSlice & user actions
 */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDefaults: (state) => {
      state.user = { ...state.user };
      state.success_message = "";
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
      state.list_spinner = false;
      state.create_update_spinner = false;
    },
    resetUserFields: (state) => {
      state.user = {
        id: 0,
        name: "",
        username: "",
        email: "",
        password: "",
        created_at: "",
        is_admin: 0,
        image: "",
        image_url: "",
        bio : ""
      };
    },
    handleUserChange: (state, action) => {
      if (action.payload.field !== "is_admin") {
        state.user = {
          ...state.user,
          [action.payload.field]: action.payload.data,
        };
      } else {
        let checked = state.user.is_admin;
        if (action.payload.checked === true) {
          checked = 1;
        } else if (action.payload.checked === false) {
          checked = 0;
        }
        state.user = { ...state.user, is_admin: checked };
      }
    },
  },

  extraReducers: (builder) => {
    // listUsers async thunk lifecycle
    builder.addCase(listUsers.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(listUsers.fulfilled, (state, action) => {
      const { current_page, last_page } = action.payload.data;
      state.users = action.payload.data;
      state.page = current_page > last_page ? last_page : current_page;
      state.list_spinner = false;
    });
    builder.addCase(listUsers.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.list_spinner = false;
    });

    // deleteUser async thunk lifecycle
    builder.addCase(deleteUser.pending, (state) => {
      state.list_spinner = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      let users = state.users;
      users.data = state.users.data.filter(
        (item: GetUser) => item.id !== action.payload.id
      );
      state.list_spinner = false;
      state.users = users;
      state.success_message = action.payload.message;
      state.error_message = "";
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.success_message = "";
      state.list_spinner = false;
    });

    // addUser async thunk lifecycle
    builder.addCase(addUser.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.user = action.payload.data;
      state.success_message = action.payload.message;
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.error_message = (
        action.payload as CreateUserValidationErrors
      ).message;
      state.create_update_spinner = false;
      state.validation_errors = (
        action.payload as CreateUserValidationErrors
      ).errors;
      state.success_message = "";
    });

    // editUser async thunk lifecycle
    builder.addCase(editUser.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.user = action.payload.data;
      state.success_message = action.payload.message;
      state.error_message = "";
      state.validation_errors = InitialValidationErrors;
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.error_message = (
        action.payload as CreateUserValidationErrors
      ).message;
      state.create_update_spinner = false;
      state.validation_errors = (
        action.payload as CreateUserValidationErrors
      ).errors;
      state.success_message = "";
    });

    // showUser async thunk lifecycle
    builder.addCase(showUser.pending, (state) => {
      state.create_update_spinner = true;
    });
    builder.addCase(showUser.fulfilled, (state, action) => {
      state.create_update_spinner = false;
      state.user = { ...action.payload.data, password: "" };
    });
    builder.addCase(showUser.rejected, (state, action) => {
      state.create_update_spinner = false;
      state.error_message = (
        action.payload as CreateUserValidationErrors
      ).message;
      state.validation_errors = (
        action.payload as CreateUserValidationErrors
      ).errors;
      state.success_message = "";
    });
  },
});

export const { setUserDefaults, resetUserFields, handleUserChange } =
  userSlice.actions;
