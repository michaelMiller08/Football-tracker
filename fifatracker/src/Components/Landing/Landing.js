import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../Firebase App.js";
import NavigationBar from "../NavigationBar/NavigationBar.js";
import "./Landing.css";
import ScoreCard from "./ScoreCard.js";

export default function Landing() {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  // React.useEffect(() => {
  //   if (!user) return Navigate("/");
  // });
    return (

      <div className="landing">
        <h3 className="title">Fifa Tracker</h3>
        <p className="sub--title">Previous Scores</p>
        <div className="score--card--div">
          <ScoreCard />
          <ScoreCard />
          <ScoreCard />

          <ScoreCard />
          <ScoreCard />

          <ScoreCard />
        </div>
        <NavigationBar/>

      </div>
    );
    }
//   const register = async () => {};
