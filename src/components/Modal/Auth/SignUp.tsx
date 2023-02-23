import { AuthModalState, setView } from "@/store/authModalSlice";
import { RootState } from "@/store/store";
import { Input, Button, Flex, Text } from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const SignUp: FC = ({}) => {
  const authModal = useSelector<RootState, AuthModalState>(
    (state) => state.authModal
  );
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update from state
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = () => {};
  return (
    <form onSubmit={onSubmit}>
      <Input
        name='email'
        placeholder='email'
        type={"email"}
        mb={2}
        onChange={onChange}
        fontSize='10pt'
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg='gray.50'
      />
      <Input
        name='password'
        placeholder='password'
        type={"password"}
        mb={2}
        onChange={onChange}
        fontSize='10pt'
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          outline: "none",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg='gray.50'
      />
      <Button width={"100%"} height='36px' mt={2} mb={2} type='submit'>
        Log In
      </Button>
      <Flex fontSize={"9pt"} justifyContent='center'>
        <Text mr={1}>New here?</Text>
        <Text
          color={"blue.500"}
          fontWeight={700}
          cursor='pointer'
          onClick={() => {
            dispatch(setView("signup"));
          }}>
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;
