import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";

const QuizDetailPage = () => {
  const location = useLocation();
  const quizData = location.state?.quizData.quiz;
  const { questions } = quizData;

  const navigate = useNavigate();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalRightAnswers, setTotalRightAnswers] = useState(0);
  const [totalWrongAnswers, setTotalWrongAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false);

  const [timer, setTimer] = useState(60); // 60 seconds countdown

  const totalQuestions = questions.length;

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  // Calculate stroke-dashoffset based on time left - reverse so circle empties
  const strokeDashoffset = ((60 - timer) / 60) * circumference;

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      // Time is up, submit quiz
      handleSubmitQuiz();
    }
  }, [timer]);

  // Trigger navigation after quiz is completed and score is fully updated
  useEffect(() => {
    if (quizCompleted) {
      handleSubmitQuiz();
    }
  }, [quizCompleted]);

  // Check if quiz data is present
  if (!quizData) {
    return <p>No quiz data found</p>; // Return a message if no quiz data exists
  }
  const handleAnswerSubmit = (option) => {
    if (isOptionDisabled) return; // Prevent multiple clicks

    setSelectedOption(option);
    setIsOptionDisabled(true); // Disable options after selection

    const isAnswerCorrect =
      option.toUpperCase() ===
      questions[currentQuestionIndex].answer.toUpperCase();

    if (isAnswerCorrect) {
      setTotalRightAnswers(totalRightAnswers + 1);
      setScore(score + 100);
      setIsCorrect(true);
    } else {
      setTotalWrongAnswers(totalWrongAnswers + 1);
      // setScore(score - 50);
      setIsCorrect(false);
    }

    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < totalQuestions) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedOption("");
        setIsCorrect(null);
        setIsOptionDisabled(false); // Re-enable options for the next question
      } else {
        setQuizCompleted(true); // Set quiz as completed after the last question
      }
    }, 1000);
  };
  const handleSubmitQuiz = () => {
    // update coins in local storage
    const coins = localStorage.getItem("coins");
    const updatedCoins = coins ? parseInt(coins) + score : score;

    localStorage.setItem("coins", updatedCoins);

    // Navigate to the result page with the updated score
    navigate("/quiz-result", { state: { score } });
  };

  return (
    <>
      <div className="succes-page quiz-detail-page">
        <Header showBackButton={true} />
        <div className="quiz-detail-text">
          <h3 className="quiz-cat">{quizData.name}</h3>
          <span>Play & Win {quizData.winamount} Coins</span>
        </div>
        <div className="container quiz-container">
          <div className="question-info">
            <div className="circle-timer">
              <svg width="100" height="100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke="#FFA800"
                  fill="#181044"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="timer-text">{timer}</div>
            </div>
            <div className="right-wrong-count">
              <div className="circle right">{totalRightAnswers}</div>
              <div className="circle wrong">{totalWrongAnswers}</div>
            </div>
            <span>
              Question {currentQuestionIndex + 1}/{totalQuestions}
            </span>
            <h2 className="question">
              {questions[currentQuestionIndex].question}
            </h2>
            <div className="options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  className={`option-button ${
                    selectedOption === option
                      ? isCorrect
                        ? "correct"
                        : "incorrect"
                      : option === questions[currentQuestionIndex].answer &&
                        selectedOption
                      ? "correct"
                      : ""
                  }`}
                  onClick={() => handleAnswerSubmit(option)}
                  disabled={isOptionDisabled}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <span className="score-text">
            Your Score : <span>{score}</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default QuizDetailPage;
