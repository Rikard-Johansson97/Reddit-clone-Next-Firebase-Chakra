import { Community } from "@/store/communitiesSlice";
import React, { FC } from "react";

interface AboutProps {
  communityData: Community;
}

const About: FC<AboutProps> = ({ communityData }) => {
  return <div>About</div>;
};

export default About;
