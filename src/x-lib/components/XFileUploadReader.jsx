import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import { postTextAttachment } from "../../api/apiCalls";
const Input = styled("input")({
  display: "none",
});

export const XFileUploadReader = (props) => {
  const { text, error ,setNewImage,onSetAttachmentId} = props;

  const onFileChange = (event) => {
    if (event.target.files.length < 1) {
      return;
    }
    const file = event.target.files[0];
    const fileRider = new FileReader();
    fileRider.onloadend = () => {
      setNewImage(fileRider.result);
      uploadFile(file);
    };
    fileRider.readAsDataURL(file);
  };

  const uploadFile = async (file) => {
    const attachment = new FormData();
    attachment.append('file', file);
    const response = await postTextAttachment(attachment);
    onSetAttachmentId(response.data.id)
  }
  
  return ( 
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file">
        {/* <Input accept="image/*" id="contained-button-file" type="file" onChange = {e => onFileChange(e)}/> 
            Anacaq image qebul edecek basqa faylari compda gostermiyecek
        */}
          <Input
            id="contained-button-file"
            type="file"
            onChange={(e) => onFileChange(e)}
          />
          <Button variant="contained" component="span">
            <PhotoCamera />
            {text}
          </Button>
        </label>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={2}>
        {error && (
          <>
            <br />
            <br />
            <i style={{ color: "red" }}>{error}</i>
          </>
        )}
      </Stack>
    </>
  );
};
