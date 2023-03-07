import About from "@/components/Community/About";
import PageContent from "@/components/Layout/PageContent";
import Comments from "@/components/posts/comments/Comments";
import PostItem from "@/components/posts/PostItem";
import { auth, firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import usePosts from "@/hooks/usePosts";
import { Post, selectPost } from "@/store/postSlice";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";

interface PostPageProps {}

const PostPage: FC<PostPageProps> = ({}) => {
  const [user] = useAuthState(auth);
  const { postsStateValue, setPostStateValue, onDeletePost, onVote } =
    usePosts();
  const { communityStateValue } = useCommunityData();
  const router = useRouter();
  const dispatch = useDispatch();

  const fetchPost = async (postId: string) => {
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const postDoc = await getDoc(postDocRef);
      dispatch(selectPost({ id: postDoc.id, ...postDoc.data() } as Post));
    } catch (error) {
      console.log("fetchPost error", error);
    }
  };

  useEffect(() => {
    const { pid } = router.query;

    if (pid && !postsStateValue.selectedPost) {
      fetchPost(pid as string);
    }
  }, [router.query, postsStateValue.selectedPost]);
  return (
    <PageContent>
      <>
        {postsStateValue.selectedPost && (
          <PostItem
            post={postsStateValue.selectedPost}
            onVote={onVote}
            onDeletePost={onDeletePost}
            userVoteValue={
              postsStateValue.postVotes.find(
                (item) => item.postId === postsStateValue.selectedPost?.id
              )?.voteValue
            }
            userISCreator={
              user?.uid === postsStateValue.selectedPost?.creatorId
            }
          />
        )}
        <Comments
          user={user as User}
          selectedPost={postsStateValue.selectedPost}
          communityId={postsStateValue.selectedPost?.communityId as string}
        />
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};

export default PostPage;
