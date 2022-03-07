import { MobileDatePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

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
        const result = await authService.editProfile(
          values.nationality,
          values.gender,
          moment(values.dob).format("YYYY-MM-DD hh:mm:ss"),
          values.name
        );
        console.log(result);
        navigate("/", { replace: true });
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <div>
      <form className="edit-profile__form" onSubmit={formik.handleSubmit}>
        <ul className="app-wrapper app-list">
          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="name">
              Name
            </label>
            <input
              className="app-input"
              id="name"
              defaultValue={undefined}
              name="name"
              placeholder="Type name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </li>
          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="nationality">
              Nationality
            </label>
            <select
              className="app-input"
              id="nationality"
              defaultValue={undefined}
              name="nationality"
              placeholder="Select nationality.."
              onChange={formik.handleChange}
              value={formik.values.nationality}
            >
              <option value="-1" label="Select.."></option>
              <option value="Kazakh" label="Kazakh"></option>
              <option value="Russian" label="Russian"></option>
            </select>
          </li>
          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="gender">
              Sex
            </label>
            <select
              className="app-input"
              id="gender"
              defaultValue={undefined}
              name="gender"
              placeholder="Select gender"
              onChange={formik.handleChange}
              value={formik.values.gender}
            >
              <option value={-1} label="Select.."></option>
              <option value={0} label="Female"></option>
              <option value={1} label="Male"></option>
            </select>
          </li>

          <li className="app-list__item">
            <label className="edit-profile__label" htmlFor="dob">
              Date of birthday
            </label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Date of birthday"
                inputFormat="MM/dd/yyyy"
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

export default RegisterSecondStepForm;
