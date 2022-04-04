import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterFirstStepForm from "../components/RegisterFirstStepForm";
import RegisterSecondStepForm from "../components/RegisterSecondStepForm";
import authService from "../services/authService";

import "../styles/RegisterContainer.css";
import "../styles/common-styles.css";

const RegisterContainer = () => {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderSwitch = (step: number) => {
    switch (step) {
      case 1:
        return <RegisterFirstStepForm nextStep={nextStep} />;
      case 2:
        return <RegisterSecondStepForm />;
      default:
        return null;
    }
  };

  return <div className="app-container signup">{renderSwitch(step)}</div>;
};

export default RegisterContainer;
