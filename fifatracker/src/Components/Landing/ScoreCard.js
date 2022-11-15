import React from "react";
import "./ScoreCard.css";
import cardImg from "../../images/Card Live.png";

export default function ScoreCard() {
  return (
    <div className="score--card">
      {/* <img className="cardImg" src={cardImg}/> */}
      <div className="score--info">
        <p className="date">08/11/22</p>
        <p className="players">Michael v Thomas</p>
        <p className="score">1-0</p>
      </div>
    </div>
  );
}

