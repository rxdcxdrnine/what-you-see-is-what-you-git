import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type writeState = {
  markdown: string;
  html: string;
};

const initialState: writeState = {
  markdown: "",
  html: "",
};

const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    updateMarkdown(state: writeState, action: PayloadAction<string>) {
      state.markdown = action.payload;
    },
    updateHtml(state: writeState, action: PayloadAction<string>) {
      state.html = action.payload;
    },
  },
});

export const { updateMarkdown, updateHtml } = writeSlice.actions;

export default writeSlice;
