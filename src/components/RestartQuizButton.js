import { useQuiz } from "../context/QuizContext";

function RestartQuizButton() {
  const { restart } = useQuiz();

  return (
    <button className="btn btn-ui" onClick={restart}>
      Restart quiz
    </button>
  );
}

export default RestartQuizButton;
