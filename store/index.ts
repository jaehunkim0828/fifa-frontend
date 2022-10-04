import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { MakeStore, createWrapper } from "next-redux-wrapper";
import { all, fork } from "redux-saga/effects";

import spidSlice from "./slices/spidSlice";
import commentSlice from "./slices/commentSlice";
import { spidSaga } from "./saga/spid.saga";

// 리덕스 미들웨어
const logger = createLogger();

//saga
const sagaMiddleware = createSagaMiddleware();

function* saga() {
  yield all([fork(spidSaga)]);
}

// 모든 reducers
const rootReducer = combineReducers({
  spid: spidSlice.reducer,
  comment: commentSlice.reducer,
});

const initialState = {};

// 저장소 만들기
const store1 = configureStore({
  reducer: rootReducer,
  middleware: middleware => {
    if (process.env.NODE_ENV !== "production") return [sagaMiddleware];
    return middleware();
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
  enhancers: defaultEnhancers => [...defaultEnhancers],
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store1.getState>;
export type AppDispatch = typeof store1.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const makeStore: MakeStore<any> = () => {
  return store1;
};

export const wrapper = createWrapper<any>(makeStore, { debug: false });
