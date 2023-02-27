import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/posts/NewPostForm";
import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";

const SubmitPostPage = ({}) => {
  return (
    <PageContent>
      <>
        <Box p='14px 0px' borderBottom={"1px solid"} borderColor='white'>
          <Text>Create a Post</Text>
        </Box>
        <NewPostForm />
      </>
      <></>
    </PageContent>
  );
};

export default SubmitPostPage;
