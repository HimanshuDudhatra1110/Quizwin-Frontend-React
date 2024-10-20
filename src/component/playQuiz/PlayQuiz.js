import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const PlayQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);

  const quiz = location.state?.quizData.quiz;

  const handleJoinQuizClick = () => {
    navigate("/join-quiz", { state: { quizData: { quiz } } });
  };

  const handleGuestClick = () => {
    const coins = localStorage.getItem("coins");

    if (coins >= quiz.entryfees) {
      // Deduct the entry fees from the coins
      localStorage.setItem("coins", coins - quiz.entryfees);

      // Redirect to the quiz page
      navigate(`/quiz/${quiz.id}`, { state: { quizData: { quiz } } });
    } else {
      // Not enough coins, show popup
      setPopup(
        "You don’t have enough coins to play this contest. Click on video ad to get 100 reward coins."
      );
    }
  };

  return (
    <div className="succes-page con-join-quiz-page">
      <Header showBackButton={true} />
      <div className="adds">
        <h2>AD</h2>
      </div>
      <div className="container quiz-container">
        <div className="success-info">
          <div className="quiz-detail">
            <div className="image-wrapper">
              <img src={quiz.img} alt={quiz.name} className="quiz-img" />
            </div>
            <p>{quiz.name}</p>
          </div>
          <h2>
            Play & Win <span>{quiz.winamount}</span> coins
          </h2>
          <p>Join and save the coins you win! Its free & safe!</p>
          <button className="btn-jq btn-join" onClick={handleJoinQuizClick}>
            Join Quiz
          </button>
          <button className="btn-jq btn-guest" onClick={handleGuestClick}>
            Play As Guest
          </button>
          <div className="description-list">
            <ul className="unorder-list">
              <li>You got 60 seconds to answer all questions</li>
              <li>Answer as many questions as you can</li>
              <li>
                For Every Correct answer you will get 100 points and will get 0
                points on every Incorrect answer
              </li>
              <li>
                You can take help by using the lifelines present in the contest.
              </li>
              <li>
                Lifelines can be used for free or by using a given amount of
                coins for each lifeline.
              </li>
            </ul>
          </div>
        </div>
      </div>
      {popup && (
        <div className="popup">
          <div className="popup-content">
            <p>{popup}</p>
            <div className="popup-buttons">
              <button className="cancel-btn" onClick={() => setPopup(null)}>
                Cancel
              </button>
              <button className="ad-btn">Watch Ads</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayQuiz;
