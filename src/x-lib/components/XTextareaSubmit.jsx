import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProfileImageWithDefault } from "../../components/profile-image-component/ProfileImageWithDefault";
import { XButton } from "./XButton";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import { useApiProgress } from "../../shared/ApiProgress";
import { setPostText } from "../../api/apiCalls";
import { XFileUploadReader } from './XFileUploadReader';
import AutoUploadImage from "../../components/auto-upload-image/AutoUploadImage";

export const XTextareaSubmit = () => {
  const { image } = useSelector((store) => ({ image: store.image }));
  const [newImage, setNewImage] = useState();
  const { t } = useTranslation();
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  const [errors, setErrors] = useState({content: ''});
  const [attachmentId, setAttachmentId] = useState();
  const pendingApiCall = useApiProgress({
    apiMethod: "post",
    apiPath: "api/1.0/texts",
    strickPath: true
  });

  const pendingFileUploadApiCall = useApiProgress({
    apiMethod: "post",
    apiPath: "/api/1.0/texts-attachments",
    strickPath: true
  });

  useEffect(() => {
    if (!focused) {
      setText("");
      setErrors(prevErr=> ({...prevErr, content: ''}));
      setNewImage();
      setAttachmentId();
    }
    if(text){
        setErrors(prevErr=> ({...prevErr, content: ''}));
    }
  }, [focused,text]);

  const onClickSave = async () => {
    try {
      console.log("attackmentId: ", attachmentId)
      await setPostText({content: text , attachmentId: attachmentId});
      setFocused(false);
    } catch (error) {
        setErrors(errState=> ({...errState, content: error.response.data.validationErrors.content}))
    }
  };


  return (
    <div className="card p-1 flex-row">
      <ProfileImageWithDefault
        image={image}
        width="32"
        height="32"
        className="rounded-circle mr-1"
      />
      <div className="flex-fill">
        <textarea
          className="form-control"
          rows={focused ? "3" : "1"}
          onFocus={() => setFocused(true)}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {errors.content && <div style={{color: "red"}}>{errors.content}</div>}
        {focused && (
          <Box sx={{ "& > button": { m: 1 } }}>
            { !newImage && <div className="m-2"> 
              <XFileUploadReader 
                 text="UPLOAD FILE"
                 setNewImage = {setNewImage}
                 onSetAttachmentId = { setAttachmentId }
              /> 
            </div>}
            {newImage && <AutoUploadImage image = {newImage} uploading = {pendingFileUploadApiCall}/>}
            <XButton
              variant="contained"
              color="primary"
              onClick={onClickSave}
              pendingApiCall={pendingApiCall}
              disabled={pendingApiCall || pendingFileUploadApiCall}
              text={
                <>
                  <SaveIcon /> {t("Submit Message")}
                </>
              }
            />

            <XButton
              variant="contained"
              color="secondary"
              onClick={() => setFocused(false)}
              disabled={pendingApiCall || pendingFileUploadApiCall}
              text={
                <>
                  <CancelPresentationIcon />
                  {t("Cancel")}
                </>
              }
            />
          </Box>
        )}
      </div>
    </div>
  );
};
