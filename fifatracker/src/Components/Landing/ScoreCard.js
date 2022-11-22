import React from "react";
import "./ScoreCard.css";
import cardImg from "../../images/Card Live.png";

export default function ScoreCard(props) {
  return (
    <div className="score--card">
      {/* <img className="cardImg" src={cardImg}/> */}
      <div className="score--info">
        <p className="date">{props.date}</p>
        <p className="players">{props.creatorEmail} v {props.opponentEmail}</p>
        <p className="score">{props.playerScore}-{props.opponentScore}</p>
      </div>
    </div>
  );
}

