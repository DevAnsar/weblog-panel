import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiErrors } from "../../types";
import Apis from "../../apis";
import { AxiosError } from "axios";

type GetDashboardData = {
  users_count: number;
  published_posts_count: number;
  draft_posts_count: number;
  categories_count: number;
  tags_count: number;
};

type GetDashboardInitialState = {
  dashboard: GetDashboardData;
  success_message: string;
  error_message: string;
  spinner: boolean;
};
const DashboardFakeData: GetDashboardData = {
  users_count: 0,
  published_posts_count: 0,
  draft_posts_count: 0,
  categories_count: 0,
  tags_count: 0,
};

// Initial information for tag slice
const initialState: GetDashboardInitialState = {
  dashboard: { ...DashboardFakeData },
  success_message: "",
  error_message: "",
  spinner: false,
};

/**
 *  Async dashboardData action
 */
export const dashboardData = createAsyncThunk(
  "dashboard/listData",
  async (_, thunkAPI) => {
    try {
      const response = await Apis.dashboard();
      return await response.data;
    } catch (err: any) {
      let error: AxiosError<ApiErrors<{}>> = err; // cast the error for access
      if (!error.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

/**
 * dashboard slice.
 *
 * @category redux
 * @returns dashboardSlice & dashboard actions
 */
export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // listTags async thunk lifecycle
    builder.addCase(dashboardData.pending, (state) => {
      state.spinner = true;
    });
    builder.addCase(dashboardData.fulfilled, (state, action) => {
      const {
        users_count,
        published_posts_count,
        draft_posts_count,
        categories_count,
        tags_count,
      } = action.payload.data as GetDashboardData;

      state.dashboard.users_count = users_count;
      state.dashboard.published_posts_count = published_posts_count;
      state.dashboard.draft_posts_count = draft_posts_count;
      state.dashboard.categories_count = categories_count;
      state.dashboard.tags_count = tags_count;

      state.spinner = false;

    });
    builder.addCase(dashboardData.rejected, (state, action) => {
      state.error_message = action.error.message || "";
      state.spinner = false;
    });
  },
});

export const {} = dashboardSlice.actions;
