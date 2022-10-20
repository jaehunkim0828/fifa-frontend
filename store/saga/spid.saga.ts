import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeLatest } from "redux-saga/effects";

import { Status, setSpidValue, spidRequest } from "../slices/spidSlice";

function* setSpidValueSaga(action: PayloadAction<Status>) {
  try {
    yield delay(500);
    yield put(setSpidValue(action.payload));
  } catch (err) {
    console.dir(err);
  }
}

export function* spidSaga() {
  yield takeLatest(spidRequest, setSpidValueSaga);
}
