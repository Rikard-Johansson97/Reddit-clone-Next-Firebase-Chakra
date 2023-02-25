import CreateCommunityModal from "@/components/Modal/Auth/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { GrAdd } from "react-icons/gr";

interface CommunitiesProps {}

const Communities: FC<CommunitiesProps> = ({}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <MenuItem
        width={"100%"}
        fontSize='10pt'
        _hover={{ bg: "gray.100" }}
        onClick={() => {
          setOpen(true);
        }}>
        <Flex align={"center"}>
          <Icon as={GrAdd} fontSize={20} mr={2} />
          <Text>Create Community</Text>
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
