import React, { FC } from "react";
import { Flex, Image } from "@chakra-ui/react";

const Navbar: FC = ({}) => {
  return (
    <Flex bg='white' height='44px' padding='6px 12px'>
      <Flex>
        <Image
          src='/images/redditFace.svg'
          height={30}
          alt='RedditFace'></Image>
        <Image
          src={"/images/redditText.svg"}
          height={30}
          alt='RedditText'
          display={{ base: "none", md: "unset" }}></Image>
      </Flex>
      {/* <Directory/>
      <SearchInput/>
      <RightContent /> */}
    </Flex>
  );
};

export default Navbar;
