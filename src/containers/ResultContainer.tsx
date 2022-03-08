import React, { useRef, useState } from "react";
import CloseBtn from "../static/svg/close.svg";
import BlueMessage from "../static/img/blue-message.png";

import "../styles/ResultContainer.css";

const ResultContainer = () => {
  return (
    <div className="background-result  my-result">
      <div className="app-container">
        <h1 className="my-result__header">
          <button className="close-btn">
            <img src={CloseBtn} alt="close" />
          </button>
        </h1>
        <h2 className="my-result__subtitle">Результат по опросам</h2>
        <p className="my-result__date">09.12.2021</p>
        <div className="my-result__back">
          <ul className="my-result__items">
            <li className="my-result__item">
              <h3 className="my-result__title">Первая менструация</h3>
              <h4 className="my-result__subtitle">13 лет, регулярный</h4>
              <p className="my-result__text">
                У вас поздний репродуктивный возраст и низкий овариальный
                резерв. Торопитесь, время не ждет! Шансы забеременеть
                уменьшаются с каждым днем
              </p>
            </li>
            <li className="my-result__item">
              <h3 className="my-result__title">Первая менструация</h3>
              <h4 className="my-result__subtitle">13 лет, регулярный</h4>
              <p className="my-result__text">
                У вас поздний репродуктивный возраст и низкий овариальный
                резерв. Торопитесь, время не ждет! Шансы забеременеть
                уменьшаются с каждым днем
              </p>
            </li>
            <li className="my-result__item">
              <h3 className="my-result__title">Первая менструация</h3>
              <h4 className="my-result__subtitle">13 лет, регулярный</h4>
              <p className="my-result__text">
                У вас поздний репродуктивный возраст и низкий овариальный
                резерв. Торопитесь, время не ждет! Шансы забеременеть
                уменьшаются с каждым днем
              </p>
            </li>
            <li className="my-result__item">
              <h3 className="my-result__title">Первая менструация</h3>
              <h4 className="my-result__subtitle">13 лет, регулярный</h4>
              <p className="my-result__text">
                У вас поздний репродуктивный возраст и низкий овариальный
                резерв. Торопитесь, время не ждет! Шансы забеременеть
                уменьшаются с каждым днем
              </p>
            </li>
          </ul>

          <div className="my-result__recomendation recomendation">
            <img
              className="recomendation__icon"
              src={BlueMessage}
              alt="blue-message"
            />
            <h2 className="recomendation__title">Рекомендация</h2>
            <h3 className="recomendation__subtitle">
              Пройти комплексное обследование
            </h3>

            <ul>
              <li className="recomendation__item">
                <span>1. </span>
                <span>
                  сдать кровь на базовые гормоны: АМГ, ЛГ, ФСГ, ТТГ, Пролактин,
                  Тестостерон
                </span>
              </li>
              <li className="recomendation__item">
                <span>2. </span>
                <span>проверить проходимость труб при наличии партнера</span>
              </li>
              <li className="recomendation__item">
                <span>3. </span>
                <span>сдать спермограмму, морфология спермы, MAR-тест</span>
              </li>
            </ul>
          </div>

          <button className="my-result__btn">Вернуться на главную</button>
        </div>
      </div>
    </div>
  );
};

export default ResultContainer;
