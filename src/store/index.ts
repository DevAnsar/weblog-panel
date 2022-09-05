import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { categorySlice } from "./slices/categorySlice";
import { tagSlice } from "./slices/tagSlice";
import { postSlice } from "./slices/postSlice";
import { dashboardSlice } from "./slices/dashboardSlice";
import { newsletterSlice } from "./slices/newsletterSlice";
import { contactSlice } from "./slices/contactSlice";

// create store from redux for save app information
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    category : categorySlice.reducer,
    tag : tagSlice.reducer,
    post : postSlice.reducer,
    dashboard : dashboardSlice.reducer,
    newsletter : newsletterSlice.reducer,
    contact : contactSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch