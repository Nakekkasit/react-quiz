function Progress({ index, numQuestions, progress, points, totalPoints }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={progress}></progress>
      <p>
        Question<strong> {index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
