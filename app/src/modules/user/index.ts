import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ProfileState = {
  userId: number;
  userName: string;
  profileName: string;
  avatarUrl: string;
  dayNum: number;
  followingNum: number;
  followerNum: number;
};

type UserState = {
  profile: ProfileState;
  errorMessage: string;
};

const initialState: UserState = {
  profile: {
    userId: 0,
    userName: "",
    profileName: "",
    avatarUrl: "",
    dayNum: 0,
    followingNum: 0,
    followerNum: 0,
  },
  errorMessage: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile(state: UserState, action: PayloadAction<ProfileState>) {
      state.profile = action.payload;
    },
    updateUserError(state: UserState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { updateProfile, updateUserError } = userSlice.actions;

export default userSlice;
