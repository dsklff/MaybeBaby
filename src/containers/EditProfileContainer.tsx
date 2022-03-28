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

const EditProfileContainer = () => {
  const [profile, setProfile] = useState<any>(undefined);
  const [inputValue, setInputValue] = React.useState("");
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: profile && profile.name,
      nationality: profile && profile.nationality,
      dob: profile && profile.dob,
      gender: profile && profile.gender,
      city: profile && profile.city,
      familyStatus: profile && profile.marriage_status,
      profession: profile && profile.status,
    },
    onSubmit: async (values) => {
      try {
        const result = await authService.editProfile(
          values.nationality,
          values.gender,
          moment(values.dob).format("YYYY-MM-DD hh:mm:ss"),
          values.name,
          values.city,
          values.profession,
          values.familyStatus
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
              {nationalities &&
                nationalities.map((x: any) => (
                  <option value={x.value}>{x.title}</option>
                ))}
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
              placeholder="Выберите пол"
              onChange={formik.handleChange}
              value={formik.values.gender}
            >
              <option value={0} label="Женский"></option>
            </select>
          </li>

          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="profession">
              Введите национальность
            </label>
            <Autocomplete
              id="country-select-demo"
              sx={{ width: 300 }}
              options={nationalities}
              autoHighlight
              getOptionLabel={(option) => option.title}
              renderOption={(props, option) => (
                <Box component="li" {...props} value={option.value}>
                  {option.title}
                </Box>
              )}
              inputValue={inputValue}
              onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
                console.log(newInputValue);
              }}
              value={formik.values.nationality}
              onChange={(val) => {
                console.log("___", val);
                formik.setFieldValue("nationality", val);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
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
              defaultValue={undefined}
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
              defaultValue={undefined}
              name="city"
              placeholder="Выберите город.."
              onChange={formik.handleChange}
              value={formik.values.city}
            >
              {cities &&
                cities.map((x: any) => (
                  <option value={x.value}>{x.title}</option>
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
              defaultValue={undefined}
              name="familyStatus"
              placeholder="Select family status"
              onChange={formik.handleChange}
              value={formik.values.familyStatus}
            >
              {marriageStatuses &&
                marriageStatuses.map((x: any) => (
                  <option value={x.value}>{x.title}</option>
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
    </div>
  );
};

export default RequireAuth(EditProfileContainer);
