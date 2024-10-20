import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../context/quizzes";

const SteperForm = () => {
  const { quizzes, facts, loading, error } = useContext(QuizContext);

  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [fact, setFact] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  // Only log when quizzes data changes
  useEffect(() => {
    if (quizzes.length > 0) {
      addTwoRandomQuestions(); // Call the function to add questions
      localStorage.clear();
    }
    if (facts.length > 0) {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setFact(facts[randomIndex].factConetent);
    }
  }, [quizzes]);

  const addTwoRandomQuestions = () => {
    if (quizzes.length > 0) {
      const totalQuizzes = quizzes.length;

      // Get the first random question
      const randomIndex1 = Math.floor(Math.random() * totalQuizzes);
      const randomQuestionIndex1 = Math.floor(
        Math.random() * quizzes[randomIndex1].questions.length
      );
      const firstQuestion =
        quizzes[randomIndex1].questions[randomQuestionIndex1];

      // Get the second random question (ensure it's not the same as the first)
      let randomIndex2, randomQuestionIndex2, secondQuestion;
      do {
        randomIndex2 = Math.floor(Math.random() * totalQuizzes);
        randomQuestionIndex2 = Math.floor(
          Math.random() * quizzes[randomIndex2].questions.length
        );
        secondQuestion = quizzes[randomIndex2].questions[randomQuestionIndex2];
      } while (
        randomIndex1 === randomIndex2 &&
        randomQuestionIndex1 === randomQuestionIndex2
      );

      // Add both questions to the state
      setQuestions([firstQuestion, secondQuestion]);
    }
  };

  // useEffect(() => {
  //   const fetchQuestions = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/questions");
  //       const data = await response.json();
  //       setQuestions(data);
  //     } catch (error) {
  //       console.error("Error fetching questions:", error);
  //     }
  //   };

  //   fetchQuestions();
  //   localStorage.clear();
  // }, []);

  const handleAnswerSubmit = (option) => {
    setSelectedOption(option);
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
      } else {
        // Submit results to API before navigating
        submitResults();
      }
    }, 1000);
  };

  const submitResults = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score, coins }),
        }
      );

      if (response.ok) {
        navigate("./success");
      } else {
        console.error("Failed to submit results");
      }
    } catch (error) {
      console.error("Error submitting results:", error);
    }
  };

  if (questions.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="succes-page">
        <div className="adds">
          <h2>AD</h2>
        </div>

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
                  Play Quizzes in 25+ categories like GK, Sports, Bollywood,
                  Business, Cricket & more!
                </li>
                <li>Compete with lakhs of other players!</li>
                <li>Win coins for every game</li>
                <li>Trusted by millions of other quiz enthusiasts like YOU!</li>
              </ul>
            </div>
          </div>
          <div className="fun-fact">
            <h2>#Fun Fact</h2>
            {{ fact } ? <p>{fact}</p> : <p>Loading...</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SteperForm;
