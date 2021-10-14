import {
  all,
  call,
  SagaReturnType,
  put,
  takeEvery,
} from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";

import UserApi from "../../api/user";
import WriteApi, { PushPost } from "../../api/write";

import { PushState, updatePushes, updateWriteError } from ".";

// getGithubPushes
export const fetchGithubPushes = createAction<string>("write/fetchGithubPushs");

function* getGithubPushes(action: ReturnType<typeof fetchGithubPushes>) {
  try {
    const res: SagaReturnType<typeof UserApi.fetchGithubPushes> = yield call(
      UserApi.fetchGithubPushes,
      action.payload
    );

    const pushs: PushState[] = [];

    for (const event of res.data) {
      if (event.type === "PushEvent") {
        pushs.push({
          pushId: event.payload.push_id,
          repoName: event.repo.name,
          branchName: event.payload.ref,
          commitUrls: event.payload.commits.map((commit) => commit.url),
          uploadedAt: event.created_at,
        });
      }
    }
    yield put(updatePushes(pushs));
  } catch (e: any) {
    yield put(updateWriteError(e.message));
  }
}

function* getGithubPushesSaga() {
  yield takeEvery(fetchGithubPushes.type, getGithubPushes);
}

// savePushWrite
export const savePushPost = createAction<PushPost>("write/savePushPost");

function* postPushPost(action: ReturnType<typeof savePushPost>) {
  console.log(action.payload);
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

function* writeSaga() {
  yield all([getGithubPushesSaga(), postPushPostSaga()]);
}

export default writeSaga;
