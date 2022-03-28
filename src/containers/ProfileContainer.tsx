import { Backdrop, CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  nationalities,
  marriageStatuses,
  cities,
} from "../common/dictionaries";
import RequireAuth from "../components/RequireAuth";
import authService from "../services/authService";

import ArrowIcon from "../static/svg/Arrow.svg";

import "../styles/common-styles.css";
import "../styles/ProfileContainer.css";

const ProfileContainer = () => {
  const [profile, setProfile] = useState<any>(undefined);
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    const result = await authService.getProfile();
    setProfile(result && result.data);
    console.log(result);
    setIsLoading(false);
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
        <ul className="app-list">
          <li className="app-list__item">
            <span>Email: </span>
            {profile && profile.email}
          </li>
          <li className="app-list__item">
            <span>Имя: </span>
            {profile && profile.name}
          </li>
          <li className="app-list__item">
            <span>Пол: </span>
            {profile && profile.gender === 0 ? "Женский" : "Мужской"}
          </li>
          <li className="app-list__item">
            <span>Национальность: </span>
            {profile &&
              nationalities.find((x) => x.value === profile.nationality) &&
              nationalities.find((x) => x.value === profile.nationality)!.title}
          </li>
          <li className="app-list__item">
            <span>Дата рождения: </span>
            {profile && moment(profile.dob).format("DD-MM-YYYY")}
          </li>
          <li className="app-list__item">
            <span>Профессия: </span>
            {profile && profile.profession}
          </li>
          <li className="app-list__item">
            <span>Семейное положение: </span>
            {profile &&
              marriageStatuses.find(
                (x) => x.value === profile.marriage_status
              ) &&
              marriageStatuses.find((x) => x.value === profile.marriage_status)!
                .title}
          </li>
          <li className="app-list__item">
            <span>Город: </span>
            {profile &&
              cities.find((x) => x.value === profile.city) &&
              cities.find((x) => x.value === profile.city)!.title}
          </li>
        </ul>
        <button
          className="action-btn"
          onClick={() => navigate("/editprofile", { replace: true })}
        >
          Изменить профиль
        </button>
        <button
          className="action-btn"
          onClick={() => navigate("/changepassword", { replace: true })}
        >
          Сменить пароль
        </button>
        <button
          className="action-btn"
          onClick={() => navigate("/login", { replace: true })}
        >
          Выйти
        </button>
      </div>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default RequireAuth(ProfileContainer);
