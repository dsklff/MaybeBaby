import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

import "../styles/common-styles.css";

const validate = (values: any) => {
  const errors: any = {};

  if (!values.currentPassword) {
    errors.currentPassword = "*Required";
  }

  if (!values.newPassword) {
    errors.password = "*Required";
  } else if (values.newPassword.length < 8 && values.newPassword.length > 50) {
    errors.newPassword = "*Password must be between 8 and 50 characters long.";
  }

  if (!values.passwordConfirm) {
    errors.password = "*Required";
  } else if (
    values.passwordConfirm.length < 8 &&
    values.passwordConfirm.length > 50
  ) {
    errors.passwordConfirm =
      "*Password must be between 8 and 50 characters long.";
  }

  if (values.newPassword && values.passwordConfirm) {
    if (values.newPassword !== values.passwordConfirm) {
      errors.passwordConfirm = "Password not matched";
    }
  }

  return errors;
};

const ChangePasswordContainer = () => {
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      passwordConfirm: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validate,
    onSubmit: async (values) => {
      try {
        const result = await authService
          .changePassword(
            values.currentPassword,
            values.newPassword,
            values.passwordConfirm
          )
          .then(() => navigate("/profile", { replace: true }));
      } catch (e) {
        alert(e);
      }
    },
  });

  return (
    <>
      <h2 className="app-subtitle">Сменить пароль</h2>
      <button onClick={() => navigate("/profile", { replace: true })}></button>
      <form onSubmit={formik.handleSubmit}>
        <ul className="app-list">
          <li className="app-list__item">
            <label htmlFor="currentPassword">Старый пароль</label>
            <input
              className="app-input"
              id="currentPassword"
              name="currentPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.currentPassword}
            />
            {formik.errors.currentPassword ? (
              <div>{formik.errors.currentPassword}</div>
            ) : null}
          </li>
          <li className="app-list__item">
            <label htmlFor="newPassword">Новый пароль</label>
            <input
              className="app-input"
              id="newPassword"
              name="newPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
            />
            {formik.errors.newPassword ? (
              <div>{formik.errors.newPassword}</div>
            ) : null}
          </li>
          <li className="app-list__item">
            <label htmlFor="email">Повторите новый пароль</label>
            <input
              className="app-input"
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
            />
            {formik.errors.passwordConfirm ? (
              <div>{formik.errors.passwordConfirm}</div>
            ) : null}
          </li>
        </ul>

        <button className="app-btn" type="submit">
          Сменить пароль
        </button>
      </form>
    </>
  );
};

export default ChangePasswordContainer;