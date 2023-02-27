import { configureStore } from "@reduxjs/toolkit";
import AuthModalReducer from "./AuthModalSlice";
import CommunityReducer from "./communitiesSlice";

const store = configureStore({
  reducer: {
    authModal: AuthModalReducer,
    community: CommunityReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
