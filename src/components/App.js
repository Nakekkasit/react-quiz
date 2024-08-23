import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error.js";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import RestartQuizButton from "./RestartQuizButton";
import { useQuiz } from "../context/QuizContext";

const initialState = {
  questions: [],

  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  progress: 0,
  highScore: 0,
};

const actions = {
  dataReceived: "dataReceived",
  dataFailed: "dataFailed",
  start: "start",
  newAnswer: "newAnswer",
  nextQuestion: "nextQuestion",
  finish: "finish",
  restart: "restart",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.dataReceived:
      return { ...state, questions: action.payload, status: "ready" };
    case actions.dataFailed:
      return { ...state, status: "error" };
    case actions.start:
      return { ...state, status: "active" };
    case actions.newAnswer:
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        progress: state.progress + 1,
      };
    case actions.nextQuestion:
      return { ...state, index: state.index + 1, answer: null };
    case actions.finish:
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case actions.restart:
      return {
        ...state,
        status: "ready",
        answer: null,
        index: 0,
        points: 0,
        progress: 0,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const { status, questions, answer } = useQuiz();
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            {answer !== null && <NextButton />}
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen />
            <RestartQuizButton />
          </>
        )}
      </Main>
    </div>
  );
}
