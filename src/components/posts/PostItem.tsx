import { Post, selectPost } from "@/store/postSlice";
import {
  Alert,
  AlertIcon,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import React, { FC, useState } from "react";
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
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost: (post: Post) => void;
}

const PostItem: FC<PostItemProps> = ({
  post,
  userISCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new Error("Failed to delete post");
      }

      console.log("Post deleted");
    } catch (error: any) {
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  return (
    <Flex
      border={"1px solid"}
      bg={"white"}
      borderColor={"gray.300"}
      borderRadius={4}
      _hover={{ borderColor: "gray.500" }}
      cursor='pointer'
      onClick={() => onSelectPost}>
      <Flex
        direction={"column"}
        align='center'
        bg={"gray.100"}
        p={2}
        width='40px'
        borderRadius={4}>
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={() => onVote}
          cursor='pointer'
        />
        <Text fontSize='9pt'>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === 1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={() => onVote}
          cursor='pointer'
        />
      </Flex>
      <Flex direction={"column"} width='100%'>
        {error && (
          <Alert status='error'>
            <AlertIcon />
            <Text mr={2}>Error creating post</Text>
          </Alert>
        )}
        <Stack spacing={1} p='10px'>
          <Stack
            direction={"row"}
            spacing={0.6}
            align='center'
            fontSize={"9pt"}>
            {/* Home Page Check */}
            <Text>
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize={"12pt"} fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize={"10pt"}>{post.body}</Text>
          {post.imageURL && (
            <Flex justify={"center"} align='center' p={2}>
              {loadingImage && (
                <Skeleton height='200px' width='100%' borderRadius={4} />
              )}
              <Image
                src={post.imageURL}
                maxHeight={"460px"}
                alt='postImage'
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}></Image>
            </Flex>
          )}
        </Stack>
        <Flex ml={1} mb={0.5} color={"gray.500"} fontWeight={600}>
          <Flex
            align={"center"}
            padding='8px 10px'
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor='pointer'>
            <Icon as={BsChat} mr={2} />
            <Text fontSize={"9pt"}>{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align={"center"}
            padding='8px 10px'
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor='pointer'>
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize={"9pt"}>Share</Text>
          </Flex>
          <Flex
            align={"center"}
            padding='8px 10px'
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor='pointer'>
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize={"9pt"}>Save</Text>
          </Flex>
          {userISCreator && (
            <Flex
              align={"center"}
              padding='8px 10px'
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor='pointer'
              onClick={handleDelete}>
              {loadingDelete ? (
                <Spinner />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize={"9pt"}>Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;