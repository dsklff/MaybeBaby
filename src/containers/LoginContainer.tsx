import { useFormik } from "formik";
import React, { useEffect, useState, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import authService from "../services/authService";

import Checkbox from "@mui/material/Checkbox";
import "../styles/LoginContainer.css";
import "../styles/common-styles.css";
import { Backdrop, CircularProgress } from "@mui/material";

const LoginContainer = () => {
  let navigate = useNavigate();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setIsLoading(true);
        const result = await authService.login(values.email, values.password);
        navigate("/starttest", { replace: true });
        setIsLoading(false);
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
        <ul className="app-list">
          <li className="app-list__item">
            <input
              className="app-input"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              placeholder="Email"
            />
          </li>
          <li className="app-list__item">
            <input
              className="app-input"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
            />
          </li>
        </ul>

        <div className="policy">
          <Checkbox
            value={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
          />
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

      <p className="account">Еще нет аккаунта?</p>
      <button className="action-btn action-btn--center">
        <Link to="/signup">Зарегистрироваться</Link>
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

export default LoginContainer;
