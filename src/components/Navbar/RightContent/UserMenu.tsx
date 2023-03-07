import { auth } from "@/firebase/clientApp";
import { AuthModalState, openModal, setView } from "@/store/AuthModalSlice";
import {
  resetCommunityState,
  updateCommunityState,
} from "@/store/communitiesSlice";
import { RootState } from "@/store/store";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import { FC } from "react";
import { CgProfile } from "react-icons/cg";
import { FaRedditSquare } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

interface UserMenuProps {
  user?: User | null;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const authModal = useSelector<RootState, AuthModalState>(
    (state) => state.authModal
  );
  const dispatch = useDispatch();

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <Menu>
      <MenuButton
        cursor={"pointer"}
        padding='0px 6px'
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}>
        <Flex alignItems={"center"}>
          <Flex alignItems={"center"}>
            {user ? (
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color={"gray.300"}
                  as={FaRedditSquare}
                />
                <Box
                  display={{ base: "none", lg: "flex" }}
                  flexDirection='column'
                  fontSize='8pt'
                  alignItems='flex-start'
                  mr={8}>
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex alignItems='center'>
                    <Icon as={IoSparkles} color='brand.100' mr={1} />
                    <Text color='gray.400'>1 karma</Text>
                  </Flex>
                </Box>
              </>
            ) : (
              <Icon as={VscAccount} fontSize={24} color={"gray.400"} mr={1} />
            )}
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize={"10pt"}
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}>
              <Flex align={"center"}>
                <Icon as={CgProfile} fontSize={20} mr={2} />
                profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize={"10pt"}
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={logout}>
              <Flex align={"center"}>
                <Icon as={MdLogout} fontSize={20} mr={2} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize={"10pt"}
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => {
                dispatch(setView("login")), dispatch(openModal());
              }}>
              <Flex align={"center"}>
                <Icon as={MdLogout} fontSize={20} mr={2} />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
