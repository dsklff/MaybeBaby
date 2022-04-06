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
      <>
        {results?.length !== 0 ? (
          <>
            {results?.map((x, i) => {
              const num = i + 1;
              return (
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
                  <h2 className="result__title">Тест #{num}</h2>
                  <span className="result__date">
                    {moment(x.date).format("DD.MM.YYYY")}
                  </span>
                  <button className="result__btn">
                    <span className="result__text">Посмотреть</span>
                    <img
                      className="result__img"
                      src={arrowBlue}
                      alt="arrow-blue"
                    />
                  </button>
                </li>
              );
            })}
          </>
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
      </>
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
