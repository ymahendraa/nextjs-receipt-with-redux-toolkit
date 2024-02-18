// utils imports
import { TODO } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState: TODO = {
  identifier: "",
  status: false,
  type: "",
};
const activeStateSlice = createSlice({
  name: "activeState",
  initialState,
  reducers: {
    onChangeActive: (
      _,
      action: PayloadAction<{
        identifier: string;
        type: string | undefined;
        status: boolean | undefined;
      }>
    ) => {
      const { identifier, type, status } = action.payload;
      return {
        identifier: identifier,
        status: status,
        type: type,
      };
    },
    clearTemporaryActive: () => initialState,
  },
});

export const { onChangeActive, clearTemporaryActive } =
  activeStateSlice.actions;

export default activeStateSlice.reducer;
