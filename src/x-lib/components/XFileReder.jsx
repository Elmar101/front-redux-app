import React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
    display: 'none',
});

export const XFileReder = (props) => {
    const { setNewImage,text } = props;

    const onFileChange = (event) => {
        if(event.target.files.length < 1){
            return ;
        }
        const file = event.target.files[0];
        const fileRider = new FileReader();
        fileRider.onloadend = ()=> {
            setNewImage(fileRider.result);
            //console.log("file riderde",fileRider.result)
        }
        fileRider.readAsDataURL(file);
    }
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" type="file" onChange = {e => onFileChange(e)}/>
          <Button variant="contained" component="span">
              <PhotoCamera />
              {text}
          </Button>
        </label>
      </Stack>
    )
};
/*/





export default function UploadButtons() {
  return (
   
  );
}

/*/