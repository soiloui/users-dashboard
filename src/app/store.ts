import { configureStore } from "@reduxjs/toolkit";
import { placeholderApi } from "services/placeholderApi";

export default configureStore({
  reducer: {
    [placeholderApi.reducerPath]: placeholderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(placeholderApi.middleware),
});
