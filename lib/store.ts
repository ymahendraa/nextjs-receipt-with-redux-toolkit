import { configureStore } from "@reduxjs/toolkit";
import receiptSlice from "./features/receipt/receiptSlice";
import sidebarSlice from "./features/sidebar/sidebarSlice";
import stepSlice from "./features/new-step/stepSlice";
import activeStateSlice from "./features/active-state/activeStateSlice";
import currentStateSlice from "./features/current-step/currentStepSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      receipt: receiptSlice,
      sidebar: sidebarSlice,
      newStep: stepSlice,
      activeState: activeStateSlice,
      currentState: currentStateSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
