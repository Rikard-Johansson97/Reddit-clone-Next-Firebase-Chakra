import { auth } from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";
import { defaultMenuItem } from "@/store/directoryMenuReducer";
import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: FC = ({}) => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex
      bg='white'
      height='44px'
      padding='6px 12px'
      justifyContent={{ md: "space-between" }}>
      <Flex
        align='center'
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor='pointer'
        onClick={() => onSelectMenuItem(defaultMenuItem)}>
        <Image src='/images/redditFace.svg' height='30px' alt='Reddit face' />
        <Image
          display={{ base: "none", md: "unset" }}
          src='/images/redditText.svg'
          height='46px'
          alt='Reddit Icon'
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
