import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ProfileCard from "./profile-card/ProfileCard";
import { getUser } from "../../api/apiCalls";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";
import { useApiProgress } from "../../shared/ApiProgress";
import XSippiner from "../../x-lib/components/XSippiner";

const UserPage = () => {
  const [user, setUser] = useState({username: '', displayname: '', image: null});
  const [notFound, setNotFound] = useState(false);
  const { username } = useParams();
  const pendingApiCall = useApiProgress('/api/1.0/users/' + username);
  useEffect(() => {
    getUser(username)
    .then(res=>{
      const data = res.data;
      setNotFound(false)
      setUser({...user, username: data.username, displayname: data.displayName, image: data.image  });
    })
    .catch(err=>{
      setNotFound(true);
    })
  }, [username]);

  if (pendingApiCall) {
    return <XSippiner/>;
  }
  return (
    <Container>
      { user.username && <ProfileCard user = {user} />}
      {notFound && <NotFound/>}
    </Container>
  );
};

export default UserPage;
