import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Status {
  spid: string;
  name: string;
}
interface CommonState {
  value: Status;
}

const initialState: CommonState = {
  value: {
    spid: "",
    name: "",
  },
};

const spidSlice = createSlice({
  name: "spid",
  initialState,
  reducers: {
    // reducer
    setSpidValue: {
      reducer: (state, action: PayloadAction<Status>) => {
        state.value = action.payload;
      },
      prepare: (text: Status) => ({
        payload: text,
      }),
    },
    resetSpidValue(state, action: PayloadAction) {
      state.value = {
        spid: "",
        name: "",
      };
    },
  },
});

// counter action function
export const { setSpidValue, resetSpidValue } = spidSlice.actions;

export default spidSlice;
