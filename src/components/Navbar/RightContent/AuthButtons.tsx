import {
  AuthModalState,
  closeModal,
  openModal,
  setView,
} from "@/store/authModalSlice";
import { RootState } from "@/store/store";
import { Button } from "@chakra-ui/react";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthButtons: FC = ({}) => {
  const authModal = useSelector<RootState, AuthModalState>(
    (state) => state.authModal
  );
  const dispatch = useDispatch();

  return (
    <>
      <Button
        variant={"outline"}
        height='28px'
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => {
          dispatch(openModal());
          dispatch(setView("login"));
        }}>
        Log In
      </Button>
      <Button
        variant={"solid"}
        height='28px'
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => {
          dispatch(openModal());
          dispatch(setView("signup"));
        }}>
        Sign Up
      </Button>
    </>
  );
};

export default AuthButtons;
