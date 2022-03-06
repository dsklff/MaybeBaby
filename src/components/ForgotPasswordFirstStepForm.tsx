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
    <div>
      <h4>First step</h4>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPasswordFirstStepForm;
