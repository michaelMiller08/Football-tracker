import axios from "axios";
import React, { useEffect } from "react";
import FixtureCard from "./FixtureCard";
import ScoreCard from "./ScoreCard";

export default function RenderScoreCards(props) {
  const [getResponse, setResponse] = React.useState(null);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    if (props.teamId) {
      axios
        .get(
          `https://localhost:7156/api/Matches/PreviousForTeam/${props.teamId}`
        )
        .then((response) => setResponse(response.data));
    }
  }, [props.teamId]);

  if (getResponse) {
    return getResponse.map((item) => {
      return (
        <ScoreCard
          date="1/1/20021"
          creatorEmail={item.creator}
          opponentEmail={item.opponent}
          playerScore={item.creatorScore}
          opponentScore={item.opponentScore}
        />
      );
    });
  } else {
    return (
      <div>
        <h1>Nothing to display!</h1>
      </div>
    );
  }
}
