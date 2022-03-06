import { MobileDatePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import "./RegisterSecondStep.css";

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
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="firstName">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />

        <label htmlFor="nationality">Nationality</label>
        <select
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
        <select
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

        <label htmlFor="dob">Date of birthday</label>
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

        <button className="app-btn" type="submit" disabled>
          Подтвердить
        </button>
      </form>
    </>
  );
};

export default RegisterSecondStepForm;
