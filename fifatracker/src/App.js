import Landing from "./Components/Landing/Landing.js";
import Login from "./Components/Login/Login.js";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp.js";
import Teams from "./Components/Teams/Teams.js";
import Settings from "./Components/Settings/Settings.js";
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar/NavigationBar.js";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default function App() {
  const [showNav, setShowNav] = React.useState(true);

  return (
    <div className="App">
      <ToastContainer />

      <BrowserRouter>
        {showNav && (
          <div>
            <NavigationBar />
          </div>
        )}

        <Routes>
          <Route path="/" element={<Login funcNav={setShowNav} />} />
          <Route path="landing" element={<Landing funcNav={setShowNav} />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="teams" element={<Teams />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
