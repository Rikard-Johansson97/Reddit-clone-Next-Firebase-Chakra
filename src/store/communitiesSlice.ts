// communitySlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: any;
  imageURL?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

export interface CommunityState {
  id: string;
  mySnippets: CommunitySnippet[];
  currentCommunity?: Community | null;
  snippetsFetched: boolean;
}

const initialState: CommunityState = {
  id: "",
  mySnippets: [],
  snippetsFetched: false,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    updateCommunityState: (state, action: PayloadAction<CommunityState>) => {
      return action.payload;
    },
    updateMySnippets: (state, action: PayloadAction<CommunitySnippet[]>) => {
      state.mySnippets = action.payload;
    },
    leaveCommunityReducer: (state, action: PayloadAction<string>) => {
      state.mySnippets = state.mySnippets.filter(
        (snippet) => snippet.communityId !== action.payload
      );
      state.currentCommunity = null;
    },
    setSnippetsFetched: (state, action: PayloadAction<boolean>) => {
      state.snippetsFetched = action.payload;
    },
    addSnippet: (state, action: PayloadAction<CommunitySnippet>) => {
      state.mySnippets.push(action.payload);
    },
    setCurrentCommunity: (state, action: PayloadAction<Community>) => {
      state.currentCommunity = action.payload;
    },
    updateCommunityImage: (state, action: PayloadAction<string>) => {
      if (state.currentCommunity) {
        state.currentCommunity.imageURL = action.payload;
      }
    },
  },
});

export const {
  updateCommunityState,
  updateMySnippets,
  leaveCommunityReducer,
  setSnippetsFetched,
  addSnippet,
  updateCommunityImage,
  setCurrentCommunity,
} = communitySlice.actions;

export default communitySlice.reducer;
