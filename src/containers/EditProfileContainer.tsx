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

  const validate = (values: any) => {
    const errors: any = {};

    if (values.gender !== 0 && values.gender !== 1) {
      errors.gender = "Выберите пол";
    }

    if (!values.nationality) {
      errors.nationality = "Выберите национальность";
    }

    if (!values.name) {
      errors.name = "Введите имя";
    }

    if (!values.dob) {
      errors.dob = "Введите дату рождения";
    }

    if (getAge(values.dob) < 18) {
      errors.dob = "Возраст должен составлять минимум 18 лет";
    }

    if (!values.city) {
      errors.city = "Выберите город";
    }

    if (!values.profession) {
      errors.profession = "Введите профессию";
    }

    if (!values.marriage_status) {
      errors.marriage_status = "Выберите семейное положение";
    }

    return errors;
  };

  const getAge = (dateString: any) => {
    console.log(dateString);
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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
    validate,
    validateOnChange: false,
    validateOnBlur: false,
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
    <div className="app-container app-container--navigation edit-profile">
      <h1 className="app-title">Личные данные</h1>
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
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
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
            {formik.errors.gender ? <div>{formik.errors.gender}</div> : null}
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
            {formik.errors.nationality ? (
              <div>{formik.errors.nationality}</div>
            ) : null}
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
            {formik.errors.profession ? (
              <div>{formik.errors.profession}</div>
            ) : null}
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
            {formik.errors.city ? <div>{formik.errors.city}</div> : null}
          </li>

          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="marriage_status">
              Семейное положение
            </label>
            <select
              className="app-input"
              id="marriage_status"
              name="marriage_status"
              placeholder="Выберите семейное положение"
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
            {formik.errors.marriage_status ? (
              <div>{formik.errors.marriage_status}</div>
            ) : null}
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
            {formik.errors.dob ? <div>{formik.errors.dob}</div> : null}
          </li>
        </ul>

        <button className="app-btn" type="submit">
          Сохранить
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
