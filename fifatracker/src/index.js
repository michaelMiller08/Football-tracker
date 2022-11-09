import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";
import Login from "./Components/Login/Login";
import Landing from "./Components/Landing/Landing";
import SignUp from "./Components/SignUp/SignUp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
   <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="login" element={<Login/>} />
        <Route path="landing" element={<Landing />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
