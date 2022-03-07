import React, { useState } from "react";
import ForgotPasswordFirstStepForm from "../components/ForgotPasswordFirstStepForm";
import ForgotPasswordSecondStepForm from "../components/ForgotPasswordSecondStepForm";
import ForgotPasswordThirdStepForm from "../components/ForgotPasswordThirdStepForm";

import ArrowIcon from "../static/svg/Arrow.svg";
import "../styles/common-styles.css";
import "../styles/ForgotPasswordContainer.css";

const ForgotPasswordContainer = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");

  const setUserEmail = (email: string) => {
    setEmail(email);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderSwitch = (step: number) => {
    switch (step) {
      case 1:
        return (
          <ForgotPasswordFirstStepForm
            nextStep={nextStep}
            setEmail={setUserEmail}
          />
        );
      case 2:
        return (
          <ForgotPasswordSecondStepForm
            email={email}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return <ForgotPasswordThirdStepForm />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container forgot">
      <div className="title-wrapper">
        <button className="arrow-btn">
          <img src={ArrowIcon} alt="arrow" />
        </button>

        <h1 className="app-title">Восстановление</h1>
      </div>
      {renderSwitch(step)}
    </div>
  );
};

export default ForgotPasswordContainer;
