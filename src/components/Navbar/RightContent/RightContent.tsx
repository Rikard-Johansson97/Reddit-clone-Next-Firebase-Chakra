import AuthModal from "@/components/Modal/Auth/AuthModal";
import { Flex } from "@chakra-ui/react";
import React, { FC } from "react";
import AuthButtons from "./AuthButtons";

interface RightContentProps {}

const RightContent: FC<RightContentProps> = ({}) => {
  return (
    <>
      <AuthModal />
      <Flex justify='center' align='center'>
        <AuthButtons />
      </Flex>
    </>
  );
};

export default RightContent;
