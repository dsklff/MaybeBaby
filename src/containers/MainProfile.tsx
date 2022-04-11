import React from "react";
import LabelBottomNavigation from "./ButtonNavigate";
import { useLocation, useNavigate } from "react-router-dom";
import Settings from "../static/svg/settings.svg";
import Person from "../static/svg/person.svg";
import FAQ from "../static/svg/question.svg";
import Policy from "../static/svg/policy.svg";

import "../styles/MainProfile.css";

const MainProfile = () => {
  let navigate = useNavigate();
  return (
    <div className="background-start">
      <div className="app-container main-profile">
        <div className="main-profile__list">
          <button
            className="main-profile__btn"
            onClick={() => navigate("/profile", { replace: true })}
          >
            <img src={Person} alt="person" />
            <span className="main-profile__text">Личные данные</span>
          </button>
          <button
            className="main-profile__btn"
            onClick={() => navigate("/guide", { replace: true })}
          >
            <img src={FAQ} alt="person" />
            <span className="main-profile__text">Справочник</span>
          </button>
          <button
            className="main-profile__btn"
            onClick={() => navigate("/profilepolicy", { replace: true })}
          >
            <img src={Policy} alt="person" />
            <span className="main-profile__text">Условия соглашения</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default MainProfile;
