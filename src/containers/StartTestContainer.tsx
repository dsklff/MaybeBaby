import { replace } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

const StartTestContainer = () => {
  let navigate = useNavigate();

  const startTest = () => {
    navigate("/test", { replace: true });
  };

  return (
    <div>
      <h4>New test</h4>
      <button onClick={() => startTest()}></button>
    </div>
  );
};

export default StartTestContainer;
