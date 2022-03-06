import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import mainService from "../services/mainService";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { NumericLiteral } from "typescript";

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
  option_id: number;
  value: any;
}

const TestContainer = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [questions, setQuestions] = useState<Question[]>();

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  useEffect(() => {
    (async () => {
      loadQuestions();
    })();
  }, []);

  const loadQuestions = async () => {
    const result = await mainService.startTest();
    setQuestions(result && result.data.survey.questions);
    console.log(result && result.data.survey.questions);
  };

  const elementForOption = (option: Option) => {
    switch (option.type) {
      case "number":
        return (
          <input
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
        );
      case "select": {
        return <button>{option.title}</button>;
      }
      case "date":
        return (
          <MobileDatePicker
            label="Date of birthday"
            inputFormat="MM/dd/yyyy"
            value={null}
            onChange={(val) => {
              console.log("___", val);
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
    <div>
      <h4>New test</h4>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {renderQuestion(currentQuestion)}
        <button onClick={() => nextQuestion()}>Next question</button>
      </LocalizationProvider>
    </div>
  );
};

export default TestContainer;
