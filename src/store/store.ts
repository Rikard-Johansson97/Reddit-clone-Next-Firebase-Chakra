import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./authModalSlice";

const store = configureStore({
  reducer: {
    authModal: authModalReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
