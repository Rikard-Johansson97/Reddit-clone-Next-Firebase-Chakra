import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Community } from "@/store/communitiesSlice";
import { Post } from "@/store/postSlice";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";

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
  } = usePosts(communityData);

  const getPosts = async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
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

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {postsStateValue.posts.map((post, i) => (
        <PostItem
          key={i}
          post={post}
          userISCreator={user?.uid === post.creatorId}
          userVoteValue={undefined}
          onVote={onVote}
          onSelectPost={onSelectPost}
          onDeletePost={onDeletePost}
        />
      ))}
    </>
  );
};

export default Posts;
