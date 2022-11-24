import React from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import ToastMaker from "../ToastMaker";

export default function FindATeam(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [teamList, setTeamList] = React.useState([]);
  const [teamName, setTeamName] = React.useState([]);
  const [teamId, setTeamId] = React.useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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

  React.useEffect(() => {
    (async () => {
      await axios
        .get("https://localhost:7156/api/Teams")
        .then((response) => setTeamList(response.data));
    })();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  function getSelectedTeam() {
    return teamList.filter(function (team) {
      return team.teamName == teamName;
    });
  }

  async function joinTeam() {
    getSelectedTeam().map((item) => setTeamId(item["id"]));

    let Config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios
      .put(
        `https://localhost:7156/api/Teams/AddMember/${teamId}`,
        JSON.stringify(props.email), Config
      )
      .then(function (res) {
        new ToastMaker().ShowSuccessToast();
      })
      .catch(function (error) {
        new ToastMaker().ShowErrorToast(error.response.data);
       })
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTeamName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <button className="btns" onClick={handleOpen}>
        Join  A Team
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p id="modal-modal-title" variant="h2" component="h2">
            Select a team
          </p>
          {/* dropdown */}
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Teams</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={teamName}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {teamList.map((name) => (
                  <MenuItem key={name.id} value={name.teamName}>
                    {name.teamName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <button
            className="submit--btn"
            onClick={async () => {
              await joinTeam();
            }}
          >
            Submit
          </button>
        </Box>
      </Modal>
    </div>
  );
}
