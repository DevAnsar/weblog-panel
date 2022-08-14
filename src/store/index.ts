import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { categorySlice } from "./slices/categorySlice";

// create store from redux for save app information
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    category : categorySlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch