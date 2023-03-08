import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IconType } from "react-icons";
import { TiHome } from "react-icons/ti";

export type DirectoryMenuItem = {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

export interface DirectoryMenuState {
  isOpen: boolean;
  selectedMenuItem: DirectoryMenuItem;
}

export const initialState: DirectoryMenuState = {
  isOpen: false,
  selectedMenuItem: {
    displayText: "Home",
    link: "/",
    icon: TiHome,
    iconColor: "black",
  },
};

export const defaultMenuItem: DirectoryMenuItem = {
  displayText: "Home",
  link: "/",
  icon: TiHome,
  iconColor: "black",
};

const directoryMenuSlice = createSlice({
  name: "directoryMenu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    selectMenuItem: (state, action: PayloadAction<DirectoryMenuItem>) => {
      state.selectedMenuItem = action.payload;
    },
  },
});

export const { toggleMenu, selectMenuItem } = directoryMenuSlice.actions;

export default directoryMenuSlice.reducer;
