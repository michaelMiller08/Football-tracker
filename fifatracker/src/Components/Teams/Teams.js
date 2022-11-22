import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase App.js";
import "./Teams.css";

import { useAuthState } from "react-firebase-hooks/auth";
import CreateGame from "./CreateGame.js";
import CreateTeam from "./CreateTeam.js";

export default function Teams() {
  const [user] = useAuthState(auth);
  const usenavigater = useNavigate();

  if (!user) {
    return usenavigater("/");
  }

  return (
    <div>
      <div>
        <div className="container">
          <CreateGame email={user.email} />
          <CreateTeam email={user.email}/>
        </div>
      </div>
    </div>
  );
}
