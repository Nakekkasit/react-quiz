import { useQuiz } from "../context/QuizContext";

function NextButton() {
  const { index, getNextQuestion, finish, numQuestions } = useQuiz();

  if (index < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={getNextQuestion}>
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={finish}>
        Finish
      </button>
    );
}

export default NextButton;
