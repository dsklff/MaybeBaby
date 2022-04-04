import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

import TextField from "@mui/material/TextField";

import Checkbox from "@mui/material/Checkbox";
import "../styles/common-styles.css";
import "../material.css";
import { copyFileSync } from "fs";
import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
  nextStep: () => void;
}

const RegisterFirstStepForm = (props: Props) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validate = (values: any) => {
    const errors: any = {};

    if (!values.email) {
      errors.email = "Обязательно";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Неправильный формат почты";
    }

    if (!values.password) {
      errors.password = "Обязательно";
    } else if (values.password.length < 8 || values.password.length > 50) {
      errors.password = "Пароль должен быть от 8 до 50 символов";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Обязательно";
    } else if (values.password && values.confirmPassword) {
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Пароли не совпадают";
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
        setIsLoading(true);
        const response = await authService.register(
          values.email,
          values.password,
          values.confirmPassword
        );

        if (response === 200) {
          await authService.login(values.email, values.password);
          props.nextStep();
        }

        formik.resetForm();
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    },
  });

  return (
    <div className="register-first">
      <h1 className="app-title">Регистрация</h1>
      <h2 className="app-subtitle">Добро пожаловать...</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          label="Email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          helperText={formik.touched.email && formik.errors.email}
        />
        {/* {formik.errors.email ? <div>{formik.errors.email}</div> : null} */}

        <TextField
          id="password"
          label="Придумайте пароль"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          helperText={formik.touched.password && formik.errors.password}
        />
        {/* {formik.errors.password ? <div>{formik.errors.password}</div> : null} */}

        <TextField
          id="confirmPassword"
          label="Повторите пароль"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        {/* {formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null} */}
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
      <p className="account">Уже есть аккаунт?</p>
      <button className="action-btn action-btn--center">
        <Link to="/login">Войти</Link>
      </button>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default RegisterFirstStepForm;
