import { useEffect } from "react";

import Options from "./Options";
function Question({ question, dispatch, answer }) {
  // useEffect(() => {
  //   dispatch({
  //     type: "newAnswer",
  //     payload: question.correctOption,
  //   });
  // }, [dispatch, question]);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
export default Question;
