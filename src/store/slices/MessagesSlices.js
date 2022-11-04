import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  text: undefined,
  type: undefined,
};
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setSuccess: (state, { payload }) => {
      state.text = payload;
      state.type = "success";
    },
    setWarning: (state, { payload }) => {
      state.text = payload;
      state.type = "warning";
    },
    setError: (state, { payload }) => {
      state.text = payload;
      state.type = "error";
    },
    clearMessage: (state, { payload }) => {
      state.text = undefined;
      state.type = undefined;
    },
  },
});
export const { setSuccess, setWarning, setError, clearMessage } =
  messageSlice.actions;
