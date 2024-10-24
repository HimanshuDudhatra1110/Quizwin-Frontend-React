import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { stepperQuestions, facts } from "../comman/Data/data";
import Ad300x250 from "../AdsComponents/Ad300x250";

const SteperForm = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [fact, setFact] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isOptionDisabled, setIsOptionDisabled] = useState(false); // Prevent multiple clicks

  // Select two random questions from stepperQuestions
  useEffect(() => {
    if (stepperQuestions.length > 0) {
      addTwoRandomQuestions();
      localStorage.clear();
    }
    const randomIndex = Math.floor(Math.random() * facts.length);
    setFact(facts[randomIndex]);
  }, []);

  const addTwoRandomQuestions = () => {
    const totalQuestions = stepperQuestions.length;

    // Get the first random question
    const randomIndex1 = Math.floor(Math.random() * totalQuestions);
    const firstQuestion = stepperQuestions[randomIndex1];

    // Get the second random question, ensure it's not the same as the first
    let randomIndex2;
    do {
      randomIndex2 = Math.floor(Math.random() * totalQuestions);
    } while (randomIndex1 === randomIndex2);
    const secondQuestion = stepperQuestions[randomIndex2];

    setQuestions([firstQuestion, secondQuestion]);
  };

  const handleAnswerSubmit = (option) => {
    if (isOptionDisabled) return; // Prevent multiple clicks

    setSelectedOption(option);
    setIsOptionDisabled(true); // Disable options after selection

    const isAnswerCorrect =
      option.toUpperCase() ===
      questions[currentQuestionIndex].answer.toUpperCase();

    if (isAnswerCorrect) {
      setScore(score + 1);
      setCoins(coins + 100);
      setIsCorrect(true);
      localStorage.setItem("coins", coins + 100);
    } else {
      setIsCorrect(false);
      localStorage.setItem("coins", coins);
    }
    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedOption("");
        setIsCorrect(null);
        setIsOptionDisabled(false); // Re-enable options for the next question
      } else {
        // Submit results before navigating
        submitResults();
      }
    }, 1000);
  };

  const submitResults = async () => {
    navigate("./success");
    // try {
    //   const response = await fetch(
    //     `${process.env.REACT_APP_API_URL}/api/submit`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ score, coins }),
    //     }
    //   );

    //   if (response.ok) {
    //     navigate("./success");
    //   } else {
    //     console.error("Failed to submit results");
    //   }
    // } catch (error) {
    //   console.error("Error submitting results:", error);
    // }
  };

  if (questions.length === 0) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="succes-page">
      {/* <div className="adds">
        <h2>AD</h2>
      </div> */}
      <Ad300x250 />

      <div className="container quiz-container">
        <h1>Quick Start!</h1>
        <p className="stepper-before-que-info">
          Answer 2 questions and win up to 200 coins
        </p>
        <div className="question-info">
          <span className="question-count">
            {currentQuestionIndex + 1}/{questions.length} Question
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
        <div className="prise-description">
          <h1>Play Quiz and Win Coins!</h1>
          <div className="gradient-line "></div>
          <div className="description-list">
            <ul className="unorder-list">
              <li>
                Play Quizzes in 25+ categories like GK, Sports, Bollywood, etc.
              </li>
              <li>Compete with other players!</li>
              <li>Win coins for every game</li>
            </ul>
          </div>
        </div>
        <div className="fun-fact">
          <h2>#Fun Fact</h2>
          {fact ? <p>{fact}</p> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default SteperForm;
