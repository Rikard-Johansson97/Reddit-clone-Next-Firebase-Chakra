import { Button, Input } from "@chakra-ui/react";
import React, { FC, useState } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
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

  const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <form onSubmit={onSubmit}>
      <Input
        name='email'
        placeholder='email'
        type={"email"}
        mb={2}
        onChange={onChange}
      />
      <Input
        name='password'
        placeholder='password'
        type={"password"}
        onChange={onChange}
      />
      <Button width={"100%"} height='36px' mt={2} mb={2} type='submit'>
        Log In
      </Button>
    </form>
  );
};

export default Login;
