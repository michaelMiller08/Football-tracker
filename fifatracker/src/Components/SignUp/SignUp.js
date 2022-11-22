import React from "react";
import "./SignUp.css";
import TextField from "@mui/material/TextField";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase App.js";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPassword, setRegisterPasword] = React.useState("");
  const [user, setUser] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  async function handleSignUp() {
    // new HandleLogin(loginEmail, loginPassword).Login();
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      window.alert("you can now login");

      if (user) {
        navigate("/");
      }
    } catch (error) {
      //TODO: temporary only!!
      window.alert(error);
    }
  }

  function navigateToSignIn() {
    navigate("/");
  }

  return (
    <div className="login--container">
      <h3 className="header--text">Please sign up or login to continue</h3>
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
            setRegisterEmail(event.target.value);
          }}
        />
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
            setRegisterPasword(event.target.value);
          }}
        />
      </div>

      <button className="sign--up--button" onClick={handleSignUp}>
        Create account NOW
      </button>
      <p onClick={navigateToSignIn} className="interactive--text">
        Already got an account?
      </p>
    </div>
  );
}
