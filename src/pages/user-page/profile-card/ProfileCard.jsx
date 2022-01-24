import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
const ProfileCard = () => {
  const {logginUserName} = useSelector(state => {
    return {
      logginUserName: state.username
    }
  })
  const { username } = useParams();

  let message = <i> WE CAN NOT EDIT</i>;
  if (username === logginUserName) {
    message = <i> WE CAN EDITS</i>;
  }
  return <div>{message}</div>;
};
export default ProfileCard;
