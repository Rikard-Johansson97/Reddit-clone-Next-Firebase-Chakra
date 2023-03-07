import { firestore } from "@/firebase/clientApp";
import {
  decrementComments,
  incrementComments,
  Post,
  setPosts,
  updatePost,
} from "@/store/postSlice";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { log } from "console";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CommentInput from "./CommentInput";
import CommentItem, { Comment } from "./CommentItem";

interface CommentsProps {
  user: User;
  selectedPost: Post | null;
  communityId: string;
}

const Comments: FC<CommentsProps> = ({ user, selectedPost, communityId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState("");
  const dispatch = useDispatch();

  const onCreateComment = async (commentText: string) => {
    setCreateLoading(true);
    // create comment document
    // update post numberOfComments
    try {
      const batch = writeBatch(firestore);

      const commentDocRef = doc(collection(firestore, "comments"));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      // update post numberOfComments +1

      const postDocRef = doc(firestore, "posts", selectedPost?.id!);

      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      // update client redux state
      setCommentText("");
      setComments((prev) => [newComment, ...prev]);
      dispatch(incrementComments(selectedPost?.id as string));
    } catch (error) {
      console.log("onCreateComment", error);
    }
    setCreateLoading(false);
  };
  const onDeleteComment = async (comment: Comment) => {
    setLoadingDeleteId(comment.id);
    try {
      const batch = writeBatch(firestore);
      // delete comment document
      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);
      // update post numberOfComments
      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });

      await batch.commit();

      dispatch(decrementComments(selectedPost?.id as string));
      // update client redux state

      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error) {
      console.log("onDeleteComment", error);
    }
    setLoadingDeleteId("");
  };
  const getPostComment = async (commentText: string) => {
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost?.id),
        orderBy("createdAt", "desc")
      );
      const commentDocs = await getDocs(commentsQuery);
      const comments = commentDocs.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setComments(comments as Comment[]);
    } catch (error) {
      console.log("getPostComment", error);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    if (!selectedPost) return;
    getPostComment(commentText);
  }, [selectedPost]);
  return (
    <Box bg='white' borderRadius={"0px 0px 4px 4px"} p={2}>
      <Flex
        direction={"column"}
        pl={10}
        pr={4}
        mb={6}
        fontSize='10pt'
        width={"100%"}>
        {!fetchLoading && (
          <CommentInput
            commentText={commentText}
            setCommentText={setCommentText}
            user={user}
            createLoading={createLoading}
            onCreateComment={onCreateComment}
          />
        )}
      </Flex>
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding='6px' bg={"white"}>
                <SkeletonCircle size={"10"} />
                <SkeletonText mt={"4"} noOfLines={2} spacing='4' />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                direction={"column"}
                justify='center'
                align={"center"}
                borderTop='1px solid'
                borderColor='gray.100'
                p={20}>
                <Text fontWeight={700} opacity={0.3}>
                  No comments yet
                </Text>
              </Flex>
            ) : (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={loadingDeleteId === comment.id}
                    userId={user.uid}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Comments;
