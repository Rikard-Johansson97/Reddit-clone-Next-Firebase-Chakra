import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalView = "login" | "signup" | "resetPassword";

export interface AuthModalState {
  open: boolean;
  view: ModalView;
}

const initialState: AuthModalState = {
  open: false,
  view: "login",
};

const AuthModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
    },
    setView: (state, action: PayloadAction<ModalView>) => {
      state.view = action.payload;
    },
  },
});

export const { openModal, closeModal, setView } = AuthModalSlice.actions;

export default AuthModalSlice.reducer;