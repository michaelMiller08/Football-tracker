import React from "react";
import "./Login.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../Firebase App.js";


export default class HandleLogin {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  async Login() {

    try {
      await signInWithEmailAndPassword(auth, this.email, this.password);
    } catch (error) {
      //TODO: temporary only!!
      console.log(error);
      window.alert(error);
    }
  }
  //   const logout = async () => {
  //     await signOut(auth);
  //   };
}

//   const register = async () => {};
