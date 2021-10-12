import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PushState = {
  pushId: number;
  repoName: string;
  branchName: string;
  commits: string[];
};

type writeState = {
  markdown: string;
  html: string;
  pushs: PushState[];
};

const initialState: writeState = {
  markdown: "# sample",
  html: "",
  pushs: [],
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
    updatePushs(state: writeState, action: PayloadAction<PushState[]>) {
      state.pushs = action.payload;
    },
  },
});

export const { updateMarkdown, updateHtml, updatePushs } = writeSlice.actions;

export default writeSlice;
