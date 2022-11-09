import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../../Firebase App.js";


export default function Landing() {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  if (!user) {
    return (<Navigate replace to="/login" />);
  } else {
    return (
      <div>
        <h1>LOGGED IN!</h1>
      </div>
    );
  }
}
//   const register = async () => {};
