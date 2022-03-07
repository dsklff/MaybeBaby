import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import mainService from "../services/mainService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { NumericLiteral } from "typescript";
import { useFormik } from "formik";
import { urlToHttpOptions } from "url";

import ArrowIcon from "../static/svg/Arrow.svg";
import "../styles/TestContainer.css";
import "../styles/common-styles.css";

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

  const validate = (values: any) => {
    const errors: any = {};

    if (values.option_id === null || values.value == "") {
      errors.option_id = "Answer is Required";
    }

    return errors;
  };

  const nextQuestion = async (question: number) => {
    if (
      questions &&
      questions[questions.length - 1].order <= currentOrder + question
    ) {
      addAnswerValue(formik.values.option_id!, formik.values.value);
      await Promise.resolve();

      try {
        const result = await mainService.endTest(answers);
      } catch (e) {
        alert(e);
      }
    }
    setCurrentOrder(currentOrder + question);
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
      const question = questions?.find((q) => q.order === currentOrder + 1);
      const updatedAnswers = [
        ...answers,
        { option_id: values.option_id, value: values.value },
      ];
      addAnswerValue(values.option_id!, values.value);

      if (
        question?.option_id !== null &&
        !updatedAnswers.some((a) => a.option_id === question?.option_id)
      ) {
        nextQuestion(2);
      } else {
        nextQuestion(1);
      }

      console.log(answers);

      if (
        question?.option_id !== null &&
        question?.option_id !== values.option_id
      ) {
        nextQuestion(2);
      } else {
        nextQuestion(1);
      }

      if (questions && questions[questions.length - 1].order <= currentOrder) {
        addAnswerValue(values.option_id!, values.value);
        await Promise.resolve();

        try {
          const result = await mainService.endTest(answers);
        } catch (e) {
          alert(e);
        }
      }

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
      await loadQuestions().then(() => {
        console.log(questions);
      });
    })();
  }, []);

  useEffect(() => {
    checkIsButtonQuestion(questions!);
  }, [currentOrder]);

  const loadQuestions = async () => {
    const result = await mainService.startTest();
    const sortedResult =
      result &&
      result.data.survey.questions.sort(
        (a: Question, b: Question) => a.order - b.order
      );
    setQuestions(sortedResult);
    checkIsButtonQuestion(sortedResult);
    console.log(sortedResult);
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
            label="Date of birthday"
            inputFormat="MM/dd/yyyy"
            value={formik.values.value}
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
          <img src={ArrowIcon} alt="arrow" />
        </button>
        <h1 className="app-title">Анкета</h1>
        <h4 className="test__title">Расскажите нам немного о себе</h4>
        <form className="test__form" onSubmit={formik.handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {renderQuestion(currentOrder)}
            {formik.errors.option_id ? (
              <div>{formik.errors.option_id}</div>
            ) : null}
            {isButtonQuestion === false ? (
              <button className="app-btn" type="submit">
                Следующий вопрос
              </button>
            ) : null}
          </LocalizationProvider>
        </form>
      </div>
    </div>
  );
};

export default TestContainer;
