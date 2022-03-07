import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterFirstStepForm from "../components/RegisterFirstStepForm";
import RegisterSecondStepForm from "../components/RegisterSecondStepForm";
import authService from "../services/authService";

import "./RegisterContainer.css";

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

  return (
    <div className="app-container signup">
      <h1 className="app-title">Регистрация</h1>
      <h2 className="app-subtitle">Добро пожаловать...</h2>
      {renderSwitch(step)}
      <p className="account">Уже есть аккаунт?</p>
      <button className="sign-up">
        <Link to="/login">Войти</Link>
      </button>
    </div>
  );
};

export default RegisterContainer;
