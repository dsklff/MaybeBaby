import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import authService from "../services/authService";

import arrowBlue from "../static/img/arrow-blue.png";
import "./MyResultsContainer.css";

const MyResultsContainer = () => {
  let navigate = useNavigate();

  const logOut = () => {
    navigate("/login");
  };

  return (
    <div className="background-result">
      <div className="app-container result">
        <ul className="result__list">
          <li className="result__item">
            <h2 className="result__title">09.12.2021</h2>
            <h3 className="result__subtitle">3 фактора риска</h3>
            <button className="result__btn">
              <span className="result__text">4 пункта рекомедации</span>
              <img className="result__img" src={arrowBlue} alt="arrow-blue" />
            </button>
          </li>
        </ul>
        <button onClick={() => logOut()}></button>
      </div>
    </div>
  );
};

export default RequireAuth(MyResultsContainer);
