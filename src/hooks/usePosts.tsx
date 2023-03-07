import { auth, firestore, storage } from "@/firebase/clientApp";
import { openModal, setView } from "@/store/AuthModalSlice";
import { Community } from "@/store/communitiesSlice";
import {
  deletePost,
  Post,
  PostState,
  PostVote,
  selectPost,
  setPosts,
  votePost,
} from "@/store/postSlice";
import { RootState } from "@/store/store";
import { collection, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";

const usePosts = (communityData?: Community) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const postsStateValue = useSelector<RootState, PostState>(
    (state) => state.postSlice
  );
  const [user] = useAuthState(auth);

  const onSelectPost = (post: Post) => {
    dispatch(selectPost(post));
    router.push(`/r/${post.communityId}/comments/${post.id}`);
  };

  const onVote = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => {
    event.stopPropagation();

    if (!user?.uid) {
      dispatch(setView("login")), dispatch(openModal());
      return;
    }
    try {
      const { voteStatus } = post;

      // Find any existing vote for the current user on the current post
      const existingVote = postsStateValue.postVotes.find(
        (vote) => vote.postId === post.id
      );

      // Create a batch object to batch write to Firestore
      const batch = writeBatch(firestore);

      // Create updated copies of the post, post votes, and the vote change
      const updatedPost = { ...post };
      const updatedPosts = [...postsStateValue.posts];
      let updatedPostVotes = [...postsStateValue.postVotes];
      let voteChange = vote;

      // If there is no existing vote for the current user on the current post,
      // create a new post vote document and update the post and post votes
      if (!existingVote) {
        const postVoteRef = doc(
          collection(firestore, "users", `${user?.uid}/postVotes`)
        );

        const newVote: PostVote = {
          id: postVoteRef.id,
          postId: post.id!,
          communityId,
          voteValue: vote,
        };

        batch.set(postVoteRef, newVote);

        updatedPost.voteStatus = voteStatus + vote;
        updatedPostVotes = [...updatedPostVotes, newVote];
      } else {
        // If there is an existing vote for the current user on the current post,
        // update the existing post vote document and update the post and post votes
        const postVoteRef = doc(
          firestore,
          "users",
          `${user?.uid}/postVotes/${existingVote.id}`
        );

        if (existingVote.voteValue === vote) {
          // If the current vote is the same as the existing vote, delete the post vote document
          // and update the post and post votes
          updatedPost.voteStatus = voteStatus - vote;
          updatedPostVotes = updatedPostVotes.filter(
            (vote) => vote.id !== existingVote.id
          );

          batch.delete(postVoteRef);

          voteChange *= -1;
        } else {
          // If the current vote is different from the existing vote, update the post vote document
          // and update the post and post votes
          updatedPost.voteStatus = voteStatus + 2 * vote;

          const voteIndex = postsStateValue.postVotes.findIndex(
            (vote) => vote.id === existingVote.id
          );

          // If the existing vote was found, update it
          updatedPostVotes[voteIndex] = {
            ...existingVote,
            voteValue: vote,
          };
          batch.update(postVoteRef, {
            voteValue: vote,
          });

          voteChange = 2 * vote;
        }
      }

      // Update the post and add it to the batch
      const postIdx = postsStateValue.posts.findIndex(
        (item) => item.id === post.id
      );
      updatedPosts[postIdx] = updatedPost;

      batch.update(doc(firestore, "posts", post.id!), {
        voteStatus: voteStatus + voteChange,
      });

      // Commit the batch write to Firestore

      // Update the state with the updated posts and post votes
      dispatch(setPosts(updatedPosts));
      dispatch(votePost(updatedPostVotes));

      if (postsStateValue.selectedPost) {
        dispatch(selectPost(updatedPost));
      }

      await batch.commit();
    } catch (error) {
      console.log("onVote error: ", error);
    }
  };

  const onDeletePost = async (post: Post): Promise<boolean> => {
    try {
      if (post.imageURL) {
        const imageRef = ref(storage, `posts/${post.id}/image`);
        await deleteObject(imageRef);
      }

      const postDocRef = doc(firestore, "posts", post.id!);
      await deleteDoc(postDocRef);

      dispatch(deletePost(post.id as string));
      return true;
    } catch (error: any) {
      return false;
    }
  };

  const setPostStateValue = (posts: Post[]) => {
    dispatch(setPosts(posts as Post[]));
  };

  const getCommunityPostVotes = async (communityId: string) => {};

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
