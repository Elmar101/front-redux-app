import React, { useEffect, useState } from "react";
import { ProfileImageWithDefault } from "../../../components/profile-image-component/ProfileImageWithDefault";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import XInput from "./../../../x-lib/components/XInput";
import { deleteAccount, updateUser } from "../../../api/apiCalls";
import { useApiProgress } from "../../../shared/ApiProgress";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { XFileReder } from "../../../x-lib/components/XFileReder";
import { XButton } from "../../../x-lib/components/XButton";
import Box from "@mui/material/Box";
import { logoutSuccessFn, updateProfileSuccess } from "../../../redux/authAction";
import { XModal } from "../../../x-lib/components/XModal";
const ProfileCard = (props) => {
  const [user, setUser] = useState({
    username: null,
    displayname: null,
    image: null,
  });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { username } = useParams();
  const { username: loggedInUsername } = useSelector((store) => ({
    username: store.username,
  }));
  const [inEditMode, setInEditMode] = useState(false);
  const [updatedDisplayName, setUpdatedDisplayName] = useState("");
  const [editable, setEditable] = useState(false);
  const [newImage, setNewImage] = useState(undefined);
  const [openModal, setOpenModal] = React.useState(false);
  const [validationErrors, setValidationErrors] = useState({
    displayName: undefined,
    image: undefined,
  });
  const pendingApiCall = useApiProgress({
    apiMethod: "put",
    apiPath: "/api/1.0/users/" + user.username,
  });

  const pendingApiCallForDeleteAccount = useApiProgress({
    apiMethod: "delete",
    apiPath: `/api/1.0/users/${username}`,
    strickPath: true
  })
  useEffect(() => {
    setValidationErrors((prevValidationErrors) => ({
      ...prevValidationErrors,
      displayName: undefined,
    }));
  }, [updatedDisplayName]);

  useEffect(() => {
    setValidationErrors((prevValidationErrors) => ({
      ...prevValidationErrors,
      image: undefined,
    }));
  }, [newImage]);

  useEffect(() => {
    setEditable(username === loggedInUsername);
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
      setNewImage(user.image);
    }
  }, [inEditMode, user.displayname, user.image]);

  const onClickSave = async () => {
    try {
      const response = await updateUser(user.username, {
        displayName: updatedDisplayName,
        image: newImage ? newImage.split(",")[1] : null,
      });
      setUser({
        ...user,
        displayname: response.data.displayName,
        username: response.data.username,
        image: response.data.image,
      });
      setInEditMode(false);
      dispatch(
        updateProfileSuccess({
          displayname: response.data.displayName,
          image: response.data.image,
        })
      );
    } catch (err) {
      setValidationErrors(err.response.data.validationErrors);
    }
  };
 
  const onDeleteAccount = () => {
    deleteAccount(username).then(
      res => {
        setOpenModal(false);
        dispatch(logoutSuccessFn({
          username: null,
          displayname: null,
          password: null,
          image: null,
          isLoggin: false,
        }))
        navigate("/") 
      }
    )
  }

  /* const onDeleteAccount = async () => {
    await deleteAccount(username)
          setOpenModal(false)
  } */
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
              <React.Fragment>
                <XButton
                  variant="contained"
                  color="success"
                  onClick={() => setInEditMode(true)}
                  text={
                    <>
                      <EditIcon /> {t("Edit")}
                    </>
                  }
                />
                <div className="pt-2">
                  <XButton
                    variant="contained"
                    color="error"
                    onClick = {()=> setOpenModal(true)}
                    text={
                      <>
                        <DirectionsRunIcon /> {t("Delete Account")}
                      </>
                    }
                  />
                </div>
              </React.Fragment>
            )}
          </>
        ) : (
          <div className="mt-2">
            <XInput
              label={t("Change Display Name")}
              defaultValue={user.displayname}
              onChange={(e) => setUpdatedDisplayName(e.target.value)}
              error={validationErrors.displayName}
            />
            <div>
              <div className="mb-3 mt-2">
                <XFileReder
                  text={t("UPLOAD FILE")}
                  setNewImage={setNewImage}
                  error={validationErrors.image}
                />
              </div>
              <Box sx={{ "& > button": { m: 1 } }}>
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

      <XModal 
      open = {openModal} 
      setOpen = {setOpenModal} 
      title = "Delete Account"
      dangerText = "Delete My Account"
      onClickSave = {onDeleteAccount}
      pendingApiCall = {pendingApiCallForDeleteAccount}
      message = {
        (
          <strong>
              {t("Are you shure Delete Your Acount ?")}
          </strong>
        )
      }
      />
    </div>
  );
};
export default ProfileCard;
