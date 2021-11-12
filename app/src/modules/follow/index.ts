import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FollowItem = {
  followId: number;
  userId: number;
  userName: string;
  profileName: string;
  avatarUrl: string;
};

type FollowState = {
  followings: FollowItem[];
  followers: FollowItem[];
  users: FollowItem[];
  errorMessage: string;
};

const initialState: FollowState = {
  followings: [],
  followers: [],
  users: [],
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
    updateFollowError(state: FollowState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  resetFollow,
  updateFollowings,
  updateFollowers,
  updateUsers,
  updateFollowError,
} = followSlice.actions;

export default followSlice;
