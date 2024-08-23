import { useQuiz } from "../context/QuizContext";

function FinishScreen() {
  const { points, totalPoints, highScore } = useQuiz();

  const perCentage = Math.ceil((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} ({perCentage}
        %)
      </p>
      <p className="highscore">Highscore: {highScore}</p>
    </>
  );
}

export default FinishScreen;
