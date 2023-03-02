import { auth } from "@/firebase/clientApp";
import { Community } from "@/store/communitiesSlice";
import { Post, PostState, setPosts, updatePost } from "@/store/postSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";

const usePosts = (communityData?: Community) => {
  const dispatch = useDispatch();
  const postsStateValue = useSelector<RootState, PostState>(
    (state) => state.postSlice
  );

  console.log(postsStateValue);

  const onSelectPost = (post: Post, postIdx: number) => {};

  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => {};

  const onDeletePost = async (post: Post): Promise<boolean> => {
    return true;
  };

  const setPostStateValue = (posts: Post[]) => {
    dispatch(setPosts(posts as Post[]));
  };

  const getCommunityPostVotes = async (communityId: string) => {};

  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  return {
    postsStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    loading,
    setLoading,
    onVote,
    error,
  };
};

export default usePosts;
