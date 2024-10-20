import React from "react";
import { Link } from "react-router-dom";

const JoinQuiz = () => {
  return (
    <div className="succes-page join-quiz-page">
      <div className="container quiz-container">
        <div className="success-info">
          <h2>Login Now & Play Quiz</h2>
          <p>Play Quizzes and win Coins</p>
          <button className="btn-jq btn-guest">Login</button>
          <div className="no-account">
            <p>
              Don&rsquo;t have an account?{" "}
              <Link to="/signup" className="sign-up-text">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="prise-description">
        <h1>Play Quiz and Win Coins!</h1>
        <div className="gradient-line "></div>
        <div className="description-list">
          <ul className="unorder-list">
            <li>
              Play Quizzes in 25+ categories like GK, Sports, Bollywood,
              Business, Cricket & more!
            </li>
            <li>Compete with lakhs of other players!</li>
            <li>Win coins for every game</li>
            <li>Trusted by millions of other quiz enthusiasts like YOU!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JoinQuiz;
