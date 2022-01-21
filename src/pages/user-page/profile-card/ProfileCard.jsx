import React from "react";
import { useParams } from "react-router-dom";
import {connect} from "react-redux";
const ProfileCard = (props) => {
  const {logginUserName} = props;
  const { username } = useParams();

  let message = <i> WE CAN NOT EDIT</i>;
  if (username === logginUserName) {
    message = <i> WE CAN EDITS</i>;
  }
  return <div>{message}</div>;
};
const mapStateToProps = (state) => {
    return {
        logginUserName: state.username
    }
} 
export default connect(mapStateToProps)(ProfileCard);
