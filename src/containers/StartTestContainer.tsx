import { replace } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import LabelBottomNavigation from "./ButtonNavigate";

import info from "../static/svg/info.svg";
import "../styles/StartTestContainer.css";
import "../styles/common-styles.css";

const StartTestContainer = () => {
  let navigate = useNavigate();

  const startTest = () => {
    navigate("/test", { replace: true });
  };

  return (
    <div className="background-start">
      <div className="app-container start-test">
        <button className="options-btn">
          <img src={info} alt="info" />
        </button>
        <div className="start-test__wrapper">
          <h3 className="start-test__title">Начните с онлайн теста ... </h3>
          <h5 className="start-test__subtitle">Узнайте ...</h5>

          <button className="app-btn" onClick={() => startTest()}>
            Начать
          </button>
        </div>
        <LabelBottomNavigation></LabelBottomNavigation>
      </div>
    </div>
  );
};

export default StartTestContainer;
