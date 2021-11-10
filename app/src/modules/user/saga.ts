import {
  all,
  call,
  put,
  SagaReturnType,
  takeEvery,
} from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";

import UserApi, { PostSearchCondition } from "../../api/user";
import {
  updateUserError,
  updateProfile,
  PushPostState,
  updatePushPosts,
  GistPostState,
  updateGistPosts,
  ImagePostState,
  updateImagePosts,
  commitState,
  updateCommits,
  updateHeatmap,
  HeatmapState,
  PostCount,
  AllPostState,
  updateAllPosts,
  ProfileState,
} from ".";

export const fetchUserProfile = createAction<number>("user/fetchUserProfile");

function* getUserProfile(action: ReturnType<typeof fetchUserProfile>) {
  try {
    const res: SagaReturnType<typeof UserApi.fetchUserProfile> = yield call(
      UserApi.fetchUserProfile,
      action.payload
    );
    const userProfile: ProfileState = res.data;

    yield put(updateProfile(userProfile));
  } catch (e: any) {
    yield put(updateUserError(e.message));
  }
}

function* getUserPofileSaga() {
  yield takeEvery(fetchUserProfile.type, getUserProfile);
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

export const fetchCommits = createAction<number>("user/fetchCommits");

export function* getCommits(action: ReturnType<typeof fetchCommits>) {
  try {
    const res: SagaReturnType<typeof UserApi.fetchCommits> = yield call(
      UserApi.fetchCommits,
      action.payload
    );

    const commits: commitState[] = res.data;
    yield put(updateCommits(commits));
  } catch (e: any) {
    yield put(updateUserError(e.message));
  }
}

function* getCommitsSaga() {
  yield takeEvery(fetchCommits.type, getCommits);
}

export const fetchPostCount = createAction<number>("user/fetchPostCount");

export function* getPostCount(action: ReturnType<typeof fetchPostCount>) {
  try {
    const res: SagaReturnType<typeof UserApi.fetchPostCount> = yield call(
      UserApi.fetchPostCount,
      action.payload
    );

    const postCounts: PostCount[] = res.data;

    let heatmap: HeatmapState = {};
    postCounts.forEach(({ date, count }) => {
      heatmap[date] = count;
    });

    yield put(updateHeatmap(heatmap));
  } catch (e: any) {
    yield put(updateUserError(e.message));
  }
}

export function* getPostCountSaga() {
  yield takeEvery(fetchPostCount.type, getPostCount);
}

export const fetchAllPosts =
  createAction<PostSearchCondition>("user/fetchAllPost");

export function* getAllPosts(action: ReturnType<typeof fetchAllPosts>) {
  try {
    const res: SagaReturnType<typeof UserApi.fetchAllPosts> = yield call(
      UserApi.fetchAllPosts,
      action.payload
    );

    const allPosts: AllPostState[] = res.data;
    yield put(updateAllPosts(allPosts));
  } catch (e: any) {
    updateUserError(e.message);
  }
}

export function* getAllPostsSaga() {
  yield takeEvery(fetchAllPosts.type, getAllPosts);
}

export const removePost = createAction<number>("user/deletePost");

export function* deletePost(action: ReturnType<typeof removePost>) {
  try {
    yield call(UserApi.deletePost, action.payload);

    alert("포스트가 삭제되었습니다.");
    window.location.reload();
  } catch (e: any) {
    updateUserError(e.message);
  }
}

export function* deletePostSaga() {
  yield takeEvery(removePost.type, deletePost);
}

function* userSaga() {
  yield all([
    getUserPofileSaga(),
    getPushPostsSaga(),
    getGistPostsSaga(),
    getImagePostsSaga(),
    getCommitsSaga(),
    getPostCountSaga(),
    getAllPostsSaga(),
    deletePostSaga(),
  ]);
}

export default userSaga;
