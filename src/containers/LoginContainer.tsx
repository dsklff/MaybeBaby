import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../services/authService";

import Checkbox from "@mui/material/Checkbox";
import "./LoginContainer.css";

const LoginContainer = () => {
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      localStorage.removeItem("token");
    }
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await authService.login(values.email, values.password);
        console.log("salam");
        console.log(localStorage.getItem("token"));
        navigate("/");
      } catch (e) {
        alert(e);
      }
    },
  });

  return (
    <div className="app-container login">
      <h1 className="app-title">Вход</h1>
      <h2 className="app-subtitle">Добро пожаловать...</h2>

      <form onSubmit={formik.handleSubmit}>
        <input
          className="login__input"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
        />

        <input
          className="login__input"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
        />

        <div className="policy">
          <Checkbox
            defaultChecked
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          ></Checkbox>
          <p className="policy-text">
            Я прочитал(а) и принимаю{" "}
            <span className="policy-link">
              Условия использования и Политику конфиденциальности
            </span>
          </p>
        </div>

        <button className="app-btn" type="submit">
          Подтвердить
        </button>
      </form>

      <p className="account">Еще нет аккаунта?</p>
      <button className="sign-up">Зарегистрироваться</button>
    </div>
  );
};

export default LoginContainer;
