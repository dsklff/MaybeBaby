import { useFormik } from "formik";
import React from "react";
import authService from "../services/authService";

import "../styles/common-styles.css";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  email: string;
}

const ForgotPasswordSecondStepForm = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      code: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await authService
          .resetPassword(
            props.email,
            values.code,
            values.password,
            values.passwordConfirm
          )
          .then(() => props.nextStep());
      } catch (e) {
        alert(e);
      }
    },
  });

  return (
    <>
      <h2 className="app-subtitle">
        Мы отправили на ваш электронный адрес с кодом подтверждения
      </h2>
      <button onClick={() => props.prevStep()}></button>
      <form onSubmit={formik.handleSubmit}>
        <ul className="app-list">
          <li className="app-list__item">
            <label htmlFor="code">Code</label>
            <input
              className="app-input"
              id="code"
              name="code"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.code}
            />
          </li>
          <li className="app-list__item">
            <label htmlFor="password">Password</label>
            <input
              className="app-input"
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </li>
          <li className="app-list__item">
            <label htmlFor="email">Password confirmation</label>
            <input
              className="app-input"
              id="passwordConfirm"
              name="passwordConfirm"
              type="passwordConfirm"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
            />
          </li>
        </ul>

        <button className="app-btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordSecondStepForm;
