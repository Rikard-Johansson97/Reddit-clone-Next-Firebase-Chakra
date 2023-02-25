import { Flex, Button, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebase/clientApp";
import React, { FC, useEffect } from "react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const OAuthButtons: FC = ({}) => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);

    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <Flex direction={"column"} width='100%' mb={4}>
      <Button
        variant={"oauth"}
        mb={2}
        isLoading={loading}
        onClick={() => {
          signInWithGoogle();
        }}>
        {" "}
        <Image
          src='/images/googlelogo.png'
          height={"20px"}
          mr={4}
          alt='google'></Image>
        Continue with Google
      </Button>
      <Button variant={"oauth"}>Some other Provider</Button>
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};

export default OAuthButtons;
