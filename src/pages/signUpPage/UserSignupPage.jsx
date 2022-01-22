import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import XInput from "../../x-lib/components/XInput";
import XInputPassword from "../../x-lib/components/XInputPassword";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../components/LanguageSelector";
import { XButton } from "../../x-lib/components/XButton";
import { connect } from "react-redux";
import { signUpSuccessFn } from "../../redux/authAction";
import { withApiProgress } from "../../shared/ApiProgress";
import { useNavigate } from 'react-router-dom';
const UserSignupPage = (props) => {
  const navigate = useNavigate();
  const { pendingApiCall, dispatch } = props;
  const { t } = useTranslation();
  const [state, setState] = React.useState({
    username: "",
    displayname: "",
    password: "",
    passwordRepeat: "",
    showPassword: false,
    errors: {
      username: "",
      displayname: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const handleChange = (prop) => (event) => {
    let { value } = event.target;
    if (prop === "password" || prop === "passwordRepeat") {
      if (prop === "password" && value !== state.passwordRepeat) {
        setState({
          ...state,
          [prop]: value,
          errors: { ...state.errors, passwordRepeat: t("Password mismatch") },
        });
      } else if (prop === "passwordRepeat" && value !== state.password) {
        setState({
          ...state,
          [prop]: value,
          errors: { ...state.errors, passwordRepeat: t("Password mismatch") },
        });
      } else {
        setState({
          ...state,
          [prop]: value,
          errors: { ...state.errors, passwordRepeat: undefined },
        });
      }
    } else
      setState({
        ...state,
        [prop]: value,
        errors: { ...state.errors, [prop]: undefined },
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

  const onSignUp = async (e) => {
    e.preventDefault();
    const { username, displayname, password } = state;
    const body = { username, displayname, password };
    try {
      await dispatch(signUpSuccessFn(body));
      navigate("/");
    } catch (error) {
      if (Object.keys(error).length > 0) {
        setState({
          ...state,
          errors: {
            ...state.errors,
            username: error.response.data.validationErrors.username,
            displayname: error.response.data.validationErrors.displayname,
            password: error.response.data.validationErrors.password,
          },
        });
      }
    }
  };
  return (
    <React.Fragment>
      <form onSubmit={onSignUp}>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <Container maxWidth="sm">
            <Container maxWidth="sm">
              <XInput
                label={t("Username")}
                value={state.username}
                error={state.errors.username}
                onChange={handleChange("username")}
              />
            </Container>
            <Container maxWidth="sm">
              <XInput
                label={t("Display Name")}
                value={state.displayname}
                error={state.errors.displayname}
                onChange={handleChange("displayname")}
              />
            </Container>

            <Container maxWidth="sm">
              <XInputPassword
                type={state.showPassword}
                label={t("Password")}
                error={state.errors.password}
                value={state.password}
                onChange={handleChange("password")}
                onMouseDown={handleMouseDownPassword}
                onClick={handleClickShowPassword("password")}
              />
            </Container>

            <Container maxWidth="sm">
              <XInputPassword
                type={state.showPassword}
                label={t("Password Repeat")}
                error={state.errors.passwordRepeat}
                value={state.passwordRepeat}
                onChange={handleChange("passwordRepeat")}
                onMouseDown={handleMouseDownPassword}
                onClick={handleClickShowPassword("passwordRepeat")}
              />
            </Container>

            <Container maxWidth="sm">
              <XButton
                type="submit"
                variant="contained"
                color="primary"
                text={t("Sign Up")}
                disabled={pendingApiCall}
                pendingApiCall={pendingApiCall}
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
const UserSignupPageWithApiProgress = withApiProgress(
  UserSignupPage,
  "api/1.0/users"
);
export default connect()(UserSignupPageWithApiProgress);
