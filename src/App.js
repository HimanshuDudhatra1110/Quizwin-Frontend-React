import { Route, Routes } from "react-router-dom";
import "./App.css";
import SteperForm from "./component/steper/SteperForm";
import Success from "./component/success/Success";
import TestPage from "./component/TestPage";
import { lazy, Suspense } from "react";

const QuizWin = lazy(() => import("./component/quizwin/QuizWin"));
const QuizDetailPage = lazy(() =>
  import("./component/quizDetailsPage/QuizDetailPage")
);
const QuizResult = lazy(() => import("./component/quizResult/QuizResult"));
const PlayQuiz = lazy(() => import("./component/playQuiz/PlayQuiz"));
const JoinQuiz = lazy(() => import("./component/joinQuiz/JoinQuiz"));

function App() {
  return (
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
          <Route
            path="/quizwin"
            element={
              <Suspense fallback={<div className="loading-spinner"></div>}>
                <QuizWin />
              </Suspense>
            }
          />
          <Route
            path="/play-quiz"
            element={
              <Suspense fallback={<div className="loading-spinner"></div>}>
                <PlayQuiz />
              </Suspense>
            }
          />
          <Route
            path="/join-quiz"
            element={
              <Suspense fallback={<div className="loading-spinner"></div>}>
                <JoinQuiz />
              </Suspense>
            }
          />
          <Route
            path="/quiz/:id"
            element={
              <Suspense fallback={<div className="loading-spinner"></div>}>
                <QuizDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/quiz-result"
            element={
              <Suspense fallback={<div className="loading-spinner"></div>}>
                <QuizResult />
              </Suspense>
            }
          />
          <Route path="/test-page" element={<TestPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
