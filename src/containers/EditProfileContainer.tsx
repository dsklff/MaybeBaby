import { useField, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import ruLocale from "date-fns/locale/ru";
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
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";

import "../styles/common-styles.css";
import "../styles/EditProfileContainer.css";
import "../material.css";
import RequireAuth from "../components/RequireAuth";
import mainService from "../services/mainService";
import {
  cities,
  marriageStatuses,
  nationalities,
} from "../common/dictionaries";

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

interface Profile {
  name: string;
  nationality: string;
  dob: any;
  gender: number;
  city: string;
  marriage_status: number;
  profession: string;
}

const EditProfileContainer = () => {
  const [profile, setProfile] = useState<Profile>();
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: profile && profile.name,
      nationality: profile && profile.nationality,
      dob: profile && profile.dob,
      gender: profile && profile.gender,
      city: profile && profile.city,
      marriage_status: profile && profile.marriage_status,
      profession: profile && profile.profession,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const result = await authService.editProfile(
          values.nationality,
          values.gender,
          moment(values.dob).format("YYYY-MM-DD hh:mm:ss"),
          values.name,
          values.city,
          values.profession,
          values.marriage_status
        );
        console.log(result);
        navigate("/profile", { replace: true });
      } catch (e) {}
    },
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const result = await authService.getProfile();
    setProfile(result && result.data);
    console.log(result && result.data);
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
              placeholder="Введите имя"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </li>
          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="gender">
              Пол
            </label>
            <select
              className="app-input"
              id="gender"
              name="gender"
              placeholder="Выберите пол"
              onChange={formik.handleChange}
              value={formik.values.gender}
            >
              <option value={0} label="Женский"></option>
              <option value={1} label="Мужской"></option>
            </select>
          </li>

          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="nationality">
              Введите национальность
            </label>
            <Autocomplete
              id="nationality"
              value={formik.values.nationality}
              inputValue={formik.values.nationality}
              options={nationalities}
              autoHighlight
              getOptionLabel={(option) => option}
              onChange={(e, val) => {
                formik.setFieldValue("nationality", val);
              }}
              onInputChange={(e, val) => {
                formik.setFieldValue("nationality", val);
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ fontWeight: 400 }}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
          </li>

          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="profession">
              Введите профессию
            </label>
            <input
              className="app-input"
              id="profession"
              name="profession"
              placeholder="Введите профессию.."
              onChange={formik.handleChange}
              value={formik.values.profession}
            />
          </li>

          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="city">
              Выберите город
            </label>
            <select
              className="app-input"
              id="city"
              name="city"
              placeholder="Выберите город.."
              onChange={formik.handleChange}
              value={formik.values.city}
            >
              {cities &&
                cities.map((x: any) => (
                  <option key={x.value} value={x.value}>
                    {x.title}
                  </option>
                ))}
            </select>
          </li>

          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="familyStatus">
              Семейное положение
            </label>
            <select
              className="app-input"
              id="familyStatus"
              name="familyStatus"
              placeholder="Select family status"
              onChange={formik.handleChange}
              value={formik.values.marriage_status}
            >
              {marriageStatuses &&
                marriageStatuses.map((x: any) => (
                  <option key={x.value} value={x.value}>
                    {x.title}
                  </option>
                ))}
            </select>
          </li>

          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="dob">
              Дата рождения
            </label>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={ruLocale}
            >
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default RequireAuth(EditProfileContainer);
