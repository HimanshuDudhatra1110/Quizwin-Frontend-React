import { Route, Routes } from "react-router-dom";
import "./App.css";
import SteperForm from "./component/steper/SteperForm";
import Success from "./component/success/Success";
import QuizWin from "./component/quizwin/QuizWin";
import { QuizProvider } from "./context/quizzes";
import QuizDetailPage from "./component/quizDetailsPage/QuizDetailPage";
import QuizResult from "./component/quizResult/QuizResult";
import PlayQuiz from "./component/playQuiz/PlayQuiz";
import JoinQuiz from "./component/joinQuiz/JoinQuiz";
import TestPage from "./component/TestPage";

function App() {
  return (
    <QuizProvider>
      <div
        className="app-bg"
        style={{
          backgroundImage: "url('/images/backgroundforPC.png')",
        }}
      >
        <div className="scrollable-content">
          <Routes>
            <Route path="/" element={<SteperForm />} />
            <Route path="/success" element={<Success />} />
            <Route path="/quizwin" element={<QuizWin />} />
            <Route path="/play-quiz" element={<PlayQuiz />} />
            <Route path="/join-quiz" element={<JoinQuiz />} />
            <Route path="/quiz/:id" element={<QuizDetailPage />} />
            <Route path="/quiz-result" element={<QuizResult />} />
            <Route path="/test-page" element={<TestPage />} />
          </Routes>
        </div>
      </div>
    </QuizProvider>
  );
}

export default App;
