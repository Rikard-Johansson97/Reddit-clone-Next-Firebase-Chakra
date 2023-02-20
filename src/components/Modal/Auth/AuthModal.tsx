import { RootState } from "@/store/store";
import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthModalState, closeModal } from "../../../store/authModalSlice";
import AuthInputs from "./AuthInputs";

const AuthModal: FC = ({}) => {
  const authModal = useSelector<RootState, AuthModalState>(
    (state) => state.authModal
  );
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Modal isOpen={authModal.open} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {authModal.view === "login" && "Login"}
            {authModal.view === "signup" && "Sign Up"}
            {authModal.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display='flex'
            flexDirection={"column"}
            alignItems='center'
            justifyContent={"center"}>
            <Flex
              direction={"column"}
              align={"center"}
              justify={"center"}
              width={"70%"}
              border={"1px solid red"}>
              <AuthInputs />
              {/* <OAuthButtons />*/}
              {/* ResetPassword */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
