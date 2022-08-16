import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createLogger } from "redux-logger";
import { MakeStore, createWrapper } from "next-redux-wrapper";

import spidSlice from "./slices/spidSlice";

// 리덕스 미들웨어
const logger = createLogger();

// 모든 reducers
const rootReducer = combineReducers({
  spid: spidSlice.reducer,
});

const initialState = {};

// 저장소 만들기
const store1 = configureStore({
  reducer: rootReducer,
  middleware: middleware => middleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
  enhancers: defaultEnhancers => [...defaultEnhancers],
});

export type RootState = ReturnType<typeof store1.getState>;
export type AppDispatch = typeof store1.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const makeStore: MakeStore<any> = () => {
  return store1;
};

export const wrapper = createWrapper<any>(makeStore, { debug: false });
