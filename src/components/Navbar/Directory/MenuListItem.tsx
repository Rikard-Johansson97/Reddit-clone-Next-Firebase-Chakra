import { Flex, Icon, Image, MenuItem } from "@chakra-ui/react";
import React, { FC } from "react";
import { IconType } from "react-icons/lib";

interface MenuListItemProps {
  displayText: string;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
}

const MenuListItem: FC<MenuListItemProps> = ({
  displayText,
  icon,
  iconColor,
  link,
  imageURL,
}) => {
  return (
    <MenuItem
      width={"100%"}
      fontSize='10pt'
      _hover={{ bg: "gray.100" }}
      onClick={() => {}}>
      <Flex align={"center"}>
        {imageURL ? (
          <Image
            src={imageURL}
            borderRadius='full'
            boxSize={"18px"}
            mr={2}
            alt={displayText}
          />
        ) : (
          <Icon as={icon} fontSize={20} mr={2} color={iconColor} />
        )}
        {displayText}
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
