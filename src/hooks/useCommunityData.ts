/* eslint-disable react-hooks/exhaustive-deps */
import { auth, firestore } from "@/firebase/clientApp";
import {
  addSnippet,
  Community,
  CommunitySnippet,
  CommunityState,
  setCurrentCommunity,
  setSnippetsFetched,
  updateMySnippets,
} from "@/store/communitiesSlice";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  writeBatch,
} from "firebase/firestore";
import { leaveCommunityReducer } from "@/store/communitiesSlice";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { openModal, setView } from "@/store/AuthModalSlice";
import { useRouter } from "next/router";
import { selectPost } from "@/store/postSlice";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useSelector(
    (state: { community: CommunityState }) => state.community
  );

  const temp = useSelector((state: any) => state);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!user || !!communityStateValue?.mySnippets?.length) return;

    getSnippets();
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

  const getSnippets = async () => {
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({
        ...doc.data(),
      }));

      dispatch(setSnippetsFetched(true));
      dispatch(updateMySnippets(snippets as CommunitySnippet[]));
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
        isModerator: user?.uid === communityData.creatorId,
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

      dispatch(addSnippet(newSnippet));
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

  const getCommunityData = async (communityId: string) => {
    try {
      const communityDocRef = doc(firestore, "communities", communityId);
      const communityDoc = await getDoc(communityDocRef);

      dispatch(
        setCurrentCommunity({
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community)
      );
    } catch (error) {
      console.log("getCommunityData Error: ", error);
    }
  };

  useEffect(() => {
    const { communityId } = router.query;

    if (communityId && !communityStateValue.currentCommunity) {
      getCommunityData(communityId as string);
    }
  }, [router.query, communityStateValue.currentCommunity]);

  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};

export default useCommunityData;
