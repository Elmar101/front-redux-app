import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import ProfileCard from "./profile-card/ProfileCard";
import { getUser } from "../../api/apiCalls";
import { useParams } from "react-router-dom";
import NotFound from "../../components/NotFound";
import { useApiProgress } from "../../shared/ApiProgress";
import XSippiner from "../../x-lib/components/XSippiner";
import LanguageSelector from "../../components/LanguageSelector";

const UserPage = () => {
  const [user, setUser] = useState({username: '', displayname: '', image: null});
  const [notFound, setNotFound] = useState(false);
  const { username } = useParams();
  const pendingApiCall = useApiProgress({apiMethod:'get',apiPath: '/api/1.0/users/' + username});
  useEffect(() => {
    getUser(username)
    .then(res=>{
      const data = res.data;
      setNotFound(false)
      setUser(prevUser=> ({...prevUser, username: data.username, displayname: data.displayName, image: data.image  }));
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
      <LanguageSelector/>
    </Container>
  );
};

export default UserPage;
