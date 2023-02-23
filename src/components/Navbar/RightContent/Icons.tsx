import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";
// import useDirectory from "../../../hooks/useDirectory";

type ActionIconsProps = {};

const ActionIcons: React.FC<ActionIconsProps> = () => {
  //   const { toggleMenuOpen } = useDirectory();
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align='center'
        borderRight={"1px solid"}
        borderColor='gray.200'>
        <Flex
          mr={1.5}
          padding={1}
          cursor='pointer'
          borderRadius={4}
          _hover={{ bg: "gray.200" }}>
          <Icon as={BsArrowUpRightCircle} fontSize={20}></Icon>
        </Flex>
        <Flex
          mr={1.5}
          padding={1}
          cursor='pointer'
          borderRadius={4}
          _hover={{ bg: "gray.200" }}>
          <Icon as={IoFilterCircleOutline} fontSize={22}></Icon>
        </Flex>
        <Flex
          mr={1.5}
          padding={1}
          cursor='pointer'
          borderRadius={4}
          _hover={{ bg: "gray.200" }}>
          <Icon as={IoVideocamOutline} fontSize={22}></Icon>
        </Flex>
      </Flex>
      <>
        <Flex
          mr={1.5}
          padding={1}
          cursor='pointer'
          borderRadius={4}
          _hover={{ bg: "gray.200" }}>
          <Icon as={BsChatDots} fontSize={20}></Icon>
        </Flex>
        <Flex
          mr={1.5}
          padding={1}
          cursor='pointer'
          borderRadius={4}
          _hover={{ bg: "gray.200" }}>
          <Icon as={IoNotificationsOutline} fontSize={20}></Icon>
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          mr={1.5}
          padding={1}
          cursor='pointer'
          borderRadius={4}
          _hover={{ bg: "gray.200" }}>
          <Icon as={GrAdd} fontSize={20}></Icon>
        </Flex>
      </>
    </Flex>
  );
};
export default ActionIcons;
