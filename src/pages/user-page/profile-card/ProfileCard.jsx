import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileImageWithDefault } from "../../../components/ProfileImageWithDefault";
const ProfileCard = (props) => {
  const { user } = props;
  const { logginUserName } = useSelector((state) => {
    return {
      logginUserName: state.username,
    };
  });
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
      <div className="card-body">
        <h3>
          {user.displayname}@{user.username}
        </h3>
      </div>
    </div>
  );
};
export default ProfileCard;
