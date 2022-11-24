import "./FixtureCard.css";

export default function FixtureCard(props) {
  return (
    <div>
      <div className="card--container">
        <div className="card">
            <div className="card--info">
            <p className="time">{props.time}</p>
            <p className="players--info">{props.creatorName} V {props.opponentName}</p>
            <p className="date">{props.date}</p>
            </div>
        </div>
      </div>
      
    </div>
  );
}
