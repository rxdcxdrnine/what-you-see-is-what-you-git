import { combineReducers } from "redux";
import { all } from "@redux-saga/core/effects";
import writeSlice from "./write";
import userSaga from "./user/saga";
import userSlice from "./user";
import writeSaga from "./write/saga";
import followSlice from "./follow";
import followSaga from "./follow/saga";

export const rootReducer = combineReducers({
  user: userSlice.reducer,
  write: writeSlice.reducer,
  follow: followSlice.reducer,
});

export function* rootSaga() {
  yield all([userSaga(), writeSaga(), followSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;
