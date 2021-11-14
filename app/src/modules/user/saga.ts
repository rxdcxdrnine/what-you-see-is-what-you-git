import {
  all,
  call,
  getContext,
  put,
  SagaReturnType,
  takeEvery,
} from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { History } from "history";

import UserApi, {
  PostSearchCondition,
  PostUpdate,
  UserProfileFetch,
  UserSearchCondition,
} from "../../api/user";
import {
  updateUserError,
  updateProfile,
  commitState,
  updateCommits,
  updateHeatmap,
  HeatmapState,
  PostCount,
  AllPostState,
  updateAllPosts,
  updatePage,
} from ".";
import { Page } from "../../api/page";

export const fetchUserProfile = createAction<UserSearchCondition>(
  "user/fetchUserProfile"
);

function* getUserProfile(action: ReturnType<typeof fetchUserProfile>) {
  try {
    const res: SagaReturnType<typeof UserApi.fetchUserProfile> = yield call(
      UserApi.fetchUserProfile,
      action.payload
    );
    const userProfile: UserProfileFetch = res.data;

    yield put(updateProfile(userProfile));

    const heatmap: HeatmapState = {};
    userProfile.counts.forEach(({ date, count }) => {
      heatmap[date] = count;
    });

    yield put(updateHeatmap(heatmap));
  } catch (e: any) {
    yield put(updateUserError(e.message));
  }
}

function* getUserPofileSaga() {
  yield takeEvery(fetchUserProfile.type, getUserProfile);
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

    const heatmap: HeatmapState = {};
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

    const page: Page<AllPostState> = res.data;
    const { first, last, number } = page;

    yield put(updateAllPosts(page.content));
    yield put(updatePage({ first, last, number }));
  } catch (e: any) {
    updateUserError(e.message);
  }
}

export function* getAllPostsSaga() {
  yield takeEvery(fetchAllPosts.type, getAllPosts);
}

export const updatePost = createAction<PostUpdate>("user/updatePost");

export function* putPost(action: ReturnType<typeof updatePost>) {
  try {
    const res: SagaReturnType<typeof UserApi.updatePost> = yield call(
      UserApi.updatePost,
      action.payload
    );

    if (res.status === 200) {
      alert("성공적으로 저장되었습니다.");
      const history: History = yield getContext("history");
      history.push("/user");
    }
  } catch (e: any) {
    yield put(updateUserError(e.message));
  }
}

export function* putPostSaga() {
  yield takeEvery(updatePost.type, putPost);
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
    // getPushPostsSaga(),
    // getGistPostsSaga(),
    // getImagePostsSaga(),
    getCommitsSaga(),
    getPostCountSaga(),
    getAllPostsSaga(),
    putPostSaga(),
    deletePostSaga(),
  ]);
}

export default userSaga;
