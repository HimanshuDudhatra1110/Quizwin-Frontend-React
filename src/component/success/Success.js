import React from "react";
import { Link } from "react-router-dom";
const Success = () => {
  const coins = localStorage.getItem("coins");
  console.log(coins);
  return (
    <div className="succes-page">
      <div className="container quiz-container">
        <div className="success-info">
          <h2>
            You have get <span>{coins}</span> coins
          </h2>
          <p>
            check out more quizzes to test your skills and keeps grabbing more
            coins!
          </p>
          <Link to={"/quizwin"} className="btn-pay">
            Play Now
          </Link>
        </div>
      </div>
      <div className="adds">
        <h2>AD</h2>
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

export default Success;
