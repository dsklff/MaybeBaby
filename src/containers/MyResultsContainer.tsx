import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import authService from "../services/authService";

import arrowBlue from "../static/img/arrow-blue.png";
import "../styles/MyResultsContainer.css";
import "../styles/common-styles.css";
import mainService from "../services/mainService";
import moment from "moment";
import { Backdrop, CircularProgress } from "@mui/material";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    setIsLoading(true);
    const results = await mainService.getTestResults();

    const result = results && results.data.results;

    setResults(result);
    setIsLoading(false);
  };

  const renderResults = () => {
    return (
      <div>
        {results?.length !== 0 ? (
          <div>
            {results?.map((x) => (
              <li
                key={x.date}
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
                <h3 className="result__subtitle"></h3>
                <button className="result__btn">
                  <span className="result__text">3 фактора риска</span>
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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default RequireAuth(MyResultsContainer);
