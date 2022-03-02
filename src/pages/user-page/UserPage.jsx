import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ProfileCard from "./profile-card/ProfileCard";
import { getUser } from "../../api/apiCalls";
import { useParams } from "react-router-dom";
import NotFound from "../../components/not-found-component/NotFound";
import { useApiProgress } from "../../shared/ApiProgress";
import XSippiner from "../../x-lib/components/XSippiner";
import TextFeed from './../../components/text-feed-component/TextFeed';

const UserPage = () => {
  const [user, setUser] = useState({
    username: "",
    displayname: "",
    image: null,
  });
  const [notFound, setNotFound] = useState(false);

  const { username } = useParams();
  const pendingApiCall = useApiProgress({
    apiMethod: "get",
    apiPath: "/api/1.0/users/" + username,
    strickPath: true
  });
  useEffect(() => {
    getUser(username)
      .then((res) => {
        const data = res.data;
        setNotFound(false);
        setUser((prevUser) => ({
          ...prevUser,
          username: data.username,
          displayname: data.displayName,
          image: data.image,
        }));
      })
      .catch((err) => {
        setNotFound(true);
      });
  }, [username]);

  if(notFound){
    return (
      <Container className="mt-2">
        <NotFound />
      </Container>
    )
  }
  if (pendingApiCall || user.username !== username) {
    return (
      <Container className="mt-2">
        <XSippiner />
      </Container>
    );
  }
  return (
    <Container className="mt-2">
      {user.username && (
        <div className="container mt-2">
          <div className="row">
            <div className="col">
              <ProfileCard user={user} />
            </div>
            <div className="col">
              <TextFeed/>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default UserPage;
