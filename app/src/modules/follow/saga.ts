import {
  all,
  call,
  put,
  SagaReturnType,
  takeEvery,
} from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import {
  FollowItem,
  updateFollowers,
  updateFollowings,
  updatePage,
  updateUsers,
  updateFollowError,
  appendUsers,
  resetPage,
  resetUsers,
} from ".";
import FollowApi, { FollowSave, FollowDelete } from "../../api/follow";
import { UserSearchCondition } from "../../api/user";
import { Page } from "../../api/page";

export const fetchFollowings = createAction<number>("follow/fetchFollowings");

function* getFollowings(action: ReturnType<typeof fetchFollowings>) {
  try {
    const res: SagaReturnType<typeof FollowApi.fetchFollowings> = yield call(
      FollowApi.fetchFollowings,
      action.payload
    );
    const followings: FollowItem[] = res.data;

    yield put(updateFollowings(followings));
  } catch (e: any) {
    yield put(updateFollowError(e.message));
  }
}

function* getFollowingsSaga() {
  yield takeEvery(fetchFollowings.type, getFollowings);
}

export const fetchFollowers = createAction<number>("follow/fetchFollowers");

function* getFollowers(action: ReturnType<typeof fetchFollowers>) {
  try {
    const res: SagaReturnType<typeof FollowApi.fetchFollowers> = yield call(
      FollowApi.fetchFollowers,
      action.payload
    );
    const followers: FollowItem[] = res.data;

    yield put(updateFollowers(followers));
  } catch (e: any) {
    yield put(updateFollowError(e.message));
  }
}

function* getFollowersSaga() {
  yield takeEvery(fetchFollowers.type, getFollowers);
}

export const searchUsers = createAction<UserSearchCondition>(
  "follow/searchFollowings"
);

function* getUsers(action: ReturnType<typeof searchUsers>) {
  try {
    const res: SagaReturnType<typeof FollowApi.searchUsers> = yield call(
      FollowApi.searchUsers,
      action.payload
    );
    const page: Page<FollowItem> = res.data;
    const { first, last, number } = page;

    if (first) yield put(updateUsers(page.content));
    else yield put(appendUsers(page.content));

    yield put(updatePage({ first, last, number }));
  } catch (e: any) {
    yield put(updateFollowError(e.message));
  }
}

function* getUsersSaga() {
  yield takeEvery(searchUsers.type, getUsers);
}

export const saveFollow = createAction<FollowSave>("follow/saveFollow");

export function* postFollow(action: ReturnType<typeof saveFollow>) {
  try {
    const res: SagaReturnType<typeof FollowApi.saveFollow> = yield call(
      FollowApi.saveFollow,
      action.payload
    );

    if (res.status === 200) {
      alert("성공적으로 추가되었습니다.");

      yield put(resetUsers());
      yield put(resetPage());
    }
  } catch (e: any) {
    yield put(updateFollowError(e.message));
  }
}

function* postFollowSaga() {
  yield takeEvery(saveFollow.type, postFollow);
}

export const removeFollow = createAction<FollowDelete>("follow/removeFollow");

function* deleteFollow(action: ReturnType<typeof removeFollow>) {
  try {
    const res: SagaReturnType<typeof FollowApi.removeFollow> = yield call(
      FollowApi.removeFollow,
      action.payload.followId
    );

    if (res.status === 200) {
      alert("성공적으로 제거되었습니다.");

      const res: SagaReturnType<typeof FollowApi.fetchFollowings> = yield call(
        FollowApi.fetchFollowings,
        action.payload.userId
      );
      const followings: FollowItem[] = res.data;

      yield put(updateFollowings(followings));
    }
  } catch (e: any) {
    yield put(updateFollowError(e.message));
  }
}

function* deleteFollowSaga() {
  yield takeEvery(removeFollow.type, deleteFollow);
}

function* followSaga() {
  yield all([
    getFollowingsSaga(),
    getFollowersSaga(),
    getUsersSaga(),
    postFollowSaga(),
    deleteFollowSaga(),
  ]);
}

export default followSaga;
