import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Stats } from "@type/rank.type";

export interface Status {
  spid: string;
  name: string;
  stats: Stats;
}
interface CommonState {
  value: {
    [spid in string]: { name: string; stats: Stats };
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
    spidRequest(state, action: PayloadAction<Status>) {},
    setSpidValue: {
      reducer: (state, action: PayloadAction<Status>) => {
        if (state.value[action.payload.spid]) {
          delete state.value[action.payload.spid];
          return;
        }

        state.value = {
          ...state.value,
          [action.payload.spid]: {
            name: action.payload.name,
            stats: action.payload.stats,
          },
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
export const { spidRequest, setSpidValue, resetSpidValue } = spidSlice.actions;

export default spidSlice;
