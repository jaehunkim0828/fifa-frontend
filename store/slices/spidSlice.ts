import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Status {
  spid: string;
  name: string;
}
interface CommonState {
  value: {
    [key in string]: string;
  };
}

const initialState: CommonState = {
  value: {},
};

const spidSlice = createSlice({
  name: "spid",
  initialState,
  reducers: {
    // reducer
    setSpidValue: {
      reducer: (state, action: PayloadAction<Status>) => {
        if (state.value[action.payload.spid]) {
          delete state.value[action.payload.spid];
          return;
        }

        state.value = {
          ...state.value,
          [action.payload.spid]: action.payload.name,
        };
      },
      prepare: (text: Status) => ({
        payload: text,
      }),
    },
    resetSpidValue(state) {
      state.value = {};
    },
  },
});

// counter action function
export const { setSpidValue, resetSpidValue } = spidSlice.actions;

export default spidSlice;