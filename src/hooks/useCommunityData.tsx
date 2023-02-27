/* eslint-disable react-hooks/exhaustive-deps */
import { auth, firestore } from "@/firebase/clientApp";
import {
  Community,
  CommunitySnippet,
  CommunityState,
  updateMySnippets,
} from "@/store/communitiesSlice";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useSelector(
    (state: { community: CommunityState }) => state.community
  );

  const temp = useSelector((state: any) => state);
  console.log(temp);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    getMySnippets();
  }, [user]);

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    if (isJoined) {
      leaveCommunity();
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({
        ...doc.data(),
      }));
      dispatch(updateMySnippets(snippets as CommunitySnippet[]));

      setLoading(false);
    } catch (error: any) {
      console.log("getMySnippets Error: ", error);
      setError(error.message);
    }
    setLoading(false);
  };
  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = () => {};

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
