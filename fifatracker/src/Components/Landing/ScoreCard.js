import React from "react";
import "./ScoreCard.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ToastMaker from "../ToastMaker";
import axios from "axios";

export default function ScoreCard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [scoreOne, setScoreOne] = React.useState(0);
  const [scoreTwo, setScoreTwo] = React.useState(0);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  function handleClick() {
    if (!open) {
      handleOpen();
    }
  }

  async function updateScore() {
    const Match = {
      creatorScore: scoreOne,
      opponentScore: scoreTwo,
    };

    let Config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios
      .put(
        `https://localhost:7156/api/Matches/UpdateScore/${props.id}?creatorScore=${scoreOne}&opponentScore=${scoreTwo}`
      )
      .then(function (res) {
        new ToastMaker().ShowSuccessToast();
        handleClose();
      })
      .catch(function (error) {
        new ToastMaker().ShowErrorToast(error.response.data);
      });
  }

  return (
    <div className="score--card" onClick={handleClick}>
      <div className="score--info">
        <p className="date">{props.date}</p>
        <p className="players">
          {props.creatorEmail} v {props.opponentEmail}
        </p>
        <p className="score">
          {props.playerScore}-{props.opponentScore}
        </p>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <p id="modal-modal-title" variant="h2" component="h2">
              Input The Scores From This Game
            </p>
            <div className="form">
              <TextField
                className="TextField"
                label="Your Score"
                type="Number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  setScoreOne(event.target.value);
                }}
              />
              <TextField
                className="TextField"
                label="Opponent Score"
                type="Number"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  setScoreTwo(event.target.value);
                }}
              />
              <button
                className="submit--btn"
                onClick={async () => {
                  await updateScore();
                }}
              >
                Submit
              </button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
