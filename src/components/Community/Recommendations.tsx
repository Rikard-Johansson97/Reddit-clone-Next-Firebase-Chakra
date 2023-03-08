import { firestore } from "@/firebase/clientApp";
import useCommunityData from "@/hooks/useCommunityData";
import { Community } from "@/store/communitiesSlice";
import { Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";

interface RecommendationsProps {}

const Recommendations: FC<RecommendationsProps> = ({}) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );

      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communities as Community[]);
    } catch (error) {
      console.log("getCommunityRecommendations", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);
  return (
    <Flex
      direction={"column"}
      bg='white'
      borderRight={4}
      border='1px solid'
      borderColor={"gray.300"}>
      <Flex
        align={"flex-end"}
        color='white'
        p='6px 10px'
        height='70px'
        borderRadius={"4px 4px 0px 0px "}
        fontWeight={700}
        bgImage={`url(/images/recCommsArt.png)`}
        bgSize='cover'
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
        url('images/recCommsArt.png')">
        Top Communities
      </Flex>
      <Flex direction={"column"}>
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex justify='space-between' align='center'>
              <SkeletonCircle size='10' />
              <Skeleton height='10px' width='70%' />
            </Flex>
            <Flex justify='space-between' align='center'>
              <SkeletonCircle size='10' />
              <Skeleton height='10px' width='70%' />
            </Flex>
            <Flex justify='space-between' align='center'>
              <SkeletonCircle size='10' />
              <Skeleton height='10px' width='70%' />
            </Flex>
          </Stack>
        ) : (
          ""
        )}
      </Flex>
    </Flex>
  );
};

export default Recommendations;
