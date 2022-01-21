import React from "react";
import UserSignupPage from "../pages/signUpPage/UserSignupPage";
import LoginPage from "../pages/loginPage/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./../pages/home-page/HomePage";
import UserPage from "./../pages/user-page/UserPage";
import NavBar from "./../components/NavBar";
import {connect} from "react-redux";

function App(props) {
  const {isLoggin} = props;
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route rindex path="user" element={<div> Write the User Name </div>} />
        <Route path="user/:username" element={<UserPage/>} />
        <Route path="signup" element={<UserSignupPage />} />
        {!isLoggin && <Route path="login" element={<LoginPage />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
const mapStateToProps = ( state ) => {
  return {
    isLoggin: state.isLoggin
  }
}
export default connect(mapStateToProps)(App);

