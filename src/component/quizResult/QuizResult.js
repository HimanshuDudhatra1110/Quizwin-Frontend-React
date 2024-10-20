import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../Header/Header";

const QuizResult = () => {
  const location = useLocation();
  const score = location.state?.score;

  return (
    <div className="succes-page quiz-result-page">
      <Header showBackButton={true} />
      <div className="container quiz-container">
        <div className="success-info">
          <h2>Your Score is {score}</h2>
          <Link to={"/quizwin"} className="btn-pay">
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
