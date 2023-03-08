import { Community, CommunityState } from "@/store/communitiesSlice";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { FaReddit } from "react-icons/fa";
import useCommunityData from "@/hooks/useCommunityData";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface HeaderProps {
  communityData: Community;
}

const Header: FC<HeaderProps> = ({ communityData }) => {
  const { onJoinOrLeaveCommunity, loading } = useCommunityData();
  const communityStateValue = useSelector<RootState, CommunityState>(
    (state) => state.community
  );

  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <Flex direction={"column"} width='100%' height='146px'>
      <Box height='50%' bg='blue.400'></Box>
      <Flex justify={"center"} bg='white' flexGrow={1}>
        <Flex width={"95%"} maxWidth='860px'>
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              src={communityStateValue.currentCommunity?.imageURL}
              alt='Community image'
              borderRadius={"full"}
              boxSize='66px'
              position={"relative"}
              top={-3}
              color='blue.500'
              border='4px solid white'
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position='relative'
              top={-3}
              color={"blue.500"}
              border={"4px solid white"}
              borderRadius='50%'
            />
          )}
          <Flex padding={"10px 16px"}>
            <Flex direction={"column"} mr={6}>
              <Text fontWeight={800} fontSize='16pt'>
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize='10pt' color={"gray.400"}>
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              variant={isJoined ? "outline" : "solid"}
              height='30px'
              pr={6}
              pl={6}
              isLoading={loading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}>
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
