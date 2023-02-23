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
import React, { FC } from "react";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdLogin, MdLogout } from "react-icons/md";
import { auth } from "@/firebase/clientApp";
import { AuthModalState, openModal, setView } from "@/store/authModalSlice";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";

interface UserMenuProps {
  user?: User | null;
}

const UserMenu: FC<UserMenuProps> = ({ user }) => {
  const authModal = useSelector<RootState, AuthModalState>(
    (state) => state.authModal
  );
  const dispatch = useDispatch();

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
              onClick={() => {
                signOut(auth);
              }}>
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
