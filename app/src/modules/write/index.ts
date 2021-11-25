import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PushState = {
  pushId: number;
  repoName: string;
  branchName: string;
  commitMessages: string[];
  commitUrls: string[];
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
  pushes: PushState[];
  gists: GistState[];
  page: number;
  next: boolean;
  selectedItem: SelectedItemState;
  errorMessage: string;
};

const initialState: WriteState = {
  markdown: "# 텍스트를 입력해주세요",
  pushes: [],
  gists: [],
  page: 1,
  next: true,
  selectedItem: { type: "", item: null },
  errorMessage: "",
};

const writeSlice = createSlice({
  name: "write",
  initialState,
  reducers: {
    resetWrite(state: WriteState) {
      state.markdown = initialState.markdown;
      state.pushes = initialState.pushes;
      state.gists = initialState.gists;
      state.selectedItem = initialState.selectedItem;
      state.errorMessage = initialState.errorMessage;
    },
    resetPushes(state: WriteState) {
      state.pushes = initialState.pushes;
    },
    resetGists(state: WriteState) {
      state.gists = initialState.gists;
    },
    updateMarkdown(state: WriteState, action: PayloadAction<string>) {
      state.markdown = action.payload;
    },
    appendPushes(state: WriteState, action: PayloadAction<PushState[]>) {
      state.pushes = [...state.pushes, ...action.payload];
    },
    appendGists(state: WriteState, action: PayloadAction<GistState[]>) {
      state.gists = [...state.gists, ...action.payload];
    },
    updatePage(state: WriteState, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    updateNext(state: WriteState, action: PayloadAction<boolean>) {
      state.next = action.payload;
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
  resetPushes,
  resetGists,
  updateMarkdown,
  appendPushes,
  appendGists,
  updatePage,
  updateNext,
  updateSelectedItem,
  updateWriteError,
} = writeSlice.actions;

export default writeSlice;
