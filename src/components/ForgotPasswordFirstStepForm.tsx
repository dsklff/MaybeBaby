import { useFormik } from "formik";
import React from "react";
import authService from "../services/authService";

interface Props {
  nextStep: () => void;
  setEmail: (email: string) => void;
}

const ForgotPasswordFirstStepForm = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const result = await authService
          .forgotPassword(values.email)
          .then(() => {
            props.setEmail(values.email);
            props.nextStep();
          });
      } catch (e) {
        alert(e);
      }
    },
  });

  return (
    <>
      <h2 className="app-subtitle">
        Введите ваш электронный адрес, указанный вами при регистрации
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          className="form-info"
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <button className="app-btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordFirstStepForm;
