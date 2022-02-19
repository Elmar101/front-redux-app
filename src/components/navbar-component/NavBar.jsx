import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import logo from "../../assets/images/hoaxify.png";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutSuccessFn } from "../../redux/authAction";
import { ProfileImageWithDefault } from "../profile-image-component/ProfileImageWithDefault";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(0),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const NavBar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { username, isLoggin, displayname, image } = useSelector((state) => ({
    username: state.username,
    isLoggin: state.isLoggin,
    displayname: state.displayname,
    image: state.image,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onLogoutSuccessClick = () => {
    dispatch(
      logoutSuccessFn({
        username: null,
        displayname: null,
        password: null,
        image: null,
        isLoggin: false,
      })
    );
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
        <div>
          <Button
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <List>
              <ListItem>
                <ProfileImageWithDefault
                  image={image}
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
                <ListItemText primary={displayname} />
              </ListItem>
            </List>
          </Button>

          <StyledMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                navigate(`user/${username}`);
              }}
              disableRipple
            >
              <AccountBoxIcon /> {t("My Profile")}
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleClose();
                onLogoutSuccessClick();
              }}
              disableRipple
            >
              <LogoutIcon /> {t("Logout")}
            </MenuItem>
          </StyledMenu>
        </div>
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
