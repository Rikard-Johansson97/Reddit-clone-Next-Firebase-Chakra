// communitySlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: 'public' | 'restricted' | 'private';
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
}

const initialState: CommunityState = {
  id: '',
  mySnippets: [],
  currentCommunity: null,
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    updateCommunityState: (state, action: PayloadAction<CommunityState>) => {
      return action.payload;
    },
    updateMySnippets: (state, action: PayloadAction<CommunitySnippet[]>) => {
      state.mySnippets = action.payload;
    },
    resetCommunityState: (state) => {
      return initialState;
    },
    leaveCommunityReducer: (state, action: PayloadAction<string>) => {
      state.mySnippets = state.mySnippets.filter(
        (snippet) => snippet.communityId !== action.payload
      );
      state.currentCommunity = null;
    },
  },
});

export const { updateCommunityState, updateMySnippets, resetCommunityState, leaveCommunityReducer } =
  communitySlice.actions;

export default communitySlice.reducer;
