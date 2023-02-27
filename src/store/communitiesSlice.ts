import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: 'public' | 'restricted' | 'private';
  createdAt?: any;
  imageUrl?: string;
}

export interface CommunitySnippet {
  communityId: string;
  isModerator: boolean;
  imageUrl: string;
}

export interface CommunityState {
  mySnippets: CommunitySnippet[];
}

export const initialState: CommunityState = {
  mySnippets: [],
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    // Define a reducer to update the entire community state
    updateCommunityState: (state, action: PayloadAction<CommunityState>) => {
      return action.payload;
    },
    // Define a reducer to update the mySnippets field of the community state
    updateMySnippets: (state, action: PayloadAction<CommunitySnippet[]>) => {
      state.mySnippets = action.payload;
    },
    // Define a reducer to reset the community state to the initial state
    resetCommunityState: (state) => {
      return initialState;
    },
  },
});

export const { updateCommunityState, updateMySnippets, resetCommunityState } = communitySlice.actions;

export default communitySlice.reducer;
