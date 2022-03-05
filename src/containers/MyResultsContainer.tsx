import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import authService from "../services/authService";

const MyResultsContainer = () => {
  let navigate = useNavigate();

  return (
    <div>
      <h4>My results</h4>
    </div>
  );
};

export default RequireAuth(MyResultsContainer);
