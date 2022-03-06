import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import authService from "../services/authService";

const MyResultsContainer = () => {
  let navigate = useNavigate();

  const logOut = () => {
    navigate("/login");
  };

  return (
    <div>
      <h4>My results</h4>
      <button onClick={() => logOut()}>Logout</button>
    </div>
  );
};

export default RequireAuth(MyResultsContainer);
