import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { InstaApis } from "./InstaApi";


export const store = configureStore({
  reducer: combineReducers({
    [InstaApis.reducerPath]: InstaApis.reducer,
   
  }),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(InstaApis.middleware),
});