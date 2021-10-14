import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PushState = {
  pushId: number;
  repoName: string;
  branchName: string;
  commitUrls: string[];
  uploadedAt: Date;
};

type WriteState = {
  markdown: string;
  html: string;
  pushes: PushState[];
  selectedItem: {
    type: string;
    index: number;
  };
  errorMessage: string;
};

const initialState: WriteState = {
  markdown: "# sample",
  html: "",
  pushes: [],
  selectedItem: {
    type: "",
    index: 0,
  },
  errorMessage: "",
};

const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    updateMarkdown(state: WriteState, action: PayloadAction<string>) {
      state.markdown = action.payload;
    },
    updateHtml(state: WriteState, action: PayloadAction<string>) {
      state.html = action.payload;
    },
    updatePushes(state: WriteState, action: PayloadAction<PushState[]>) {
      state.pushes = action.payload;
    },
    updateWriteError(state: WriteState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    updateSelectedItem(
      state: WriteState,
      action: PayloadAction<{ type: string; index: number }>
    ) {
      state.selectedItem = action.payload;
    },
  },
});

export const {
  updateMarkdown,
  updateHtml,
  updatePushes,
  updateSelectedItem,
  updateWriteError,
} = writeSlice.actions;

export default writeSlice;
