import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GistState, ImageState, PushState } from "../write";

export type LoginState = {
  userId: number;
  userName: string;
};

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

export type BasePostState = {
  postId: number;
  markdown: string;
  type: string;
  regDate: string;
};

export type PushPostState = PushState & BasePostState;

export type GistPostState = GistState & BasePostState;

export type ImagePostState = ImageState & BasePostState;

export type AllPostState = PushState & GistState & ImageState & BasePostState;

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
  allPosts: AllPostState[];
  pushPosts: PushPostState[];
  gistPosts: GistPostState[];
  imagePosts: ImagePostState[];
  commits: commitState[];
};

export type PostCount = {
  date: string;
  count: number;
};

export type HeatmapState = {
  [date: string]: number;
};

type UserState = {
  login: LoginState;
  profile: ProfileState;
  posts: PostsState;
  heatmap: HeatmapState;
  errorMessage: string;
};

const initialState: UserState = {
  login: {
    userId: parseInt(process.env.REACT_APP_SAMPLE_USER_ID as string),
    userName: process.env.REACT_APP_SAMPLE_GITHUB_USERNAME as string,
  },
  profile: {
    userId: 0,
    githubId: 0,
    userName: "",
    profileName: "",
    avatarUrl: "",
    dayNum: 0,
    followingNum: 0,
    followerNum: 0,
  },
  posts: {
    allPosts: [],
    pushPosts: [],
    gistPosts: [],
    imagePosts: [],
    commits: [],
  },
  heatmap: {},
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state: UserState) => {
      state.profile = initialState.profile;
      state.posts = initialState.posts;
      state.heatmap = initialState.heatmap;
    },
    updateProfile(state: UserState, action: PayloadAction<ProfileState>) {
      state.profile = action.payload;
    },
    updateAllPosts(state: UserState, action: PayloadAction<AllPostState[]>) {
      state.posts.allPosts = action.payload;
    },
    updatePushPosts(state: UserState, action: PayloadAction<PushPostState[]>) {
      state.posts.pushPosts = action.payload;
    },
    updateGistPosts(state: UserState, action: PayloadAction<GistPostState[]>) {
      state.posts.gistPosts = action.payload;
    },
    updateImagePosts(
      state: UserState,
      action: PayloadAction<ImagePostState[]>
    ) {
      state.posts.imagePosts = action.payload;
    },
    updateHeatmap(state: UserState, action: PayloadAction<HeatmapState>) {
      state.heatmap = action.payload;
    },
    updateCommits(state: UserState, action: PayloadAction<commitState[]>) {
      state.posts.commits = action.payload;
    },
    updateUserError(state: UserState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  resetUser,
  updateProfile,
  updateAllPosts,
  updatePushPosts,
  updateGistPosts,
  updateImagePosts,
  updateCommits,
  updateHeatmap,
  updateUserError,
} = userSlice.actions;

export default userSlice;
