import { CommunityState } from "@/store/communitiesSlice";
import {
  DirectoryMenuItem,
  DirectoryMenuState,
  selectMenuItem,
  toggleMenu,
} from "@/store/directoryMenuReducer";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { FaReddit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const useDirectory = () => {
  const router = useRouter();
  const directoryState = useSelector<RootState, DirectoryMenuState>(
    (state) => state.directoryMenu
  );
  const communityStateValue = useSelector(
    (state: { community: CommunityState }) => state.community
  );
  const dispatch = useDispatch();

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    dispatch(selectMenuItem(menuItem));
    router.push(menuItem.link);
    if (directoryState.isOpen) {
      ToggleMenuOpen();
    }
  };

  const ToggleMenuOpen = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const { currentCommunity } = communityStateValue;

    if (currentCommunity) {
      dispatch(
        selectMenuItem({
          displayText: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          imageURL: currentCommunity.imageURL,
          icon: FaReddit,
          iconColor: "blue.500",
        })
      );
    }
  }, [communityStateValue, communityStateValue.currentCommunity, dispatch]);

  return { directoryState, ToggleMenuOpen, onSelectMenuItem };
};

export default useDirectory;
