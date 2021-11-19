import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PushState = {
  pushId: number;
  repoName: string;
  branchName: string;
  commitUrls?: string[];
  uploadDate: string;
};

export type GistState = {
  gistId: string;
  gistDescription: string;
  gistFilenames: string[];
  uploadDate: string;
};

export type ImageState = {
  imageFilename: string;
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
  markdown: "# ",
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
    resetWrite(state: WriteState) {
      state.markdown = initialState.markdown;
      state.html = initialState.html;
      state.pushes = initialState.pushes;
      state.gists = initialState.gists;
      state.selectedItem = initialState.selectedItem;
    },
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
  resetWrite,
  updateMarkdown,
  updateHtml,
  updatePushes,
  updateGists,
  updateSelectedItem,
  updateWriteError,
} = writeSlice.actions;

export default writeSlice;
