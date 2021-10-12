import {
  all,
  call,
  SagaReturnType,
  put,
  takeEvery,
} from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";

import UserApi from "../../api/user";
import { setError } from "../user";

import { PushState, updatePushs } from ".";

export const getGithubPushs = createAction<string>("user/getGithubPushs");

type SagaResponse = SagaReturnType<typeof UserApi.fetchGithubPushs>;

function* fetchGithubPushs(action: ReturnType<typeof getGithubPushs>) {
  try {
    const res: SagaResponse = yield call(
      UserApi.fetchGithubPushs,
      action.payload
    );

    const pushs: PushState[] = [];

    for (const event of res.data) {
      if (event.type === "PushEvent") {
        pushs.push({
          pushId: event.payload.push_id,
          repoName: event.repo.name,
          branchName: event.payload.ref,
          commits: event.payload.commits.map((commit) => commit.sha),
        });
      }
    }
    yield put(updatePushs(pushs));
  } catch (e: any) {
    yield put(setError(e.message));
  }
}

function* githubPushsSaga() {
  yield takeEvery(getGithubPushs.type, fetchGithubPushs);
}

function* writeSaga() {
  yield all([githubPushsSaga()]);
}

export default writeSaga;
