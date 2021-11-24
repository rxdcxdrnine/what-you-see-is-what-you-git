import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PageState } from "../user";

export type FollowItem = {
  followId: number;
  userId: number;
  userName: string;
  profileName: string;
  avatarUrl: string;
};

export type FollowComponentState = "" | "search" | "following" | "follower";

type FollowState = {
  followings: FollowItem[];
  followers: FollowItem[];
  users: FollowItem[];
  page: PageState;
  component: FollowComponentState;
  errorMessage: string;
};

const initialState: FollowState = {
  followings: [],
  followers: [],
  users: [],
  page: {
    first: true,
    last: true,
    number: 0,
  },
  component: "",
  errorMessage: "",
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    resetFollow(state: FollowState) {
      state.followings = initialState.followings;
      state.followers = initialState.followers;
      state.users = initialState.users;
      state.page = initialState.page;
    },
    resetPage(state: FollowState) {
      state.page = initialState.page;
    },
    resetUsers(state: FollowState) {
      state.users = initialState.users;
    },
    updateFollowings(state: FollowState, action: PayloadAction<FollowItem[]>) {
      state.followings = action.payload;
    },
    updateFollowers(state: FollowState, action: PayloadAction<FollowItem[]>) {
      state.followers = action.payload;
    },
    updateUsers(state: FollowState, action: PayloadAction<FollowItem[]>) {
      state.users = action.payload;
    },
    appendUsers(state: FollowState, action: PayloadAction<FollowItem[]>) {
      state.users = [...state.users, ...action.payload];
    },
    updateComponent(
      state: FollowState,
      action: PayloadAction<FollowComponentState>
    ) {
      state.component = action.payload;
    },
    updatePage(state: FollowState, action: PayloadAction<PageState>) {
      state.page = action.payload;
    },
    updateFollowError(state: FollowState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  resetFollow,
  resetUsers,
  resetPage,
  updateFollowings,
  updateFollowers,
  updateUsers,
  appendUsers,
  updateComponent,
  updatePage,
  updateFollowError,
} = followSlice.actions;

export default followSlice;
