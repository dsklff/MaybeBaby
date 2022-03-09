import React from "react";
import LabelBottomNavigation from "./ButtonNavigate";

import Settings from "../static/svg/settings.svg";
import Person from "../static/svg/person.svg";
import FAQ from "../static/svg/question.svg";
import Policy from "../static/svg/policy.svg";

import "../styles/MainProfile.css";

const MainProfile = () => {
  return (
    <div className="background-start">
      <div className="app-container main-profile">
        <button className="options-btn">
          <img src={Settings} alt="settings" />
        </button>

        <div className="main-profile__list">
          <button className="main-profile__btn">
            <img src={Person} alt="person" />
            <span className="main-profile__text">Личные данные</span>
          </button>
          <button className="main-profile__btn">
            <img src={FAQ} alt="person" />
            <span className="main-profile__text">Справочник</span>
          </button>
          <button className="main-profile__btn">
            <img src={Policy} alt="person" />
            <span className="main-profile__text">Условия соглашения</span>
          </button>
        </div>
        <LabelBottomNavigation></LabelBottomNavigation>
      </div>
    </div>
  );
};
export default MainProfile;
