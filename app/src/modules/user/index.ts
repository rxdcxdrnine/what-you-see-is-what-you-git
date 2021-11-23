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

export type CommitState = {
  commitId: number;
  commitSha: string;
  commitMessage: string;
  commitUrl: string;
  additions: number;
  deletions: number;
  uploadDate: string;
  commitFiles: CommitFileState[];
};

export type CommitFileState = {
  commitFileId: number;
  fileSha: string;
  fileName: number;
  fileStatus: string;
  additions: number;
  deletions: number;
  commitFileUrl: string;
};
export type HeatmapState = {
  [date: string]: number;
};
export type PostsState = {
  allPosts: AllPostState[];
  commits: CommitState[];
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

export type UserComponentState =
  | "all"
  | "push"
  | "gist"
  | "image"
  | "day"
  | "heatmap";

type UserState = {
  login: LoginState;
  profile: ProfileState;
  posts: PostsState;
  page: PageState;
  component: UserComponentState;
  readOnly: boolean;
  errorMessage: string;
};

const initialState: UserState = {
  login: {
    userId: 0,
    userName: "",
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
  readOnly: true,
  component: "heatmap",
  errorMessage: "",
};

const updateReadOnly = (state: UserState) => {
  if (state.login.userId && state.profile.userId) {
    if (state.login.userId === state.profile.userId) {
      state.readOnly = false;
    } else {
      state.readOnly = true;
    }
  }
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
    resetPosts: (state: UserState) => {
      state.posts.allPosts = initialState.posts.allPosts;
      state.posts.commits = initialState.posts.commits;
      state.posts.heatmap = initialState.posts.heatmap;
    },
    resetPage: (state: UserState) => {
      state.page = initialState.page;
    },
    updateLogin(state: UserState, action: PayloadAction<LoginState>) {
      state.login = action.payload;
      updateReadOnly(state);
    },
    updateProfileId(state: UserState, action: PayloadAction<number>) {
      state.profile.userId = action.payload;
      updateReadOnly(state);
    },
    updateProfile(state: UserState, action: PayloadAction<ProfileState>) {
      state.profile = action.payload;
      updateReadOnly(state);
    },
    updateAllPosts(state: UserState, action: PayloadAction<AllPostState[]>) {
      state.posts.allPosts = action.payload;
    },
    updateHeatmap(state: UserState, action: PayloadAction<HeatmapState>) {
      state.posts.heatmap = action.payload;
    },
    updateCommits(state: UserState, action: PayloadAction<CommitState[]>) {
      state.posts.commits = action.payload;
    },
    updateComponent(
      state: UserState,
      action: PayloadAction<UserComponentState>
    ) {
      state.component = action.payload;
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
  resetPosts,
  updateLogin,
  updateProfileId,
  updateProfile,
  updateAllPosts,
  updateCommits,
  updateHeatmap,
  updateComponent,
  updatePage,
  updateUserError,
} = userSlice.actions;

export default userSlice;
