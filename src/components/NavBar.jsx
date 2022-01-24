import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import logo from "../assets/images/hoaxify.png";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccessFn } from "../redux/authAction";

const NavBar = (props) => {
  const {username, isLoggin} = useSelector(state => ({username: state.username, isLoggin: state.isLoggin}));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onLogoutSuccessClick = () => {
    dispatch(logoutSuccessFn({
      username: null,
      displayname: null,
      password: null,
      image: null,
      isLoggin: false,
    }));
  };

  let Links = (
    <div>
      <Link
        to="/login"
        style={{
          color: "#fff",
          marginRight: "16px",
          textDecoration: "none",
        }}
      >
        {t("Login")}
      </Link>
      <Link
        to="/signup"
        style={{
          color: "#fff",
          marginRight: "16px",
          textDecoration: "none",
        }}
      >
        {t("Sign Up")}
      </Link>
    </div>
  );

  if (isLoggin) {
    Links = (
      <React.Fragment>
        <Button color="inherit" onClick={() => navigate(`user/${username}`)}>
          {username}
        </Button>
        <Button color="inherit" onClick={onLogoutSuccessClick}>
          {t("Logout")}
        </Button>
      </React.Fragment>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <img src={logo} width="60" alt="logo" />
            </Link>
          </Typography>
          {Links}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
