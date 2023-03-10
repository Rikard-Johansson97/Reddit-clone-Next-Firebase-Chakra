import { Flex } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface PageContentProps {
  children: ReactNode;
}

const PageContent: FC<PageContentProps> = ({ children }) => {
  console.log(children);

  return (
    <Flex justify={"center"} p='16px 0px'>
      <Flex width={"95%"} justify={"center"} maxWidth='868px'>
        {/* LHS */}
        <Flex
          direction={"column"}
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}>
          {children && children[0 as keyof typeof children]}
        </Flex>

        {/* RHS */}
        <Flex
          direction={"column"}
          display={{ base: "none", md: "flex" }}
          flexGrow={1}>
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
