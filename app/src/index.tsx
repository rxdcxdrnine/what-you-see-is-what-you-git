import createSagaMiddleware from "@redux-saga/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { rootReducer, rootSaga } from "./modules";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { createBrowserHistory } from "history";
import ReduxThunk from "redux-thunk";
import { Router } from "react-router-dom";

const customHistory = createBrowserHistory({ forceRefresh: true });
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});
const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ReduxThunk.withExtraArgument({ history: customHistory }),
    sagaMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
