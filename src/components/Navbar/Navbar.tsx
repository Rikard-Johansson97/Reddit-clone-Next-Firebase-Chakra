import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: FC = ({}) => {
  const [user, loading, error] = useAuthState(auth);
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
      {/* <Directory/>*/}
      <SearchInput />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
