import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";

import Checkbox from "@mui/material/Checkbox";

import PolciyImg from "../static/img/policy.png";

import "../styles/Policy.css";
import { useNavigate } from "react-router-dom";

const Dot = styled.span`
  &:after {
    position: absolute;
    content: "";
    width: 7px;
    height: 7px;
    background: #1a2a2e;
    border-radius: 100%;
    left: 0;
    top: 3px;
  }
`;
const Policy = () => {
  const [isChecked, setIsChecked] = useState<boolean[]>([false, false]);
  let navigate = useNavigate();

  const toNextPage = async (index: number) => {
    setIsChecked((prevState) =>
      prevState.map((item, idx) => (idx === index ? !item : item))
    );
  };

  useEffect(() => {
    if (isChecked[0] && isChecked[1]) {
      navigate("/login", { replace: true });
    }
  }, [isChecked]);

  return (
    <div className="app-container">
      <img className="policy__img" src={PolciyImg} alt="policy" />
      <h1 className="policy__title">Условия пользования</h1>
      <p className="policy__text">
        Перед началом обследования, пожалуйста, прочитите Условия использования.
        Обратите внимания, что:
      </p>

      <ul className="policy-list">
        <li className="policy-list__item">
          <Dot></Dot>
          <h2 className="policy-list__title">
            Результат обследования не является диагнозом.
          </h2>
          <p className="policy-list__text">
            <span className="policy-list__title"></span>
            Обследование предназначено для информационных целей и не является
            квалифицированным медицинским заключением
          </p>
        </li>
        <li className="policy-list__item">
          <Dot></Dot>
          <h2 className="policy-list__title">
            Не используйте в чрезвычайных ситуациях.
          </h2>
          <p className="policy-list__text">
            В случае чрезвычайной ситуации со здоровьем не медленно вызывайте
            скорую помощь
          </p>
        </li>
        <li className="policy-list__item">
          <Dot></Dot>
          <h2 className="policy-list__title">Ваши данные безопасны</h2>
          <p className="policy-list__text">
            Информация, которую вы предоставляете, является анонимной и никому
            не передается
          </p>
        </li>
      </ul>

      <div className="policy">
        <button
          className="app-btn"
          onClick={() => navigate("/mainprofile", { replace: true })}
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Policy;
