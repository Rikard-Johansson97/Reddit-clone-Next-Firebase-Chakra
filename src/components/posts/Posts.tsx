import { auth, firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import { Community } from "@/store/communitiesSlice";
import { Post, PostVote, votePost } from "@/store/postSlice";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

interface PostsProps {
  communityData: Community;
  userId?: string;
}

const Posts: FC<PostsProps> = ({ communityData, userId }) => {
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const {
    postsStateValue,
    setPostStateValue,
    onSelectPost,
    onDeletePost,
    onVote,
    error,
  } = usePosts(communityData!);
  const dispatch = useDispatch();
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getPosts = async () => {
    try {
      setLoading(true);
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id!),
        orderBy("createdAt", "desc")
      );

      const postDocs = await getDocs(postQuery);

      // store in our host state
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPostStateValue(posts as Post[]);

      console.log("posts", posts);
    } catch (error: any) {
      console.log("getPosts", error);
    }
    setLoading(false);
  };

  const getCommunityPostVote = async (communityId: string) => {
    const postVotesQuery = query(
      collection(firestore, "users", `${user?.uid}/postVotes`),
      where("communityId", "==", communityId)
    );

    const postVoteDocs = await getDocs(postVotesQuery);
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(votePost(postVotes as PostVote[]));
  };

  useEffect(() => {
    getPosts();
  }, [communityData]);

  useEffect(() => {
    if (!user || !communityStateValue?.currentCommunity?.id) return;
    getCommunityPostVote(communityStateValue?.currentCommunity?.id as string);
  }, [user, communityStateValue?.currentCommunity]);

  useEffect(() => {
    if (!user) {
      dispatch(votePost([]));
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postsStateValue.posts.map((post, i) => (
            <PostItem
              key={post.id}
              post={post}
              userISCreator={user?.uid === post.creatorId}
              userVoteValue={
                postsStateValue.postVotes.find(
                  (vote) => vote.postId === post.id
                )?.voteValue
              }
              onVote={onVote}
              onSelectPost={onSelectPost}
              onDeletePost={onDeletePost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Posts;
