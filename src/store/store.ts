import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthModalReducer from "./AuthModalSlice";
import CommunityReducer from "./communitiesSlice";
import postSliceReducer from "./postSlice";

const store = configureStore({
  reducer: {
    authModal: AuthModalReducer,
    community: CommunityReducer,
    postSlice: postSliceReducer,
  },
  middleware: [...getDefaultMiddleware({
    serializableCheck: false, // disable serializable check for the whole store
  })],
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
