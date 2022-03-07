import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import authService from "../services/authService";

import ArrowIcon from "../static/svg/Arrow.svg";

import "./ProfileContainer.css";

const ProfileContainer = () => {
  const [profile, setProfile] = useState<any>(undefined);
  let navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const result = await authService.getProfile();
    setProfile(result && result.data);
    console.log(result);
  };

  return (
    <div className="app-container profile">
      <div className="app-wrapper">
        <button
          className="arrow-btn"
          onClick={() => navigate("/starttest", { replace: true })}
        >
          <img src={ArrowIcon} alt="arrow" />
        </button>
        <h1 className="app-title">Личные данные</h1>
        <ul>
          <li className="profile__data">
            <span>Email: </span>
            {profile && profile.email}
          </li>
          <li className="profile__data">
            <span>Name: </span>
            {profile && profile.name}
          </li>
          <li className="profile__data">
            <span>Gender: </span>
            {profile && profile.gender}
          </li>
          <li className="profile__data">
            <span>Nationality: </span>
            {profile && profile.nationality}
          </li>
          <li className="profile__data">
            <span>Date of birthday: </span>
            {profile && profile.dob}
          </li>
        </ul>
        <button className="password">Сменить пароль</button>
      </div>
      <button
        className="app-btn"
        onClick={() => navigate("/editprofile", { replace: true })}
      >
        Edit profile
      </button>
    </div>
  );
};

export default RequireAuth(ProfileContainer);
