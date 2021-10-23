import { GistState, updateGists } from "./index";
import {
  all,
  call,
  SagaReturnType,
  put,
  takeEvery,
} from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";

import WriteApi, { GistPost, ImagePost, PushPost } from "../../api/write";
import { PushState, updatePushes, updateWriteError } from ".";

// fetchGithubPushes
export const fetchGithubPushes = createAction<string>(
  "write/fetchGithubPushes"
);

function* getGithubPushes(action: ReturnType<typeof fetchGithubPushes>) {
  try {
    const res: SagaReturnType<typeof WriteApi.fetchGithubPushes> = yield call(
      WriteApi.fetchGithubPushes,
      action.payload
    );

    const pushes: PushState[] = [];

    for (const event of res.data) {
      if (event.type === "PushEvent") {
        pushes.push({
          pushId: event.payload.push_id,
          repoName: event.repo.name,
          branchName: event.payload.ref,
          commitUrls: event.payload.commits.map((commit) => commit.url),
          uploadDate: event.created_at,
        });
      }
    }
    yield put(updatePushes(pushes));
  } catch (e: any) {
    yield put(updateWriteError(e.message));
  }
}

function* getGithubPushesSaga() {
  yield takeEvery(fetchGithubPushes.type, getGithubPushes);
}

// fetchGithubGists
export const fetchGithubGists = createAction<string>("wriet/fetchGithubGists");

function* getGithubGists(action: ReturnType<typeof fetchGithubGists>) {
  try {
    const res: SagaReturnType<typeof WriteApi.fetchGithubGists> = yield call(
      WriteApi.fetchGithubGists,
      action.payload
    );

    const gists: GistState[] = [];

    for (const gist of res.data) {
      gists.push({
        gistId: gist.id,
        gistDescription: gist.description,
        gistFilenames: Object.keys(gist.files),
        uploadDate: gist.created_at,
      });
    }
    yield put(updateGists(gists));
  } catch (e: any) {
    yield put(updateWriteError(e.message));
  }
}

function* getGithubGistsSaga() {
  yield takeEvery(fetchGithubGists.type, getGithubGists);
}

// savePushPost
export const savePushPost = createAction<PushPost>("write/savePushPost");

function* postPushPost(action: ReturnType<typeof savePushPost>) {
  try {
    const res: SagaReturnType<typeof WriteApi.savePushPost> = yield call(
      WriteApi.savePushPost,
      action.payload
    );

    if (res.status === 200) {
      alert("성공적으로 저장되었습니다.");
    }
  } catch (e: any) {
    yield put(updateWriteError(e.message));
  }
}

function* postPushPostSaga() {
  yield takeEvery(savePushPost.type, postPushPost);
}

// saveGistPost
export const saveGistPost = createAction<GistPost>("write/saveGistPost");

function* postGistPost(action: ReturnType<typeof saveGistPost>) {
  try {
    const res: SagaReturnType<typeof WriteApi.saveGistPost> = yield call(
      WriteApi.saveGistPost,
      action.payload
    );

    if (res.status === 200) {
      alert("성공적으로 저장되었습니다.");
    }
  } catch (e: any) {
    yield put(updateWriteError(e.message));
  }
}

function* postGistPostSaga() {
  yield takeEvery(saveGistPost.type, postGistPost);
}

// saveImagePost
export const saveImagePost = createAction<ImagePost>("write/saveImagePost");

function* postImagePost(action: ReturnType<typeof saveImagePost>) {
  try {
    const res: SagaReturnType<typeof WriteApi.saveImagePost> = yield call(
      WriteApi.saveImagePost,
      action.payload
    );

    if (res.status === 200) {
      alert("성공적으로 저장되었습니다.");
    }
  } catch (e: any) {
    yield put(updateWriteError(e.message));
  }
}

function* postImagePostSaga() {
  yield takeEvery(saveImagePost.type, postImagePost);
}

function* writeSaga() {
  yield all([
    getGithubPushesSaga(),
    getGithubGistsSaga(),
    postPushPostSaga(),
    postGistPostSaga(),
    postImagePostSaga(),
  ]);
}

export default writeSaga;
