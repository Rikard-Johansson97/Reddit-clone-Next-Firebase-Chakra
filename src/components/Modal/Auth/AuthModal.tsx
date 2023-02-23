import { auth } from "@/firebase/clientApp";
import { RootState } from "@/store/store";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { AuthModalState, closeModal } from "../../../store/authModalSlice";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";

const AuthModal: FC = ({}) => {
  const authModal = useSelector<RootState, AuthModalState>(
    (state) => state.authModal
  );

  const [user, loading, error] = useAuthState(auth);

  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (user) handleCloseModal();
    console.log("User", user);
  }, [user]);

  return (
    <>
      <Modal isOpen={authModal.open} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            {authModal.view === "login" && "Login"}
            {authModal.view === "signup" && "Sign Up"}
            {authModal.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection={"column"}
            alignItems='center'
            justifyContent={"center"}
            pb={6}>
            <Flex
              direction={"column"}
              align={"center"}
              justify={"center"}
              width={"70%"}>
              {authModal.view === "login" || authModal.view === "signup" ? (
                <>
                  <OAuthButtons />
                  <Text color={"gray.400"} fontWeight={700}>
                    OR
                  </Text>
                  <AuthInputs />{" "}
                </>
              ) : (
                <ResetPassword />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
