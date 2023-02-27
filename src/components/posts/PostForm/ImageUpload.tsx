import { Button, Flex, Input } from "@chakra-ui/react";
import React, { FC, useRef } from "react";

interface ImageUploadProps {}

const ImageUpload: FC<ImageUploadProps> = ({}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Flex justify={"center"} align='centewr' width={"100%"}>
      <Flex
        justify={"center"}
        align='center'
        p={20}
        border='1px dashed'
        borderColor={"gray.200"}
        width='100%'
        borderRadius={4}>
        <Button
          variant='outline'
          height='28px'
          onClick={() => selectedFileRef.current?.click()}>
          Upload
        </Button>
        <Input ref={selectedFileRef} type={"file"} hidden />
      </Flex>
    </Flex>
  );
};

export default ImageUpload;
