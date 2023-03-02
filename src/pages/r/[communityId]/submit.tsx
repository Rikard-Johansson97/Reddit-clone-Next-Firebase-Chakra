import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { CommunityState } from "@/store/communitiesSlice";
import { RootState } from "@/store/store";
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";

const SubmitPostPage = ({}) => {
  const [user, loading, error] = useAuthState(auth);
  const communityStateValue = useSelector<RootState, CommunityState>(
    (state) => state.community
  );

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
