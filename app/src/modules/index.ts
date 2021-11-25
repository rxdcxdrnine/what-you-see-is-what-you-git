import { AnyAction, combineReducers } from "redux";
import { all } from "@redux-saga/core/effects";
import writeSlice from "./write";
import userSaga from "./user/saga";
import userSlice from "./user";
import writeSaga from "./write/saga";
import followSlice from "./follow";
import followSaga from "./follow/saga";
import { createAction } from "@reduxjs/toolkit";

export const appReducer = combineReducers({
  user: userSlice.reducer,
  write: writeSlice.reducer,
  follow: followSlice.reducer,
});

export const logOut = createAction<void>("logout");

export const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === logOut.type) {
    return appReducer(undefined, { type: undefined });
  }

  return appReducer(state, action);
};

export function* rootSaga() {
  yield all([userSaga(), writeSaga(), followSaga()]);
}

export type RootState = ReturnType<typeof rootReducer>;
