import {
  all,
  call,
  put,
  SagaReturnType,
  takeEvery,
} from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";

import UserApi from "../../api/user";

import { setError, updateProfile } from ".";

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

function* githubProfileSaga() {
  yield takeEvery(getGithubProfile.type, fetchGithubProfile);
}

function* userSaga() {
  yield all([githubProfileSaga()]);
}

export default userSaga;
