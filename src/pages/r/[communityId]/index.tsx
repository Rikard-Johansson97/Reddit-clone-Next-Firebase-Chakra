import { firestore } from "@/firebase/clientApp";
import { Community } from "@/store/communitiesSlice";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import React, { FC } from "react";
import safeJsonStringify from "safe-json-stringify";

interface CommunityPageProps {
  communityData: Community;
}

const CommunityPage: FC<CommunityPageProps> = ({ communityData }) => {
  console.log("Community data", communityData);
  return <div>{communityData.id}</div>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);

    return {
      props: {
        communityData: JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ),
      },
    };
  } catch (error) {
    // could add error page here
    console.log("getServerSideProps error", error);
  }
}

export default CommunityPage;
