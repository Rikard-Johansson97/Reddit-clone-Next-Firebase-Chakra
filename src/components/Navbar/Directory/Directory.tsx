import { AuthModalState } from "@/store/AuthModalSlice";
import { RootState } from "@/store/store";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";
import useDirectory from "@/hooks/useDirectory";

const Directory: FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();
  const dispatch = useDispatch();

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor={"pointer"}
        padding='0px 6px'
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}>
        <Flex
          align='center'
          justify={"space-between"}
          width={{ base: "auto", lg: "200px" }}>
          <Flex align='center'>
            {directoryState.selectedMenuItem.imageURL ? (
              <Image
                src={directoryState.selectedMenuItem.imageURL}
                alt='communityIcon'
                borderRadius={"full"}
                boxSize='24px'
                mr={2}
              />
            ) : (
              <Icon
                fontSize={24}
                mr={{ base: 1, md: 2 }}
                as={directoryState.selectedMenuItem.icon}
                color={directoryState.selectedMenuItem.iconColor}
              />
            )}

            <Flex display={{ base: "none", lg: "flex" }} fontSize='10pt'>
              <Text fontWeight={600}>
                {directoryState.selectedMenuItem.displayText}
              </Text>
            </Flex>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default Directory;
