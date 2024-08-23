import { createContext, useContext, useReducer, useEffect } from "react";

// 1. Create context
const QuizContext = createContext();

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

// 2. Create Provider
function QuizProvider({ children }) {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      nextQuestion,
      progress,
      highScore,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(() => {
    function fetchQuiz() {
      fetch("http://localhost:8000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: actions.dataReceived, payload: data }))
        .catch((err) => dispatch({ type: actions.dataFailed }));
    }
    fetchQuiz();
  }, []);

  function startQuiz() {
    dispatch({ type: "start" });
  }

  function getNewAnswer(i) {
    dispatch({ type: "newAnswer", payload: i });
  }

  function getNextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function finish() {
    dispatch({ type: "finish" });
  }

  function restart() {
    dispatch({ type: "restart" });
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        nextQuestion,
        progress,
        highScore,
        numQuestions,
        totalPoints,
        startQuiz,
        getNewAnswer,
        getNextQuestion,
        finish,
        restart,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

// 3. Create consumer
function useQuiz() {
  const context = useContext(QuizContext);
  if (QuizContext === undefined)
    throw new Error("QuizContext was used outside QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
