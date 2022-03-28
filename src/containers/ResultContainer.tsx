import React, { useEffect, useRef, useState } from "react";
import CloseBtn from "../static/svg/close.svg";
import BlueMessage from "../static/img/blue-message.png";

import "../styles/ResultContainer.css";
import mainService from "../services/mainService";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import RequireAuth from "../components/RequireAuth";

interface Result {
  question: string;
  response: any;
  result: string;
}

interface FullResult {
  date: any;
  results: Result[];
  userData: any;
}

const ResultContainer = () => {
  const [results, setResults] = useState<FullResult>();
  let navigate = useNavigate();

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    const results = await mainService.getTestResults();

    const result =
      results &&
      results.data.results.reduce((prev: any, current: any) =>
        prev.date > current.date ? prev : current
      );

    setResults(result);
  };

  const renderResults = () => {
    return (
      <div>
        {results &&
          results.results!.map((x) => (
            <li key={x.result} className="my-result__item">
              <h3 className="my-result__title">{x.question}</h3>
              <h4 className="my-result__subtitle">{x.response}</h4>
              <p className="my-result__text">{x.result}</p>
            </li>
          ))}
      </div>
    );
  };

  return (
    <div className="background-result  my-result">
      <div className="app-container">
        <h1 className="my-result__header">
          <button
            className="close-btn"
            onClick={() => navigate("/myresults", { replace: true })}
          >
            <img src={CloseBtn} alt="close" />
          </button>
        </h1>
        <h2 className="my-result__subtitle">Результат по опросам</h2>
        <p className="my-result__date">
          {moment(results && results.date).format("DD-MM-YYYY")}
        </p>
        <div className="my-result__back">
          <ul className="my-result__items">{renderResults()}</ul>

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

          <button
            className="my-result__btn"
            onClick={() => navigate("/starttest", { replace: true })}
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequireAuth(ResultContainer);
