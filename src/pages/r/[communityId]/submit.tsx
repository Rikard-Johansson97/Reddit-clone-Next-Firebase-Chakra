import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const SubmitPostPage = ({}) => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <PageContent>
      <>
        <Box p='14px 0px' borderBottom={"1px solid"} borderColor='white'>
          <Text>Create a Post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <></>
    </PageContent>
  );
};

export default SubmitPostPage;
