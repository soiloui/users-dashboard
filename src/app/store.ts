import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { placeholderApi } from "services/placeholderApi";
import usersReducer from "features/users/usersSlice";

const combinedReducer = combineReducers({
  [placeholderApi.reducerPath]: placeholderApi.reducer,
  users: usersReducer,
});

export default configureStore({
  reducer: combinedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(placeholderApi.middleware),
});

export type RootState = ReturnType<typeof combinedReducer>;
