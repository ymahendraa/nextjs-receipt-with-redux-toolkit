// utils imports
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";
const currentStateSlice = createSlice({
  name: "currentState",
  initialState,
  reducers: {
    onChangeCurrentState: (_, action: PayloadAction<string>) => action.payload,
    clearCurrentState: () => initialState,
  },
});

export const { onChangeCurrentState, clearCurrentState } =
  currentStateSlice.actions;

export default currentStateSlice.reducer;
