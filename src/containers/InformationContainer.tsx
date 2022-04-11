import { Backdrop, CircularProgress } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  nationalities,
  marriageStatuses,
  cities,
} from "../common/dictionaries";
import RequireAuth from "../components/RequireAuth";
import authService from "../services/authService";
import ArrowIcon from "../static/svg/Arrow.svg";

import "../styles/common-styles.css";
import "../styles/InformationContainer.css";

const InformationContainer = () => {
  let navigate = useNavigate();
  return (
    <div className="app-container app-container--navigation info">
      <div className="app-wrapper">
        <button
          className="arrow-btn"
          onClick={() => navigate("/starttest", { replace: true })}
        >
          <img src={ArrowIcon} alt="arrow" />
        </button>
        <h1 className="app-title">Информация</h1>
        <ul className="info__list">
          <li className="info__item">
            <h3 className="info__title">Что мне нужно сделать?</h3>
            <p className="info__text">
              Вам необходимо ответить максимально точно на вопросы, желательно
              предварительно сдав кровь на АМГ, чтобы получить полную
              информацию.
            </p>
          </li>
          <li className="info__item">
            <h3 className="info__title">Это быстро?</h3>
            <p className="info__text">
              Заполнение ответов займет у вас не более 2 минут, ответ вы
              получите моментально.
            </p>
          </li>
          <li className="info__item">
            <h3 className="info__title">Что ожидать после прохождения?</h3>
            <p className="info__text">
              Вы получите информацию о вашем репродуктивном здоровье на данный
              момент.
            </p>
          </li>
          <li className="info__item">
            <h3 className="info__title">Как мне это поможет?</h3>
            <p className="info__text">
              Вы сможете проанализировать свой образ жизни, получите
              предварительную диагностику на бесплодие, а также есть ли у Вас
              время отсрочить материнство.{" "}
            </p>
          </li>
          <li className="info__item">
            <h3 className="info__title">Можно ли повторно проходить тест?</h3>
            <p className="info__text">
              Вы можете пройти тест неограниченное кол-во раз, в зависимости от
              ваших ответов вы получите разный результат.{" "}
            </p>
          </li>
          <li className="info__item">
            <h3 className="info__title">
              Можно ли проходить тест без наличия партнера?
            </h3>
            <p className="info__text">
              Вы можете проходить тест без наличия партнёра и узнать свой
              репродуктивный потенциал. Но также хотим отметить, что фактор
              бесплодия всегда рассматривается в паре. Вы всегда можете
              вернуться в наше приложение и ввести дополнительно данные вашего
              партнера и получить результат.{" "}
            </p>
          </li>
          <li className="info__item">
            <h3 className="info__title">Обязательно ли сдавать анализ АМГ?</h3>
            <p className="info__text">
              Вы получите результат теста в любом случае, но для более
              достоверной информации рекомендуем Вам сдать его и получить полный
              ответ.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InformationContainer;
