import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

export type Post = {
    id: string;
    communityId: string;
    communityImageURL?: string;
    userDisplayText: string; // change to authorDisplayText
    creatorId: string;
    title: string;
    body: string;
    numberOfComments: number;
    voteStatus: number;
    currentUserVoteStatus?: {
      id: string;
      voteValue: number;
    };
    imageURL?: string;
    postIdx?: number;
    createdAt?: Timestamp;
    editedAt?: Timestamp;
  };

export type PostVote = {
    id?: string;
    postId: string;
    communityId: string;
    voteValue: number;
  };

export interface PostState {
  selectedPost: Post | null;
  posts: Post[];
  postVotes: PostVote[];
  postsCache: {
    [key: string]: Post[];
  };
  postUpdateRequired: boolean;
}

const initialState: PostState = {
  selectedPost: null,
  posts: [],
  postVotes: [],
  postsCache: {},
  postUpdateRequired: true,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setPostVotes: (state, action: PayloadAction<PostVote[]>) => {
      state.postVotes = action.payload;
    },
    setPostsCache: (
      state,
      action: PayloadAction<{ key: string; value: Post[] }>
    ) => {
      state.postsCache[action.payload.key] = action.payload.value;
    },
    setPostUpdateRequired: (state, action: PayloadAction<boolean>) => {
      state.postUpdateRequired = action.payload;
    },
  },
});

export const {
  setSelectedPost,
  setPosts,
  setPostVotes,
  setPostsCache,
  setPostUpdateRequired,
} = postSlice.actions;

export default postSlice.reducer;
