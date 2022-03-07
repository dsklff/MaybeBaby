import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

import TextField from "@mui/material/TextField";

import Checkbox from "@mui/material/Checkbox";
import "../styles/common-styles.css";
import "../material.css";

interface Props {
  nextStep: () => void;
}

const RegisterFirstStepForm = (props: Props) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "*Required";
    } else if (values.length < 8 && values.length > 50) {
      errors.password = "*Password must be between 8 and 50 characters long.";
    }

    if (values.password && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password not matched";
      }
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate,
    onSubmit: async (values) => {
      try {
        const result = await authService
          .register(values.email, values.password, values.confirmPassword)
          .then(async () => {
            await authService.login(values.email, values.password);
            props.nextStep();
          });
      } catch (e) {
        alert(e);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          label="Email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}

        <TextField
          id="password"
          label="Придумайте пароль"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}

        <TextField
          id="confirmPassword"
          label="Придумайте пароль"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
        <div className="policy">
          <Checkbox
            onChange={() => setIsChecked(!isChecked)}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          ></Checkbox>
          <p className="policy-text">
            Я прочитал(а) и принимаю{" "}
            <span className="policy-link">
              Условия использования и Политику конфиденциальности
            </span>
          </p>
        </div>
        <button className="app-btn" type="submit" disabled={!isChecked}>
          Подтвердить
        </button>
      </form>
    </>
  );
};

export default RegisterFirstStepForm;
