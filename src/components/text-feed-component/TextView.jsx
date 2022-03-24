import React from "react";
import { ProfileImageWithDefault } from "../profile-image-component/ProfileImageWithDefault";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useTranslation } from 'react-i18next';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector } from "react-redux";
import { deleteTexts } from "../../api/apiCalls";
import { XModal } from './../../x-lib/components/XModal';
import { useApiProgress } from './../../shared/ApiProgress';

export const TextView = (props) => {
  const { text , onDeleteTexts } = props;
  console.log(text.name)
  const loggedInUser = useSelector(store => store.username);
  const { i18n,t } = useTranslation();
  const { user, content, timestamp,id,fileAttachment } = text;
  const { username, displayName, image } = user;
  const formatted = format(timestamp, i18n.language);
  const [openModal, setOpenModal] = React.useState(false);
  const pendingApiCall = useApiProgress({
    apiMethod: "delete",
    apiPath: `/api/1.0/texts/${id}`,
    strickPath: true
  })
  const onClickDeleteTexts = async () => {
   await deleteTexts(id);
         onDeleteTexts(id);
         setOpenModal(false) 
  }
  return ( 
    <>
    <div className="card p-1">
      <div className="d-flex">
        <ProfileImageWithDefault
          image={image}
          width="32"
          height="32"
          className="rounded-circle m-1"
        />
        <div className="flex-fill m-auto pl-2">
          <Link to={`/user/${username}`} className="text-dark">
            <h6 className="d-inline">
              {displayName}@{username}
            </h6>
            <span> - </span>
            <span>{formatted}</span>
          </Link>

          {loggedInUser === username &&  (
            <DeleteOutlineIcon className="btn-delete-link" onClick = {()=> setOpenModal(true)} />
          )}
         
        </div>
      </div>
      <div className="pl-5">{content}</div>
      {fileAttachment && (
        <div className="pl-5">
          {fileAttachment.fileType.startsWith('image') && (
            <img className="img-fluid" src={'images/attachments/' + fileAttachment.name} alt={content} />
          )}
          {!fileAttachment.fileType.startsWith('image') && <strong>Hoax has unknown attachment</strong>}
        </div>
      )}
    </div>
     <XModal 
      open = {openModal} 
      setOpen = {setOpenModal} 
      onClickSave = {onClickDeleteTexts}
      pendingApiCall = {pendingApiCall}
      title = "Delete Text"
      dangerText = "Delete Text"
      message = {
        (
          <div>
            <div>
              <strong>
              {t("Are you shure Delete Texts ?")}
              </strong>
            </div>
            <span>
                {content}
              </span>
          </div>
        )
      }
      />
     </>
  );
};
