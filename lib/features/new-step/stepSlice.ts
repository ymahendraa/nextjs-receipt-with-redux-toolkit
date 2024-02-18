// utils imports
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";
const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    onChangeStep: (_, action: PayloadAction<string>) => action.payload,
    setTemporaryStep: (_, action: PayloadAction<string>) => action.payload,
    clearTemporaryStep: () => initialState,
  },
});

export const { onChangeStep, clearTemporaryStep, setTemporaryStep } =
  stepSlice.actions;

export default stepSlice.reducer;
