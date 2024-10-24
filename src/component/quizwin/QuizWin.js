import React, { useEffect, useRef, useState } from "react";
import Header from "../Header/Header";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Ad336x280 from "../AdsComponents/Ad336x280";
import AdInterstitial from "../AdsComponents/AdInterstitial";

const QuizWin = () => {
  const [quizzes, setQuizzes] = useState(
    JSON.parse(sessionStorage.getItem("quizzes")) || []
  );
  const [loading, setLoading] = useState(quizzes.length === 0);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [filterdata, setFilterdata] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (quizzes.length === 0) {
      const fetchQuizzes = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/quizzes`
          );
          setQuizzes(response.data.quizzesData);
          setLoading(false);
          sessionStorage.setItem(
            "quizzes",
            JSON.stringify(response.data.quizzesData)
          ); // Cache the data
        } catch (error) {
          console.error("Error fetching quizzes:", error);
          setError("Failed to fetch quizzes");
          setLoading(false);
        }
      };

      fetchQuizzes();
    } else {
      setLoading(false);
    }
  }, [quizzes]);

  // Handle scroll for the swiper container
  const handleScroll = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      const maxScrollLeft = swiper.scrollWidth - swiper.clientWidth;
      const tolerance = 5;
      setShowLeftButton(swiper.scrollLeft > 0);
      setShowRightButton(swiper.scrollLeft < maxScrollLeft - tolerance);
    }
  };

  const scrollRight = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollLeft += 350;
    }
  };

  const scrollLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollLeft -= 350;
    }
  };

  useEffect(() => {
    handleScroll();
  }, []);

  const handlegame = (category) => {
    setActiveCategory(category);
    if (category === "all") {
      setFilterdata(quizzes);
    } else {
      const filteredData = quizzes.filter((quiz) => quiz.category === category);
      setFilterdata(filteredData);
    }
  };

  const getCategories = () => {
    const categories = quizzes.map((quiz) => quiz.category);
    return ["all", ...new Set(categories)];
  };

  useEffect(() => {
    if (quizzes.length > 0) {
      setFilterdata(quizzes);
    }
  }, [quizzes]);

  const handleQuizClick = (quiz) => {
    const coinBalance = localStorage.getItem("coins");
    if (coinBalance >= quiz.entryfees) {
      navigate("/play-quiz", { state: { quizData: { quiz } } });
    } else {
      setPopup(
        "You don’t have enough coins to play this contest. Click on video ad to get 100 reward coins."
      );
    }
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="succes-page">
      <Header />
      <Ad336x280 />

      <AdInterstitial />
      {/* Category Scroller */}
      <div className="swiper-container">
        {showLeftButton && (
          <button className="scroll-left" onClick={scrollLeft}>
            <FaChevronLeft />
          </button>
        )}
        <div className="swiper" ref={swiperRef} onScroll={handleScroll}>
          <ul className="quiz-all-btn">
            {getCategories().map((category, index) => (
              <li
                key={index}
                onClick={() => handlegame(category)}
                className={activeCategory === category ? "active" : ""}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>
        </div>
        {showRightButton && (
          <button className="scroll-right" onClick={scrollRight}>
            <FaChevronRight />
          </button>
        )}
      </div>

      {/* Quizzes Display */}
      <ul className="quiz-scroll">
        {filterdata.map((quiz, index) => (
          <li key={index} className="quiz-card">
            <div className="quizimage">
              <div className="image-wrapper">
                <img src={quiz.img} alt={quiz.name} className="quiz-img" />
              </div>
              <div className="text">
                <p className="title">{quiz.name}</p>
                <div className="desc-iamge">
                  <p className="desc">Play and Win {quiz.winamount}</p>
                  <img src="/images/Coin.png" alt="coin" />
                </div>
                <span className="rulas">
                  Entry Fee <img src="/images/Coin.png" alt="coin" />{" "}
                  {quiz.entryfees}
                </span>
              </div>
              <button
                className="moregame-play-btn"
                onClick={() => handleQuizClick(quiz)}
              >
                <FaPlay />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Popup Notice */}
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

export default QuizWin;
