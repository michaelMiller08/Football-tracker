import axios from "axios";
import React, { useEffect } from "react";
import FixtureCard from "./FixtureCard";

export default function RenderFixtureCards(props) {
  const [getResponse, setResponse] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      if (props.teamId > 0) {
        await axios
          .get(
            `https://localhost:7156/api/Matches/ScheduledForTeam/${props.teamId}`
          )
          .then((response) => setResponse(response.data));
      }
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, [props.teamId]);

  if (getResponse) {
    return getResponse.map((item) => {
      return (
        <FixtureCard
          time={item.time}
          creatorName={item.creator}
          opponentName={item.opponent}
          date={item.date}
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
