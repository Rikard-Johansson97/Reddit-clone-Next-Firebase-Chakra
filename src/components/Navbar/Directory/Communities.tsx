import CreateCommunityModal from "@/components/Modal/Auth/CreateCommunity/CreateCommunityModal";
import useCommunityData from "@/hooks/useCommunityData";
import { AuthModalState } from "@/store/AuthModalSlice";
import { CommunitySnippet, CommunityState } from "@/store/communitiesSlice";
import { RootState } from "@/store/store";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { FaReddit } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { useSelector } from "react-redux";
import MenuListItem from "./MenuListItem";

interface CommunitiesProps {}

const Communities: FC<CommunitiesProps> = ({}) => {
  const [open, setOpen] = useState(false);
  const mySnippets = useSelector<RootState, CommunitySnippet[]>(
    (state) => state.community.mySnippets
  );

  return (
    <>
      <Box>
        <Text pl={3} mb={1} fontSize='7pt' fontWeight={500} color='gray.500'>
          MODERATING
        </Text>
        {mySnippets
          ?.filter((snippet) => snippet.isModerator)
          .map((snippet: CommunitySnippet) => (
            <MenuListItem
              displayText={`r/${snippet.communityId}`}
              icon={FaReddit}
              key={snippet.communityId}
              link={`/r/${snippet.communityId}`}
              iconColor='brand.100'
              imageURL={snippet.imageURL}
            />
          ))}
      </Box>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box>
        <Text pl={3} mb={1} fontSize='7pt' fontWeight={500} color='gray.500'>
          My Communities
        </Text>
        <MenuItem
          width={"100%"}
          fontSize='10pt'
          _hover={{ bg: "gray.100" }}
          onClick={() => {
            setOpen(true);
          }}>
          <Flex align={"center"}>
            <Icon as={GrAdd} fontSize={20} mr={2} />
            <Text>Create Community</Text>
          </Flex>
        </MenuItem>
        {mySnippets?.map((snippet: CommunitySnippet) => (
          <MenuListItem
            displayText={`r/${snippet.communityId}`}
            icon={FaReddit}
            key={snippet.communityId}
            link={`/r/${snippet.communityId}`}
            iconColor='blue.500'
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};

export default Communities;
