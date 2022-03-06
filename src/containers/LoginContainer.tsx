import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../services/authService";

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
        navigate("/myresults", { replace: true });
      } catch (e) {
        alert(e);
      }
    },
  });

  return (
    <div>
      <h4>Login container</h4>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginContainer;
