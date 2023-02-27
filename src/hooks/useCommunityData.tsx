/* eslint-disable react-hooks/exhaustive-deps */
import { auth, firestore } from "@/firebase/clientApp";
import {
  Community,
  CommunitySnippet,
  CommunityState,
  updateMySnippets,
} from "@/store/communitiesSlice";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { leaveCommunityReducer } from "@/store/communitiesSlice";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setView } from "@/store/AuthModalSlice";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useSelector(
    (state: { community: CommunityState }) => state.community
  );

  const temp = useSelector((state: any) => state);

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
    if (!user) {
      dispatch(openModal());
      dispatch(setView("login"));
      return;
    }

    if (isJoined) {
      leaveCommunity(communityData.id);
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
  const joinCommunity = async (communityData: Community) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets/${communityData.id}`
        ),
        newSnippet
      );

      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      await batch.commit();

      dispatch(updateMySnippets([newSnippet]));
    } catch (error: any) {
      console.log("Join Community Error: ", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    setLoading(true);
    try {
      const batch = writeBatch(firestore);
      console.log(communityId);
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );

      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      dispatch(leaveCommunityReducer(communityId as any));
    } catch (error: any) {
      console.log("Leave Community Error: ", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
