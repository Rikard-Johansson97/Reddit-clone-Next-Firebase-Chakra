import { Post } from "@/store/postSlice";
import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

interface PostItemProps {
  post: Post;
  userISCreator: boolean;
  userVoteValue?: number;
  onVote?: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    post: Post,
    vote: number,
    communityId: string
  ) => {};
  onDeletePost: (post: Post, postIdx: number) => {};
  onSelectPost: (post: Post, postIdx: number) => void;
}

const PostItem: FC<PostItemProps> = ({
  post,
  userISCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  console.log(post);

  return (
    <Flex border={"1px solid"} bg={"white"}>
      {post.title}
    </Flex>
  );
};

export default PostItem;
