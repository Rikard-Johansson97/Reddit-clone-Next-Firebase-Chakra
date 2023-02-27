import { Button, Flex, Image, Input, Stack } from "@chakra-ui/react";
import React, { FC, useRef } from "react";

interface ImageUploadProps {
  selectedFile?: string;
  onSelectedImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
}

const ImageUpload: FC<ImageUploadProps> = ({
  selectedFile,
  onSelectedImage,
  setSelectedTab,
  setSelectedFile,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <Flex direction={"column"} justify={"center"} align='center' width={"100%"}>
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            maxWidth='400px'
            maxHeight={"400px"}
            alt={selectedFile}></Image>
          <Stack direction={"row"} mt={4}>
            <Button height='28px' onClick={() => setSelectedTab("post")}>
              Back to Post
            </Button>
            <Button
              variant={"outline"}
              height='28px'
              onClick={() => setSelectedFile("")}>
              Remove
            </Button>
          </Stack>
        </>
      ) : (
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
          <Input
            ref={selectedFileRef}
            type={"file"}
            hidden
            onChange={onSelectedImage}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;
