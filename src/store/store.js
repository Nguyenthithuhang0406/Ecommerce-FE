import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import orderReducer from "./orderSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    order: orderReducer,
  },
});

export default store;
