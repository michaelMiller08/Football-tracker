import React from "react";
import homeIcon from "../../images/Home.png";
import teamsIcon from "../../images/Teams Icon.png";
import settingsIcon from "../../images/Settings Icon.png";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

export default function NavigationBar() {
  const [value, setValue] = React.useState(0);

  // const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
  // color: #0D47A1;
  // &.Mui-selected {
  //   color: white;
  // }`);

  return (
    <div className="navigation--bar">
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          className="navigation--bar"
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            className="nav--action"
            label="Home"
            component={Link}
            to="/landing"
            icon={<img src={homeIcon} />}
          />
          <BottomNavigationAction
            label="Teams"
            icon={<img src={teamsIcon} />}
            component={Link}
            to="/teams"
          />
          <BottomNavigationAction
            label="Settings"
            icon={<img src={settingsIcon} 
            component={Link}
            to="/settings"
            />}
          />
        </BottomNavigation>
      </Paper>
    </div>
  );
}
