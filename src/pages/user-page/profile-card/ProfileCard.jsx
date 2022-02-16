import React, { useEffect, useState } from "react";
import { ProfileImageWithDefault } from "../../../components/ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import XInput from "./../../../x-lib/components/XInput";
import { updateUser } from "../../../api/apiCalls";
import { useApiProgress } from "../../../shared/ApiProgress";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { XFileReder } from "../../../x-lib/components/XFileReder";
import { XButton } from "../../../x-lib/components/XButton";
import  Box  from '@mui/material/Box';
const ProfileCard = (props) => {
  const [user, setUser] = useState({
    username: null,
    displayname: null,
    image: null,
  });
  const { t } = useTranslation();
  const { username } = useParams();
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState("");
  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState(undefined);
  const pendingApiCall = useApiProgress({
    apiMethod: "put",
    apiPath: "/api/1.0/users/" + user.username,
  });

  useEffect(() => {
    setEditable(username === loggedInUsername)
  }, [username, loggedInUsername]);

  useEffect(() => {
    setUser({ ...props.user });
  }, [props.user]);

  useEffect(() => {
    if (!inEditMode) {
      setUpdatedDisplayName(undefined);
      setNewImage(undefined);
    } else {
      setUpdatedDisplayName(user.displayname);
      setNewImage(user.image)
    }
  }, [inEditMode, user.displayname, user.image]);

  const onClickSave = async () => {
    try {
      const response = await updateUser(user.username, {
        displayName: updatedDisplayName, image: newImage ? newImage.split(',')[1] : null
      });
      setUser({
        ...user,
        displayname: response.data.displayName,
        username: response.data.username,
        image: response.data.image,
      });
      setInEditMode(false);
    } catch (err) { }
  };


  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImageWithDefault
          className="rounded-circle shadow"
          width="200"
          height="200"
          alt={`${user.username} profile`}
          image={user.image}
          tempimage={newImage}
        />
      </div>
      <div className="card-body">
        {!inEditMode ? (
          <>
            <h3>
              {user.displayname}@{user.username}
            </h3>
            {editable && (
              <XButton
                variant="contained"
                color="success"
                onClick={() => setInEditMode(true)}
                text={(<>
                  <EditIcon /> {t("Edit")}
                </>
                )}
              />

            )}
          </>
        ) : (
          <div className="mt-2">
            <XInput
              label={t("Change Display Name")}
              defaultValue={user.displayname}
              onChange={(e) => setUpdatedDisplayName(e.target.value)}
            />
            <div>
              <div className="mb-3 mt-2">
                <XFileReder text = {t('UPLOAD FILE')}  setNewImage={setNewImage} />
              </div>
              <Box sx={{ '& > button': { m: 1 } }}>
              <XButton
                variant="contained"
                color="primary"
                onClick={onClickSave}
                pendingApiCall={pendingApiCall}
                disabled={pendingApiCall}
                text={
                  <>
                    <SaveIcon /> {t("Save")}
                  </>
                }
              />
              <XButton
                variant="contained"
                color="secondary"
                onClick={() => setInEditMode(false)}
                disabled={pendingApiCall}
                text={
                  <>
                    <CancelPresentationIcon />
                    {t("Cancel")}
                  </>
                }
              />
              </Box>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfileCard;
