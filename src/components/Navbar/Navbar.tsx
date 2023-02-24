import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: FC = ({}) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex
      bg='white'
      height='44px'
      padding='6px 12px'
      justify={{ md: "space-between" }}>
      <Flex
        align={"center"}
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}>
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
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
