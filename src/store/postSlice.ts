import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";

export interface Post {
  id?: string;
  communityId: string;
  communityImageURL?: string;
  userDisplayText?: string; // change to authorDisplayText
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
  createdAt: Timestamp;
  editedAt?: Timestamp;
  creatorDisplayName?: string;
}

export interface PostVote {
  id?: string;
  postId: string;
  communityId: string;
  voteValue: number;
}

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
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    selectPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    votePost: (state, action: PayloadAction<PostVote[]>) => {
      const newVoteValue = action.payload;
      state.postVotes = newVoteValue;
    },
    setPostCache: (
      state,
      action: PayloadAction<{ key: string; posts: Post[] }>
    ) => {
      state.postsCache[action.payload.key] = action.payload.posts;
    },
    setPostUpdateRequired: (state, action: PayloadAction<boolean>) => {
      state.postUpdateRequired = action.payload;
    },
  },
});

export const {
  selectPost,
  addPost,
  updatePost,
  deletePost,
  votePost,
  setPosts,
  setPostCache,
  setPostUpdateRequired,
} = postSlice.actions;

export default postSlice.reducer;
