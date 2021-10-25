import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PushState = {
  pushId: number;
  repoName: string;
  branchName: string;
  commitUrls?: string[];
  uploadDate: Date;
};

export type GistState = {
  gistId: string;
  gistDescription: string;
  gistFilenames: string[];
  uploadDate: Date;
};

export type SelectedItemState =
  | { type: ""; item: null }
  | { type: "push"; item: PushState }
  | { type: "gist"; item: GistState }
  | { type: "file"; item: File };

type WriteState = {
  markdown: string;
  html: string;
  pushes: PushState[];
  gists: GistState[];
  selectedItem: SelectedItemState;
  errorMessage: string;
};

const initialState: WriteState = {
  markdown: "# sample",
  html: "",
  pushes: [],
  gists: [],
  selectedItem: { type: "", item: null },
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
    updateGists(state: WriteState, action: PayloadAction<GistState[]>) {
      state.gists = action.payload;
    },
    updateSelectedItem(
      state: WriteState,
      action: PayloadAction<SelectedItemState>
    ) {
      state.selectedItem = action.payload;
    },
    updateWriteError(state: WriteState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  updateMarkdown,
  updateHtml,
  updatePushes,
  updateGists,
  updateSelectedItem,
  updateWriteError,
} = writeSlice.actions;

export default writeSlice;
