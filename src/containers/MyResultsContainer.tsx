import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import authService from "../services/authService";

import arrowBlue from "../static/img/arrow-blue.png";
import "../styles/MyResultsContainer.css";
import "../styles/common-styles.css";
import mainService from "../services/mainService";
import moment from "moment";

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

const MyResultsContainer = () => {
  const [results, setResults] = useState<FullResult[]>();
  let navigate = useNavigate();

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    const results = await mainService.getTestResults();

    const result = results && results.data.results;

    setResults(result);
  };

  const renderResults = () => {
    return (
      <div>
        {results?.length !== 0 ? (
          <div>
            {results?.map((x) => (
              <li
                className="result__item"
                onClick={() =>
                  navigate("/myresultdetails", {
                    replace: true,
                    state: { date: x.date },
                  })
                }
              >
                <h2 className="result__title">
                  {moment(x.date).format("DD-MM-YYYY")}
                </h2>
                <h3 className="result__subtitle">3 фактора риска</h3>
                <button className="result__btn">
                  <span className="result__text">4 пункта рекомедации</span>
                  <img
                    className="result__img"
                    src={arrowBlue}
                    alt="arrow-blue"
                  />
                </button>
              </li>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              verticalAlign: "middle",
              lineHeight: "50vh",
            }}
          >
            Нет результатов
          </div>
        )}
      </div>
    );
  };

  const logOut = () => {
    navigate("/login");
  };

  return (
    <div className="background-result">
      <div className="app-container result">
        <ul className="result__list">{renderResults()}</ul>
        <button onClick={() => logOut()}></button>
      </div>
    </div>
  );
};

export default RequireAuth(MyResultsContainer);
