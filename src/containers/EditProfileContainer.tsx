import { useField, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import {
  Backdrop,
  CircularProgress,
  createTheme,
  TextField,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import type {} from "@mui/lab/themeAugmentation";
import moment from "moment";

import "../styles/common-styles.css";
import "../styles/EditProfileContainer.css";
import "../material.css";
import RequireAuth from "../components/RequireAuth";
import mainService from "../services/mainService";

const theme = createTheme({
  components: {
    MuiTimeline: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
  },
});

const EditProfileContainer = () => {
  const [profile, setProfile] = useState<any>(undefined);
  const [nationalities, setNationalities] = useState<any>();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: profile && profile.name,
      nationality: profile && profile.nationality,
      dob: profile && profile.dob,
      gender: profile && profile.gender,
    },
    onSubmit: async (values) => {
      try {
        const result = await authService.editProfile(
          values.nationality,
          values.gender,
          moment(values.dob).format("YYYY-MM-DD hh:mm:ss"),
          values.name
        );
        console.log(result);
        navigate("/profile", { replace: true });
      } catch (e) {
        console.log(e);
      }
    },
  });

  useEffect(() => {
    loadProfile();
    loadNationalities();
  }, []);

  const loadProfile = async () => {
    const result = await authService.getProfile();
    setProfile(result && result.data);
    console.log(result);
  };

  const loadNationalities = async () => {
    const result = await mainService.getNationalities();
    setNationalities(result && result.data);
    console.log(result);
  };

  return (
    <div className="app-container edit-profile">
      <h1 className="app-title">Изменить профиль</h1>
      <form className="edit-profile__form" onSubmit={formik.handleSubmit}>
        <ul className="app-wrapper app-list">
          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="name">
              Имя
            </label>
            <input
              className="app-input"
              id="name"
              name="name"
              defaultValue={profile && profile.name}
              placeholder="Введите имя"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </li>
          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="nationality">
              Национальность
            </label>
            <select
              className="app-input"
              id="nationality"
              name="nationality"
              placeholder="Выберите национальность"
              onChange={formik.handleChange}
              value={formik.values.nationality}
            >
              <option value="-1" label="Выбрать.."></option>
              <option value="Kazakh" label="Казах/Казашка"></option>
              <option value="Russian" label="Русский/Русская"></option>
            </select>
          </li>
          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="gender">
              Пол
            </label>
            <select
              className="app-input"
              id="gender"
              name="gender"
              placeholder="Select gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
            >
              <option value={-1} label="Выбрать.."></option>
              <option value={0} label="Female"></option>
              <option value={1} label="Male"></option>
            </select>
          </li>

          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="dob">
              Дата рождения
            </label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Дата рождения"
                inputFormat="dd/MM/yyyy"
                value={formik.values.dob}
                onChange={(val) => {
                  console.log("___", val);
                  formik.setFieldValue("dob", val);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </li>
        </ul>

        <button className="app-btn" type="submit">
          Изменить данные
        </button>
      </form>
    </div>
  );
};

export default RequireAuth(EditProfileContainer);
