import axios from "axios";
import React, { useEffect } from "react";
import FixtureCard from "./FixtureCard";

export default function RenderFixtureCards(props) {


    const [getResponse, setResponse] = React.useState(null);


    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get(`https://localhost:7156/api/Matches/ScheduledForTeam/${props.teamId}`)
            .then(response => setResponse(response.data))
            // .then(window.alert(getResponse))

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [props.teamId]);

  
if (getResponse){
  return getResponse.map((item) =>   {
    return (
      <FixtureCard
      time={item.time}
      creatorName={item.creator}
      opponentName={item.opponent}
      date={item.date}
      />
    );
  });  }
  else{
    return(<div>
      <h1>Nothing to display!</h1>
    </div>)
  }
}

