import { auth, firestore, storage } from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import { Community, updateCommunityImage } from "@/store/communitiesSlice";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

interface AboutProps {
  communityData: Community;
}

const About: FC<AboutProps> = ({ communityData }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile, setSelectedFile, onSelectedImage } = useSelectFile();
  const [uploadingImage, setUploadingImage] = useState(false);
  const dispatch = useDispatch();

  const onUpdateImage = async () => {
    if (!selectedFile) return;
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/images`);

      await uploadString(imageRef, selectedFile, "data_url");

      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });

      dispatch(updateCommunityImage(downloadURL));
    } catch (error: any) {
      console.log("onUpdateImage error", error);
    }
  };

  return (
    <Box position={"sticky"} top='14px'>
      <Flex
        justify={"space-between"}
        align={"center"}
        bg={"blue.400"}
        color='white'
        p={3}
        borderRadius={"4px 4px 0px 0px"}>
        <Text fontSize={"10pt"} fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex
        direction={"column"}
        p={3}
        bg='white'
        borderRadius={"0px 0px 4px 4px"}>
        <Stack>
          <Flex width={"100%"} p={2} fontSize='10pt' fontWeight={700}>
            <Flex direction={"column"} flexGrow={1}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction={"column"} flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex
            align={"center"}
            width='100%'
            p={1}
            fontWeight={500}
            fontSize='10pt'>
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {communityData.createdAt && (
              <Text>
                Created{" "}
                {moment(
                  new Date(communityData.createdAt.seconds * 1000)
                ).format("MMM DD, YYYY")}
              </Text>
            )}
          </Flex>
          <Link href={`/r/${router.query.communityId}/submit`}>
            <Button width={"100%"} h='30px'>
              Create Post
            </Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize='10pt'>
                <Text fontWeight={600}>Admin</Text>
                <Flex align={"center"} justify='space-between'>
                  <Text
                    color='blue.500'
                    cursor={"pointer"}
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}>
                    Change Image
                  </Text>
                  {communityData.imageURL || selectedFile ? (
                    <Image
                      src={selectedFile || communityData.imageURL}
                      alt='community Image'
                      boxSize={"40px"}
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize={40}
                      color='brand.100'
                      mr={2}
                    />
                  )}
                </Flex>
                {selectedFile && uploadingImage ? (
                  <Spinner />
                ) : (
                  <Text cursor={"pointer"} onClick={() => onUpdateImage}>
                    Save Changes
                  </Text>
                )}
                <Input
                  id='file-upload'
                  type={"file"}
                  accept='image/x-png,image/gif,image/jpeg'
                  hidden
                  ref={selectedFileRef}
                  onChange={() => onSelectedImage}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default About;
