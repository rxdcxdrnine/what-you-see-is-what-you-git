import {
  all,
  call,
  getContext,
  SagaReturnType,
  put,
  takeEvery,
} from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { History } from "history";

import WriteApi, {
  GistPostSave,
  ImagePostSave,
  PushPostSave,
} from "../../api/write";

import GithubApi, { GithubSearchCondition } from "../../api/github";
import { appendGists, appendPushes, GistState, updateNext } from "./index";
import { PushState, updateWriteError } from ".";

// fetchGithubPushes
export const fetchGithubPushes = createAction<GithubSearchCondition>(
  "write/fetchGithubPushes"
);

function* getGithubPushes(action: ReturnType<typeof fetchGithubPushes>) {
  try {
    const res: SagaReturnType<typeof GithubApi.fetchGithubPushes> = yield call(
      GithubApi.fetchGithubPushes,
      action.payload
    );

    if (res.data.length === 0) yield put(updateNext(false));

    console.log(res.headers);

    const pushes: PushState[] = [];

    for (const event of res.data) {
      if (event.type === "PushEvent") {
        pushes.push({
          pushId: event.payload.push_id,
          repoName: event.repo.name.split("/")[1],
          branchName: event.payload.ref
            .split("/")
            .reverse()
            .slice(0, 2)
            .reverse()
            .join("/"),
          commitMessages: event.payload.commits.map((commit) => commit.message),
          commitUrls: event.payload.commits.map((commit) => commit.url),
          uploadDate: event.created_at,
        });
      }
    }

    if (pushes.length !== 0) yield put(appendPushes(pushes));
  } catch (e: any) {
    yield put(updateWriteError(e.message));
  }
}

function* getGithubPushesSaga() {
  yield takeEvery(fetchGithubPushes.type, getGithubPushes);
}

// fetchGithubGists
export const fetchGithubGists = createAction<GithubSearchCondition>(
  "wriet/fetchGithubGists"
);

function* getGithubGists(action: ReturnType<typeof fetchGithubGists>) {
  try {
    const res: SagaReturnType<typeof GithubApi.fetchGithubGists> = yield call(
      GithubApi.fetchGithubGists,
      action.payload
    );

    if (res.data.length === 0) yield put(updateNext(false));

    console.log(res.headers);

    const gists: GistState[] = [];

    for (const gist of res.data) {
      gists.push({
        gistId: gist.id,
        gistDescription: gist.description,
        gistFilenames: Object.keys(gist.files),
        uploadDate: gist.created_at,
      });
    }

    if (gists.length !== 0) yield put(appendGists(gists));
  } catch (e: any) {
    yield put(updateWriteError(e.message));
  }
}

function* getGithubGistsSaga() {
  yield takeEvery(fetchGithubGists.type, getGithubGists);
}

// savePushPost
export const savePushPost = createAction<PushPostSave>("write/savePushPost");

function* postPushPost(action: ReturnType<typeof savePushPost>) {
  try {
    const res: SagaReturnType<typeof WriteApi.savePushPost> = yield call(
      WriteApi.savePushPost,
      action.payload
    );

    if (res.status === 200) {
      alert("성공적으로 저장되었습니다.");
      const history: History = yield getContext("history");
      history.push("/user");
    }
  } catch (e: any) {
    yield put(updateWriteError(e.message));
  }
}

function* postPushPostSaga() {
  yield takeEvery(savePushPost.type, postPushPost);
}

// saveGistPost
export const saveGistPost = createAction<GistPostSave>("write/saveGistPost");

function* postGistPost(action: ReturnType<typeof saveGistPost>) {
  try {
    const res: SagaReturnType<typeof WriteApi.saveGistPost> = yield call(
      WriteApi.saveGistPost,
      action.payload
    );

    if (res.status === 200) {
      alert("성공적으로 저장되었습니다.");
      const history: History = yield getContext("history");
      history.push("/user");
    }
  } catch (e: any) {
    yield put(updateWriteError(e.message));
  }
}

function* postGistPostSaga() {
  yield takeEvery(saveGistPost.type, postGistPost);
}

// saveImagePost
export const saveImagePost = createAction<ImagePostSave>("write/saveImagePost");

function* postImagePost(action: ReturnType<typeof saveImagePost>) {
  try {
    const res: SagaReturnType<typeof WriteApi.saveImagePost> = yield call(
      WriteApi.saveImagePost,
      action.payload
    );

    if (res.status === 200) {
      alert("성공적으로 저장되었습니다.");
      const history: History = yield getContext("history");
      history.push("/user");
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
