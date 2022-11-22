import React from "react";
import "./Login.css";
import loginBtn from "../../images/loginbutton.png";
import loginGoogleBtn from "../../images/googlesignin.png";
import TextField from "@mui/material/TextField";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase App.js";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import HandleLogin from "./HandleLogin";

export default function Login(props) {
  const [loginEmail, setLoginEmail] = React.useState("");
  const [loginPassword, setLoginPassword] = React.useState("");
  const [user] = useAuthState(auth);
  const usenavigater = useNavigate();

  function handleLoginButton() {
    new HandleLogin(loginEmail, loginPassword).Login();
    if (user) {
      usenavigater("/landing");
    }
  }

  function navigateToCreateAnAccount() {
    usenavigater("/signup");
  }

  function handleGoogleSignIn() {
    window.alert("Coming soon!");
  }

  if (user) {
    usenavigater("/landing");
  } else {
    props.funcNav(false);

    return (
      <div className="login--container">
        <h3 className="header--text">Please sign in to continue</h3>
        <div className="login--form">
          <div className="form--email">
            <label className="form--label" for="email">
              Email
            </label>
            <br />
            <TextField
              className="input--field"
              id="email"
              variant="filled"
              type="email"
              placeholder="david@example.com"
              maxLength="63"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
          </div>
          <div className="form--email">
            <label className="form--label" for="password">
              Password
            </label>
            <br />
            <TextField
              className="input--field"
              id="password"
              type="password"
              variant="filled"
              maxLength="20"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
          </div>
          <div className="sign--in--buttons">
            <input
              type="image"
              src={loginGoogleBtn}
              onClick={handleGoogleSignIn}
            />
            <input type="image" src={loginBtn} onClick={handleLoginButton} />
          </div>
          <p className="interactive--text">Forgot password?</p>
          <p onClick={navigateToCreateAnAccount} className="interactive--text">
            Create an account
          </p>
        </div>
      </div>
    );
  }
}
