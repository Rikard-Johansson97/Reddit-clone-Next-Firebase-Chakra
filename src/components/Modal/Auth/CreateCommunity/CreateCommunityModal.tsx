import useDirectory from "@/hooks/useDirectory";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { auth, firestore } from "../../../../firebase/clientApp";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [name, setName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [user] = useAuthState(auth);
  const [nameError, setNameError] = useState("");
  const [communityType, setCommunityType] = useState("public");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toggleMenuOpen } = useDirectory();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  const handleCreateCommunity = async () => {
    if (nameError) setNameError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (format.test(name) || name.length < 3) {
      return setNameError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", name);

      await runTransaction(firestore, async (transaction) => {
        // CHECK if the community exists
        const communityDoc = await getDoc(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, /r ${name} is taken. Try another.`);
        }
        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });
        // create the communitySnippet to the user
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, name),
          {
            communityId: name,
            isModerator: true,
          }
        );
      });

      handleClose();
      toggleMenuOpen();
      router.push(`r/${name}`);
    } catch (error: any) {
      console.error("HandleCreateCommunity error ", error);
      setNameError(error.message);
    }

    setLoading(false);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name },
    } = event;
    if (name === communityType) return;
    setCommunityType(name);
  };

  return (
    <Modal isOpen={open} onClose={handleClose} size='lg'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display='flex'
          flexDirection='column'
          fontSize={15}
          padding={3}>
          Create a community
        </ModalHeader>
        <Box pr={3} pl={3}>
          <Divider />
          <ModalCloseButton />
          <ModalBody display='flex' flexDirection='column' padding='10px 0px'>
            <Text fontWeight={600} fontSize={15}>
              Name
            </Text>
            <Text fontSize={11} color='gray.500'>
              Community names including capitalization cannot be changed
            </Text>
            <Text
              color='gray.400'
              position='relative'
              top='28px'
              left='10px'
              width='20px'>
              r/
            </Text>
            <Input
              position='relative'
              name='name'
              value={name}
              onChange={handleChange}
              pl='22px'
              type={""}
              size='sm'
            />
            <Text
              fontSize='9pt'
              color={charsRemaining === 0 ? "red" : "gray.500"}
              pt={2}>
              {charsRemaining} Characters remaining
            </Text>
            <Text fontSize='9pt' color='red' pt={1}>
              {nameError}
            </Text>
            <Box mt={4} mb={4}>
              <Text fontWeight={600} fontSize={15}>
                Community Type
              </Text>
              <Stack spacing={2} pt={1}>
                <Checkbox
                  colorScheme='blue'
                  name='public'
                  isChecked={communityType === "public"}
                  onChange={onCommunityTypeChange}>
                  <Flex alignItems='center'>
                    <Icon as={BsFillPersonFill} mr={2} color='gray.500' />
                    <Text fontSize='10pt' mr={1}>
                      Public
                    </Text>
                    <Text fontSize='8pt' color='gray.500' pt={1}>
                      Anyone can view, post, and comment to this community
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  colorScheme='blue'
                  name='restricted'
                  isChecked={communityType === "restricted"}
                  onChange={onCommunityTypeChange}>
                  <Flex alignItems='center'>
                    <Icon as={BsFillEyeFill} color='gray.500' mr={2} />
                    <Text fontSize='10pt' mr={1}>
                      Restricted
                    </Text>
                    <Text fontSize='8pt' color='gray.500' pt={1}>
                      Anyone can view this community, but only approved users
                      can post
                    </Text>
                  </Flex>
                </Checkbox>
                <Checkbox
                  colorScheme='blue'
                  name='private'
                  isChecked={communityType === "private"}
                  onChange={onCommunityTypeChange}>
                  <Flex alignItems='center'>
                    <Icon as={HiLockClosed} color='gray.500' mr={2} />
                    <Text fontSize='10pt' mr={1}>
                      Private
                    </Text>
                    <Text fontSize='8pt' color='gray.500' pt={1}>
                      Only approved users can view and submit to this community
                    </Text>
                  </Flex>
                </Checkbox>
              </Stack>
            </Box>
          </ModalBody>
        </Box>
        <ModalFooter bg='gray.100' borderRadius='0px 0px 10px 10px'>
          <Button variant='outline' height='30px' mr={2} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='solid'
            height='30px'
            onClick={handleCreateCommunity}
            isLoading={loading}>
            Create Community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreateCommunityModal;
