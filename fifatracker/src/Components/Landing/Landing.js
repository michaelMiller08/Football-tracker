import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase App.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Landing.css";
import RenderFixtureCards from "./RenderFixtureCards.js";
import RenderScoreCards from "./RenderScoreCards.js";
import axios from "axios";

export default function Landing(props) {
  const [user] = useAuthState(auth);
  const [teamId, setTeamId] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      axios
        .get(`https://localhost:7156/api/Teams/ForPlayer/${user.email}`)
        .then((response) => setTeamId(response.data.id));
    }

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  });

  if (!user) {
    return navigate("/");
  } else {
    props.funcNav(true);
    return (
      <div className="landing">
        <h3 className="title">Fifa Tracker</h3>
        <p className="sub--title">Previous Scores</p>
        <div className="score--card--div">
          <RenderScoreCards teamId={teamId} />
        </div>
        <p className="sub--title--fixtures">Match Fixtures</p>
        <div className="FixtureCard">
          <RenderFixtureCards teamId={teamId} />
        </div>
      </div>
    );
  }
}
//   const register = async () => {};
