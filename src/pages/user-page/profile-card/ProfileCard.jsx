import React, { useState } from "react";
/* import { useParams } from "react-router-dom";
import { useSelector } from "react-redux"; */
import { ProfileImageWithDefault } from "../../../components/ProfileImageWithDefault";
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import XInput from './../../../x-lib/components/XInput';
const ProfileCard = (props) => {
  const { user } = props;
  const {t} = useTranslation();
  const [inEditMode, setInEditMode] = useState(false);
  /*   const { logginUserName } = useSelector((state) => {
    return {
      logginUserName: state.username,
    };
  }); */
  // const { username } = useParams();

  return (
    <div className="card text-center">
      <div className="card-header">
        <ProfileImageWithDefault
          className="rounded-circle shadow"
          width="200"
          height="200"
          alt={`${user.username} profile`}
          image={user.propsimage}
        />
      </div>
      {/* <div className="card-body">
        <h3>
          {user.displayname}@{user.username}
        </h3>
      </div> */}
      <div className="card-body">
        {!inEditMode ? (
          <>
          <h3>
            {user.displayname}@{user.username}
          </h3>
          <button className="btn btn-success d-inline-flex" onClick={() => setInEditMode(true)}>
          <EditIcon/> {t('Edit')}
        </button>
        </>
        ) : (
          <div>
          <XInput label={t('Change Display Name')} />
          <div>
            <button className="btn btn-primary d-inline-flex">
              <SaveIcon/> {t('Save')}
            </button>
            <button className="btn btn-danger d-inline-flex ml-2" onClick={() => setInEditMode(false)}>
             <CancelPresentationIcon/>{t('Cancel')}
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
export default ProfileCard;
