import { configureStore } from "@reduxjs/toolkit";
import { messageSlice } from "./slices";

export const store = configureStore({
  reducer: {
    message: messageSlice.reducer,
  },
});
