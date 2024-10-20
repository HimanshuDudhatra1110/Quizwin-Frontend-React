import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create a new context
export const QuizContext = createContext();

// Create a provider component
export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quizzes data from the API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/quizzes`
        );
        setQuizzes(response.data.quizzesData);
        setFacts(response.data.factsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        setError("Failed to fetch quizzes");
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Provide quizzes data, loading, error to the restof the app
  return (
    <QuizContext.Provider value={{ quizzes, facts, loading, error }}>
      {children}
    </QuizContext.Provider>
  );
};
