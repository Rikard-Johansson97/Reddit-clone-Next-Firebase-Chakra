import { PhoneIcon } from "@chakra-ui/icons";
import { CheckIcon } from "@chakra-ui/icons/dist/Check";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface SearchInputProps {}

const SearchInput: FC<SearchInputProps> = ({}) => {
  return (
    <Flex>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <PhoneIcon color='gray.300' />
        </InputLeftElement>
        <Input type='tel' placeholder='Phone number' />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
