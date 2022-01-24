import React,{useState} from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import XInput from "../../x-lib/components/XInput";
import XInputPassword from "../../x-lib/components/XInputPassword";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../components/LanguageSelector";
import { XButton } from "../../x-lib/components/XButton";
/* import { connect } from "react-redux"; */
import { useDispatch } from "react-redux";
import { signUpSuccessFn } from "../../redux/authAction";
/* import { withApiProgress } from "../../shared/ApiProgress"; */
import { useNavigate } from 'react-router-dom';
import { useApiProgress } from './../../shared/ApiProgress';

const initialState = { username: "", displayname: "", password: "", passwordRepeat: "", showPassword: false };
const initialErrors = { username: "", displayname: "", password: "", passwordRepeat: "" };

const UserSignupPage = () => {
  const pendingApiCallSignUp  = useApiProgress({ apiPath: "api/1.0/users" }); 
  const pendingApiCallLogin =  useApiProgress({apiPath: "api/1.0/auth"});
  const pendingApiCall = pendingApiCallSignUp || pendingApiCallLogin;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (prop) => (event) => {
    let { value } = event.target;
    if (prop === "password" || prop === "passwordRepeat") {
      if (prop === "password" && value !== state.passwordRepeat) {
        setState({ ...state, [prop]: value});
        setErrors({ ...errors, passwordRepeat: t("Password mismatch"), [prop]: undefined });
      } else if (prop === "passwordRepeat" && value !== state.password) {
        setState({ ...state, [prop]: value});
        setErrors({ ...errors, passwordRepeat: t("Password mismatch") });
      } else {
        setState({...state, [prop]: value });
        setErrors({ ...errors,  [prop]: undefined });
      }
    } 
    else {
      setState({ ...state, [prop]: value });
      setErrors({ ...errors, [prop]: undefined });
    }
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
        setErrors({
          ...errors,
            username: error.response.data.validationErrors.username,
            displayname: error.response.data.validationErrors.displayname,
            password: error.response.data.validationErrors.password
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
                error={errors.username}
                onChange={handleChange("username")}
              />
            </Container>
            <Container maxWidth="sm">
              <XInput
                label={t("Display Name")}
                value={state.displayname}
                error={errors.displayname}
                onChange={handleChange("displayname")}
              />
            </Container>

            <Container maxWidth="sm">
              <XInputPassword
                type={state.showPassword}
                label={t("Password")}
                error={errors.password}
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
                error={errors.passwordRepeat}
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
export default UserSignupPage;
/* const UserSignupPageWithApiProgressForSignUpRequest = withApiProgress( UserSignupPage, "api/1.0/users");
const UserSignupPageWithApiProgressForAuthRequest = withApiProgress( UserSignupPageWithApiProgressForSignUpRequest, "api/1.0/auth");
export default UserSignupPageWithApiProgressForAuthRequest; */
