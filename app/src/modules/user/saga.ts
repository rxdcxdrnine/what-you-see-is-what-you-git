import {
  all,
  call,
  put,
  SagaReturnType,
  takeEvery,
} from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";

import UserApi from "../../api/user";
import {
  updateUserError,
  updateProfile,
  PushPostState,
  updatePushPosts,
  GistPostState,
  updateGistPosts,
  ImagePostState,
  updateImagePosts,
} from ".";

export const fetchGithubProfile = createAction<string>(
  "user/fetchGithubProfile"
);

function* getGithubProfile(action: ReturnType<typeof fetchGithubProfile>) {
  try {
    const res: SagaReturnType<typeof UserApi.fetchGithubProfile> = yield call(
      UserApi.fetchGithubProfile,
      action.payload
    );
    const {
      id: githubId,
      login: userName,
      name: profileName,
      avatar_url: avatarUrl,
      followers: followerNum,
      following: followingNum,
    } = res.data;

    yield put(
      updateProfile({
        userId: 1,
        githubId,
        userName,
        profileName,
        avatarUrl,
        dayNum: 365,
        followingNum,
        followerNum,
      })
    );
  } catch (e: any) {
    yield put(updateUserError(e.message));
  }
}

function* githubProfileSaga() {
  yield takeEvery(fetchGithubProfile.type, getGithubProfile);
}

export const fetchPushPosts = createAction<number>("user/fetchPushPosts");

function* getPushPost(action: ReturnType<typeof fetchPushPosts>) {
  try {
    const res: SagaReturnType<typeof UserApi.fetchPushPosts> = yield call(
      UserApi.fetchPushPosts,
      action.payload
    );
    const pushPosts: PushPostState[] = res.data;

    yield put(updatePushPosts(pushPosts));
  } catch (e: any) {
    yield put(updateUserError(e.message));
  }
}

function* getPushPostsSaga() {
  yield takeEvery(fetchPushPosts.type, getPushPost);
}

export const fetchGistPosts = createAction<number>("user/fetchGistPosts");

function* getGistPosts(action: ReturnType<typeof fetchGistPosts>) {
  try {
    const res: SagaReturnType<typeof UserApi.fetchGistPosts> = yield call(
      UserApi.fetchGistPosts,
      action.payload
    );

    const gistPosts: GistPostState[] = res.data;
    yield put(updateGistPosts(gistPosts));
  } catch (e: any) {
    yield put(updateUserError(e.message));
  }
}

function* getGistPostsSaga() {
  yield takeEvery(fetchGistPosts.type, getGistPosts);
}

export const fetchImagePosts = createAction<number>("user/fetchImagePosts");

export function* getImagePosts(action: ReturnType<typeof fetchImagePosts>) {
  try {
    const res: SagaReturnType<typeof UserApi.fetchImagePosts> = yield call(
      UserApi.fetchImagePosts,
      action.payload
    );

    const imagePosts: ImagePostState[] = res.data;
    yield put(updateImagePosts(imagePosts));
  } catch (e: any) {
    yield put(updateUserError(e.message));
  }
}

function* getImagePostsSaga() {
  yield takeEvery(fetchImagePosts.type, getImagePosts);
}

function* userSaga() {
  yield all([
    githubProfileSaga(),
    getPushPostsSaga(),
    getGistPostsSaga(),
    getImagePostsSaga(),
  ]);
}

export default userSaga;
