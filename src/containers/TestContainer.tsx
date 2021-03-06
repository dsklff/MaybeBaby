import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import mainService from "../services/mainService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { NumericLiteral } from "typescript";
import { useFormik } from "formik";
import { urlToHttpOptions } from "url";
import LinearDeterminate from "../components/Progress";
import ruLocale from "date-fns/locale/ru";

import ArrowIcon from "../static/svg/Arrow.svg";
import "../styles/TestContainer.css";
import "../styles/common-styles.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import RequireAuth from "../components/RequireAuth";
import authService from "../services/authService";

interface Option {
  id: number;
  title: string;
  type: string;
  order: number;
  question_id: number;
  created_at: Date;
  updated_at: Date;
}

interface Question {
  id: number;
  title: string;
  order: number;
  survey_id: number;
  option_id: number | null;
  created_at: Date;
  updated_at: Date;
  options: Option[];
}

interface Answer {
  option_id: number | null;
  value: any;
}

interface CurrentAnswer {
  option_id: number | null;
  value: any | null;
  type: string;
}

const TestContainer = () => {
  const [currentOrder, setCurrentOrder] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isButtonQuestion, setIsButtonQuestion] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [questionCount, setQuestionCount] = useState<number>(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [profile, setProfile] = useState<any>(undefined);

  const loadProfile = async () => {
    setIsLoading(true);
    const result = await authService.getProfile();
    setProfile(result && result.data);
    formik.setFieldValue("value", result && result?.data.dob);
    formik.setFieldValue("option_id", 1);
    console.log(result);
    setIsLoading(false);
  };

  const validate = (values: any) => {
    const errors: any = {};

    if (values.option_id === null || values.value == "") {
      errors.option_id = "?????????? ????????????????????";
    }

    if (currentOrder === 2 && values.value > 210) {
      errors.option_id = "???????? ???????????? ???????? ???? ???????????? 210 ????";
    }

    if (currentOrder === 2 && values.value < 0) {
      errors.option_id = "???????? ???? ?????????? ???????? ??????????????????????????";
    }

    if (currentOrder === 3 && values.value > 150) {
      errors.option_id = "?????? ???????????? ???????? ???? ???????????? 150 ????";
    }

    if (currentOrder === 3 && values.value < 0) {
      errors.option_id = "?????? ???? ?????????? ???????? ??????????????????????????";
    }

    return errors;
  };

  const checkDataForValid = (value: string) => {
    let result: any;
    if (moment(value, "YYYY-MM-DD", true).isValid()) {
      console.log("smth");
      result = moment(value).format("YYYY-MM-DD");
    } else {
      result = value;
    }

    return result;
  };

  const nextQuestion = async () => {
    const value = checkDataForValid(formik.values.value);

    const updatedAnswers = [
      ...answers,
      { option_id: formik.values.option_id, value: value },
    ];

    let availableQuestions = questions?.filter((x) => x.order > currentOrder);

    if (availableQuestions && availableQuestions?.length > 0) {
      let i: number = 1;
      for (let question of availableQuestions!) {
        if (
          question?.option_id !== null &&
          !updatedAnswers.some((a) => a.option_id === question?.option_id)
        ) {
          availableQuestions = availableQuestions?.filter(
            (x) => x.option_id !== question.option_id
          );
        } else {
          setCurrentOrder(currentOrder + i);
          setCurrentQuestion((prevState) => prevState + i);
          return;
        }

        i++;
      }
    }

    try {
      const result = await mainService.endTest(updatedAnswers);
      console.log(result?.data.results);
      navigate("/percentprogress", {
        replace: true,
        state: result?.data.results,
      });
    } catch (e) {
      alert(e);
      console.log(e);
    }
  };

  const addAnswerValue = (option_id: number, value: any) => {
    setAnswers((prevState) => [
      ...prevState,
      { option_id: option_id, value: value },
    ]);
  };

  const onChangeAnswer = async (
    event: any,
    option_id: number,
    type: string
  ) => {
    formik.setFieldValue("option_id", option_id);
    formik.setFieldValue("value", event.target.value);
    if (type === "select") {
      await Promise.resolve();
      formik.submitForm();
    }
  };

  const formik = useFormik({
    initialValues: {
      option_id: null,
      value: "",
    },
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      const value = checkDataForValid(formik.values.value);
      addAnswerValue(values.option_id!, value);
      nextQuestion();
      resetForm();
    },
  });

  const checkIsButtonQuestion = (questions: Question[]) => {
    const question =
      questions &&
      questions.find((question: Question) => question.order === currentOrder);

    if (question && question.options.some((x) => x.type !== "select")) {
      setIsButtonQuestion(false);
    } else {
      setIsButtonQuestion(true);
    }
  };

  useEffect(() => {
    (async () => {
      await loadProfile();
      await loadQuestions().then(() => {
        console.log(questions);
      });
    })();
  }, []);

  useEffect(() => {
    checkIsButtonQuestion(questions!);
  }, [currentOrder]);

  const loadQuestions = async () => {
    setIsLoading(true);
    const result = await mainService.startTest();
    const sortedResult =
      result &&
      result.data.survey.questions.sort(
        (a: Question, b: Question) => a.order - b.order
      );

    console.log(sortedResult);
    setQuestionCount(sortedResult.length);
    setQuestions(sortedResult);
    checkIsButtonQuestion(sortedResult);
    setIsLoading(false);
  };

  const elementForOption = (option: Option) => {
    switch (option.type) {
      case "number":
        return (
          <input
            id="value"
            name="value"
            type="number"
            onChange={(e) => onChangeAnswer(e, option.id, option.type)}
            value={formik.values.value}
          />
        );
      case "select": {
        return (
          <button
            type="button"
            value={option.title}
            onClick={(e) => onChangeAnswer(e, option.id, option.type)}
          >
            {option.title}
          </button>
        );
      }
      case "date":
        return (
          <MobileDatePicker
            label="?????????????? ????????"
            inputFormat="dd/MM/yyyy"
            value={profile && profile.dob}
            onChange={(val) => {
              formik.setFieldValue("value", val);
              formik.setFieldValue("option_id", option.id);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        );
      default:
        return null;
    }
  };

  const renderQuestion = (order: number) => {
    const question =
      questions &&
      questions.find((question: Question) => question.order === order);
    return (
      <div>
        <label>{question && question.title}</label>
        {question &&
          question.options.map((option: Option) => {
            return <div key={option.id}>{elementForOption(option)}</div>;
          })}
      </div>
    );
  };

  return (
    <div className="app-container test">
      <div className="app-wrapper">
        <button className="arrow-btn">
          <img
            src={ArrowIcon}
            alt="arrow"
            onClick={() => navigate("/starttest", { replace: true })}
          />
        </button>
        <h1 className="app-title">????????????</h1>
        <LinearDeterminate
          currentQuestion={currentQuestion}
          questionCount={questionCount}
        />
        <h4 className="test__title">???????????????????? ?????? ?????????????? ?? ????????</h4>

        <form className="test__form" onSubmit={formik.handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            {renderQuestion(currentOrder)}
            {formik.errors.option_id ? (
              <div>{formik.errors.option_id}</div>
            ) : null}
            {isButtonQuestion === false ? (
              <button className="app-btn" type="submit">
                ?????????????????? ????????????
              </button>
            ) : null}
          </LocalizationProvider>
        </form>
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

export default RequireAuth(TestContainer);
