import { AuthModalState } from "@/store/AuthModalSlice";
import { RootState } from "@/store/store";
import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { useSelector } from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";

interface AuthInputsProps {}

const AuthInputs: FC<AuthInputsProps> = ({}) => {
  const authModal = useSelector<RootState, AuthModalState>(
    (state) => state.authModal
  );

  return (
    <Flex direction='column' align='center' width='100%' mt={4}>
      {authModal.view === "login" && <Login />}
      {authModal.view === "signup" && <SignUp />}
    </Flex>
  );
};

export default AuthInputs;
