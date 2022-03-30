import { MobileDatePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Autocomplete, TextField } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import ruLocale from "date-fns/locale/ru";
import { nationalities } from "../common/dictionaries";

import "../styles/common-styles.css";
import "../material.css";

const RegisterSecondStepForm = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      nationality: "",
      dob: "",
      gender: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await authService.registerSecondStep(
          values.nationality,
          values.gender,
          moment(values.dob).format("YYYY-MM-DD hh:mm:ss"),
          values.name
        );
        console.log(result);
        navigate("/starttest", { replace: true });
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div className="register-second">
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
          </li>
          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="gender">
              Пол
            </label>
            <select
              className="app-input"
              id="gender"
              defaultValue={undefined}
              name="gender"
              placeholder="Выберите пол.."
              onChange={formik.handleChange}
              value={formik.values.gender}
            >
              <option value={-1} label="Выбрать.."></option>
              <option value={0} label="Женский"></option>
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
          </li>
        </ul>

        <button className="app-btn" type="submit">
          Сохранить данные
        </button>
      </form>
    </div>
  );
};

export default RegisterSecondStepForm;
