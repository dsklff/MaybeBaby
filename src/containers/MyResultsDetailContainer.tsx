import React, { useEffect, useRef, useState } from "react";
import CloseBtn from "../static/svg/close.svg";
import BlueMessage from "../static/img/blue-message.png";

import "../styles/ResultContainer.css";
import mainService from "../services/mainService";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Backdrop,
  Box,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";

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

interface stateType {
  date: any;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyResultsDetailContainer = () => {
  const [results, setResults] = useState<FullResult>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let navigate = useNavigate();
  const location = useLocation();
  const state = location.state as stateType;
  const { date } = state;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    setIsLoading(true);
    const results = await mainService.getTestResultsByQuery(date.toString());

    const result =
      results &&
      results.data.results.reduce((prev: any, current: any) =>
        prev.date > current.date ? prev : current
      );

    setResults(result);
    setIsLoading(false);
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

          <div
            className="my-result__recomendation recomendation"
            onClick={() => handleOpen()}
          >
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
                  Cдать кровь на базовые гормоны: АМГ, ЛГ, ФСГ, ТТГ, Пролактин,
                  Тестостерон
                </span>
              </li>
              <li className="recomendation__item">
                <span>2. </span>
                <span>Проверить проходимость труб</span>
              </li>
              <li className="recomendation__item">
                <span>3. </span>
                <span>
                  При наличии партнерасдать спермограмму, морфология спермы,
                  MAR-тест
                </span>
              </li>
            </ul>
          </div>

          <button className="my-result__btn">Вернуться на главную</button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Как правильно подготовиться к анализам
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Гормоны репродуктивной системы необходимо сдавать строго по дням
            цикла: ЛГ, ФСГ, ТТГ, Пролактин, Тестостерон на 2-4 день цикла
            (первый день менструации — первый день цикла). Все гормоны сдают
            строго натощак. Помните, что если нет возможности сдать нужные
            гормоны в нужные дни цикла, лучше не сдавать, а подождать следующий
            цикл, иначе анализы будут абсолютно неинформативными
          </Typography>
        </Box>
      </Modal>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default MyResultsDetailContainer;
