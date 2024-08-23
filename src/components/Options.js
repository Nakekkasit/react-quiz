import { useQuiz } from "../context/QuizContext";

function Options() {
  const { questions, getNewAnswer, answer, index } = useQuiz();

  const question = questions.at(index);
  const hasAnswer = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            hasAnswer
              ? i === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswer}
          onClick={() => getNewAnswer(i)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
