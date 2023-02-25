import { configureStore } from "@reduxjs/toolkit";
import AuthModalReducer from "./AuthModalSlice";

const store = configureStore({
  reducer: {
    authModal: AuthModalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
