import React from "react";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./Settings.css";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const navigate = useNavigate();

  function Signout() {
    const auth = getAuth();
    try{
        signOut(auth);
        navigate("/");

    }
    catch (error){
        window.alert(error);
      }
  }

  return (
    <div>
      <div className="container">
        <button className="logout--btn" onClick={Signout}>
          Logout
        </button>
      </div>
    </div>
  );
}
