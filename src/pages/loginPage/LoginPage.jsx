import React, { useState } from "react";
import XInput from "../../x-lib/components/XInput";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import XInputPassword from "../../x-lib/components/XInputPassword";
import LanguageSelector from "../../components/LanguageSelector";
/* import {withApiProgress} from "../../shared/ApiProgress"; */
import { XButton } from "../../x-lib/components/XButton";
import { useNavigate } from 'react-router-dom';
/* import {connect} from "react-redux"; */
import { useDispatch } from "react-redux";
import { loginSuccessFnHandler } from "../../redux/authAction";
import { useApiProgress } from './../../shared/ApiProgress';
const initialState = {
  username: "",
  password: "",
  error: "",
  showPassword: false,
};
const LoginPage = () => {
  const pendingApiCall = useApiProgress({apiPath: "api/1.0/auth"});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [state, setState] = useState(initialState);
  
  const buttonDisabled = !(state.password && state.username);

  const handleChange = (prop) => (event) => {
    let { value } = event.target;
    setState({
      ...state,
      [prop]: value,
      error: null,
    });
  };

  const handleClickShowPassword = (prop) => () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setState({ ...state, error: null });
    try {
      await dispatch( loginSuccessFnHandler({ username: state.username, password: state.password }) );
      navigate("/");
    }catch(err){
      setState({ ...state, error: err.response.data.message })
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <Container maxWidth="md">
            <Container maxWidth="sm">
              <XInput
                label={t("Login")}
                value={state.username}
                onChange={handleChange("username")}
              />
            </Container>

            <Container maxWidth="sm" style={{ marginBottom: "16px" }}>
              <XInputPassword
                type={state.showPassword}
                label={t("Password")}
                value={state.password}
                onChange={handleChange("password")}
                onMouseDown={handleMouseDownPassword}
                onClick={handleClickShowPassword("password")}
              />
            </Container>
            {state.error && (
              <Container maxWidth="sm" style={{ marginBottom: "16px" }}>
                <Alert severity="error">{t(state.error)}</Alert>
              </Container>
            )}
            <Container maxWidth="sm">
              <XButton
                type="submit"
                variant="contained"
                color="primary"
                text = {t("Login")}
                disabled={buttonDisabled || pendingApiCall}
                pendingApiCall = {pendingApiCall}
              />
            </Container>

            <Container maxWidth="sm">
              <LanguageSelector />
            </Container>
          </Container>
        </Box>
      </form>
    </React.Fragment>
  );
};


export default LoginPage;

/* const LogginWithApiProgress = withApiProgress(LoginPage, "api/1.0/auth");
export default LogginWithApiProgress; */


/* const mapDispatchToProps = ( dispatch ) => {
  return {
    onLoginSuccess: (authUser) => dispatch( loginSuccessFn(authUser) ) 
  }
} 
export default connect(  null , mapDispatchToProps )(LogginWithApiProgress); */



 /* loginAuth({ username: state.username, password: state.password })
    .then(response => {
      dispatch({
        username: response.data.username,
        displayname: response.data.displayname,
        image: response.data.image,
        password: state.password
      })
      navigate("/");
    }) .*/