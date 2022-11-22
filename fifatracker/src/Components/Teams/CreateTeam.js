import React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function CreateTeam(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [teamName, setTeam] = React.useState("");

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

  async function addTeam() {
    const Team = {
      teamName: teamName,
      members: [props.email],
    };

    const response = await axios
      .post("https://localhost:7156/api/Teams", Team)
      .then((x) => {
        window.alert("success");
      })
      .catch((error) => {
        console.log("error is: " + error);
        window.alert("All entries must be completed");
      });

    // if (response.status = 201) {
    //   window.alert(response);
    // }
  }

  return (
    <div>
      <button className="btns" onClick={handleOpen}>
        Create Team
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
              label="Team name"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setTeam(event.target.value);
              }}
            />
            <button
              className="submit--btn"
              onClick={async () => {
                await addTeam();
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
