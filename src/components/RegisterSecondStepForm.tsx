import { MobileDatePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Autocomplete,
  Backdrop,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import {
  cities,
  marriageStatuses,
  nationalities,
} from "../common/dictionaries";

import "../styles/common-styles.css";
import "../material.css";

const RegisterSecondStepForm = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const validate = (values: any) => {
    const errors: any = {};

    if (values.gender === null) {
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

    if (!values.city || values.city === -1) {
      errors.city = "Выберите город";
    }

    if (!values.profession) {
      errors.profession = "Введите профессию";
    }

    if (!values.marriage_status || values.marriage_status === -1) {
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
      name: "",
      nationality: "",
      dob: "",
      gender: null,
      city: "",
      marriage_status: "",
      profession: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate,
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
        setIsLoading(false);
        console.log(result);
        navigate("/starttest", { replace: true });
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    },
  });

  return (
    <div className="register-second">
      <h1 className="app-title">Анкетные данные</h1>
      <h2 className="app-subtitle">Пожалуйста заполните анкетные данные</h2>
      <form className="edit-profile__form" onSubmit={formik.handleSubmit}>
        <ul className="app-wrapper app-list">
          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="name">
              Имя
            </label>
            <input
              className="app-input"
              id="name"
              defaultValue={undefined}
              name="name"
              placeholder="Введите имя"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name ? <div>{formik.errors.name}</div> : null}
          </li>
          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="nationality">
              Национальность
            </label>
            <Autocomplete
              id="nationality"
              value={formik.values.nationality}
              options={nationalities}
              autoHighlight
              getOptionLabel={(option) => option}
              onChange={(e, val) => {
                formik.setFieldValue("nationality", val);
              }}
              renderInput={(params) => (
                <TextField
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
            <label className="edit-profile__label" htmlFor="dob">
              Дата рождения
            </label>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              locale={ruLocale}
            >
              <MobileDatePicker
                label="Дата Рождения"
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
          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="gender">
              Пол
            </label>
            <div className="app-list__sex">
              <button
                className="app-choice"
                disabled
                onClick={() => formik.setFieldValue("gender", 1)}
              >
                Мужской
              </button>
              <button
                className={
                  formik.values.gender === 0
                    ? "app-choice app-choice--selected"
                    : "app-choice"
                }
                onClick={() => formik.setFieldValue("gender", 0)}
              >
                Женский
              </button>
            </div>
            {formik.errors.gender ? <div>{formik.errors.gender}</div> : null}
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
              <option value={-1} label="Выбрать.." selected={true}></option>
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
              <option value={-1} label="Выбрать.." selected={true}></option>
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
        </ul>

        <button className="app-btn" type="submit">
          Подтвердить
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

export default RegisterSecondStepForm;
