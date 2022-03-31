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
      <ul>
        {results &&
          results.results!.map((x) => (
            <li key={x.result}>
              <h3>{x.question}</h3>
              <h4>{x.response}</h4>
              <p>{x.result}</p>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <section className="my-result-section">
      <div className="background-result">
        <div className="my-result__wrapper">
          <h1 className="my-result__header">
            <button
              className="close-btn"
              onClick={() => navigate("/myresults", { replace: true })}
            >
              <img src={CloseBtn} alt="close" />
            </button>
          </h1>
          <h2 className="my-result__subtitle">Тест #</h2>
          <p className="my-result__date">
            {moment(results && results.date).format("DD.MM.YYYY")}
          </p>
        </div>
      </div>

      <div className="my-result__back">
        <div className="my-result__recomendation recomendation">
          <img
            className="recomendation__icon"
            src={BlueMessage}
            alt="blue-message"
          />
          <h2 className="recomendation__title">Результаты</h2>
          {renderResults()}
        </div>

        <button
          className="my-result__btn"
          onClick={() => navigate("/starttest", { replace: true })}
        >
          Вернуться на главную
        </button>
      </div>
    </section>
  );
};

export default RequireAuth(ResultContainer);
