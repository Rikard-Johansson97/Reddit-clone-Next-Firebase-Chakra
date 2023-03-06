import React, { useState } from "react";

const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");

  const onSelectedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader(); // good for file uploading

    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };
  return { selectedFile, setSelectedFile, onSelectedImage };
};

export default useSelectFile;
