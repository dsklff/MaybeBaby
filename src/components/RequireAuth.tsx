import React, { Component, ComponentType, useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const RequireAuth = (Component: any): any => {
  const RequireAuthComponent = () => {
    let navigate = useNavigate();

    useEffect(() => {
      (async () => {
        const result = await authService.checkAuth();
        if (!result) {
          navigate("login");
        }
      })();
    }, []);

    return <Component />;
  };
  return RequireAuthComponent;
};

export default RequireAuth;
