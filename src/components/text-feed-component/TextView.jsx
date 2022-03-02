import React from "react";
import { ProfileImageWithDefault } from "../profile-image-component/ProfileImageWithDefault";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useTranslation } from 'react-i18next';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector } from "react-redux";
import { deleteTexts } from "../../api/apiCalls";

export const TextView = (props) => {
  const { text , onDeleteTexts } = props;
  console.log(text.name)
  const loggedInUser = useSelector(store => store.username);
  const { i18n } = useTranslation();
  const { user, content, timestamp,id,fileAttachment } = text;
  const { username, displayName, image } = user;
  const formatted = format(timestamp, i18n.language);
  const onClickDeleteTexts = async () => {
    await deleteTexts(id);
          onDeleteTexts(id);
  }
  return ( 
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
            <DeleteOutlineIcon className="btn-delete-link" onClick = {onClickDeleteTexts} />
          )}
         
        </div>
      </div>
      <div className="pl-5">{content}</div>
      {fileAttachment && (
        <div className="pl-5">
          <img className="img-fluid" src={`images/${fileAttachment.name}`} alt={content} />
        </div>
      )}
    </div>
  );
};
