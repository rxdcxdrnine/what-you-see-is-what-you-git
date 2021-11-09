import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GistState, PushState } from "../write";

export type ProfileState = {
  userId: number;
  githubId: number;
  userName: string;
  profileName: string;
  avatarUrl: string;
  dayNum: number;
  followingNum: number;
  followerNum: number;
};

export type PushPostState = PushState & {
  postId: number;
  markdown: string;
  regDate: string;
};

export type GistPostState = GistState & {
  postId: number;
  markdown: string;
  regDate: string;
};

export type ImagePostState = {
  postId: number;
  imageFilename: string;
  markdown: string;
  regDate: string;
};

export type commitState = {
  commitId: number;
  commitSha: string;
  additions: number;
  deletions: number;
  uploadDate: string;
  commitFiles: commitFileState[];
};

export type commitFileState = {
  commitFileId: number;
  fileSha: string;
  fileName: number;
  fileStatus: string;
  additions: number;
  deletions: number;
};

export type PostsState = {
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  commits: commitState[];
  status: "all" | "push" | "gist" | "image";
};

export type PostCount = {
  date: string;
  count: number;
};

export type HeatmapState = {
  [date: string]: number;
};

type UserState = {
  profile: ProfileState;
  posts: PostsState;
  heatmap: HeatmapState;
  errorMessage: string;
};

const initialState: UserState = {
  profile: {
    userId: 1,
    githubId: 0,
    userName: "",
    profileName: "",
    avatarUrl: "",
    dayNum: 0,
    followingNum: 0,
    followerNum: 0,
  },
  posts: {
    pushPosts: [],
    gistPosts: [],
    imagePosts: [],
    commits: [],
    status: "all",
  },
  heatmap: {},
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile(state: UserState, action: PayloadAction<ProfileState>) {
      state.profile = action.payload;
    },
    updatePushPosts(state: UserState, action: PayloadAction<PushPostState[]>) {
      state.posts.pushPosts = action.payload;
      state.posts.status = "push";
    },
    updateGistPosts(state: UserState, action: PayloadAction<GistPostState[]>) {
      state.posts.gistPosts = action.payload;
      state.posts.status = "gist";
    },
    updateImagePosts(
      state: UserState,
      action: PayloadAction<ImagePostState[]>
    ) {
      state.posts.imagePosts = action.payload;
      state.posts.status = "image";
    },
    updateCommits(state: UserState, action: PayloadAction<commitState[]>) {
      state.posts.commits = action.payload;
    },
    updateHeatmap(state: UserState, action: PayloadAction<HeatmapState>) {
      state.heatmap = action.payload;
    },
    updateUserError(state: UserState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  updateProfile,
  updatePushPosts,
  updateGistPosts,
  updateImagePosts,
  updateCommits,
  updateHeatmap,
  updateUserError,
} = userSlice.actions;

export default userSlice;
