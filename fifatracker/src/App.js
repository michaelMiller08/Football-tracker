import Landing from "./Components/Landing/Landing.js";
import Login from "./Components/Login/Login.js";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp.js";
import Teams from "./Components/Teams/Teams.js";
import Settings from "./Components/Settings/Settings.js";
import { BrowserRouter } from "react-router-dom";


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="landing" element={<Landing />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="teams" element={<Teams />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
