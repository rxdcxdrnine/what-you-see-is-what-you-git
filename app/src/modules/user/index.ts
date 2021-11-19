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
export type HeatmapState = {
  [date: string]: number;
};
export type PostsState = {
  allPosts: AllPostState[];
  commits: commitState[];
  heatmap: HeatmapState;
};

export type PostCount = {
  date: string;
  count: number;
};

export type PageState = {
  first: boolean;
  last: boolean;
  number: number;
};

type UserState = {
  login: LoginState;
  profile: ProfileState;
  posts: PostsState;
  page: PageState;
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
    commits: [],
    heatmap: {},
  },
  page: {
    first: true,
    last: true,
    number: 0,
  },
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state: UserState) => {
      // profile
      state.profile.githubId = initialState.profile.githubId;
      state.profile.userName = initialState.profile.userName;
      state.profile.profileName = initialState.profile.profileName;
      state.profile.avatarUrl = initialState.profile.avatarUrl;
      state.profile.dayNum = initialState.profile.dayNum;
      state.profile.followingNum = initialState.profile.followingNum;
      state.profile.followerNum = initialState.profile.followerNum;

      state.posts = initialState.posts;
      state.page = initialState.page;
    },
    resetPage: (state: UserState) => {
      state.page = initialState.page;
    },
    updateProfile(state: UserState, action: PayloadAction<ProfileState>) {
      state.profile = action.payload;
    },
    updateAllPosts(state: UserState, action: PayloadAction<AllPostState[]>) {
      state.posts.allPosts = action.payload;
    },
    updateHeatmap(state: UserState, action: PayloadAction<HeatmapState>) {
      state.posts.heatmap = action.payload;
    },
    updateCommits(state: UserState, action: PayloadAction<commitState[]>) {
      state.posts.commits = action.payload;
    },
    updatePage(state: UserState, action: PayloadAction<PageState>) {
      state.page = action.payload;
    },
    updateUserError(state: UserState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  resetUser,
  resetPage,
  updateProfile,
  updateAllPosts,
  updateCommits,
  updateHeatmap,
  updatePage,
  updateUserError,
} = userSlice.actions;

export default userSlice;
