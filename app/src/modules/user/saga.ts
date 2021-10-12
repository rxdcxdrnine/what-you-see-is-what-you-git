import {
  all,
  call,
  put,
  SagaReturnType,
  takeEvery,
} from "@redux-saga/core/effects";

import UserApi from "../../api/user";

import { setError, updateProfile } from ".";
import { createAction } from "@reduxjs/toolkit";

export const getGithubProfile = createAction<string>("user/getGithubProfile");

type SagaResponse = SagaReturnType<typeof UserApi.fetchGithubProfile>;

function* fetchGithubProfile(action: ReturnType<typeof getGithubProfile>) {
  try {
    const res: SagaResponse = yield call(
      UserApi.fetchGithubProfile,
      action.payload
    );
    const {
      id: userId,
      login: userName,
      name: profileName,
      avatar_url: avatarUrl,
      followers: followerNum,
      following: followingNum,
    } = res.data;

    yield put(
      updateProfile({
        userId,
        userName,
        profileName,
        avatarUrl,
        dayNum: 365,
        followingNum,
        followerNum,
      })
    );
  } catch (e: any) {
    yield put(setError(e.message));
  }
}

function* GithubProfileSaga() {
  yield takeEvery(getGithubProfile.type, fetchGithubProfile);
}

function* userSaga() {
  yield all([GithubProfileSaga()]);
}

export default userSaga;
