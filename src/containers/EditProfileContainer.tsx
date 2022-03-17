import { useField, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { createTheme, TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import type {} from "@mui/lab/themeAugmentation";
import moment from "moment";

import "../styles/common-styles.css";
import "../styles/EditProfileContainer.css";
import "../material.css";
import RequireAuth from "../components/RequireAuth";

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
    console.log(result);
  };

  return (
    <div className="app-container edit-profile">
      <h1 className="app-title">Изменить профиль</h1>
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

export default RequireAuth(EditProfileContainer);
