import React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function CreateGame(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [opponentEmail, setOpponentEmail] = React.useState("");
  const [date, setDate] = React.useState(Date);
  const [time, setTime] = React.useState(Date);

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

  async function addMatch() {
    const Match = {
      date: date,
      time: time + ":00",
      creator: props.email,
      opponent: opponentEmail,
      creatorScore: 0,
      opponentScore: 0,
    };
    const response = await axios
      .post("https://localhost:7156/api/Matches", Match)
      .then(function(res) {
        if(res.status == 201)
        window.alert("success")
      })
      .catch((error) => {
        console.log("error is: " + error);
        window.alert("All entries must be completed");
      });
  }

  return (
    <div>
      <button className="btns" onClick={handleOpen}>
        Create Game
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p id="modal-modal-title" variant="h2" component="h2">
            All fields are required to create a game
          </p>
          <div className="form">
            <TextField
              className="TextField"
              label="Opponent Email"
              type="Email"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setOpponentEmail(event.target.value);
              }}
            />
            <TextField
              className="TextField"
              label="Date"
              type="Date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setDate(event.target.value);
              }}
            />
            <TextField
              className="TextField"
              label="Time"
              type="Time"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setTime(event.target.value);
              }}
            />
            <button
              className="submit--btn"
              onClick={async () => {
                await addMatch();
              }}
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
