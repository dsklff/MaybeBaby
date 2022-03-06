import React from "react";
import { Link } from "react-router-dom";

const ForgotPasswordThirdStepForm = () => {
  return (
    <div>
      <h4>Password successfully changed</h4>
      <Link to="/login">Return to login page</Link>
    </div>
  );
};

export default ForgotPasswordThirdStepForm;
