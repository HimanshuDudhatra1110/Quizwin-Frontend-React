import React, { useEffect, useRef, useState, useContext } from "react";
import Header from "../Header/Header";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa6";
import { QuizContext } from "../../context/quizzes"; // Import QuizContext for quizzes data
import { Link, useNavigate } from "react-router-dom";

const QuizWin = () => {
  const { quizzes, loading, error } = useContext(QuizContext); // Use quizzes from context
  const swiperRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [filterdata, setFilterdata] = useState([]); // Initialize with empty array
  const [activeCategory, setActiveCategory] = useState("all"); // Track active category

  const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  // Handle scroll for the swiper container
  const handleScroll = () => {
    const swiper = swiperRef.current;
    if (swiper) {
      const maxScrollLeft = swiper.scrollWidth - swiper.clientWidth;

      // Adjust with a small tolerance value to handle potential rounding issues
      const tolerance = 5; // You can adjust this value if needed

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

  // Filter quizzes based on category
  const handlegame = (category) => {
    setActiveCategory(category); // Set the active category
    if (category === "all") {
      setFilterdata(quizzes);
    } else {
      const filteredData = quizzes.filter((quiz) => quiz.category === category);
      setFilterdata(filteredData);
    }
  };

  // Dynamically extract unique categories from quizzes
  const getCategories = () => {
    const categories = quizzes.map((quiz) => quiz.category);
    return ["all", ...new Set(categories)]; // Ensure "all" is always the first option
  };

  // Update filtered data when quizzes data is available
  useEffect(() => {
    if (quizzes.length > 0) {
      setFilterdata(quizzes); // Initialize with all quizzes
    }
  }, [quizzes]);

  // Function to handle quiz start logic
  const handleQuizClick = (quiz) => {
    const coinBalance = localStorage.getItem("coins");

    if (coinBalance >= quiz.entryfees) {
      navigate("/play-quiz", { state: { quizData: { quiz } } });
    } else {
      // Not enough coins, show popup
      setPopup(
        "You don’t have enough coins to play this contest. Click on video ad to get 100 reward coins."
      );
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="succes-page">
      <Header />
      <div className="adds">
        <h2>AD</h2>
      </div>

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
              {/* <Link
                to={`/quiz/${quiz.id}`}
                state={{ quizData: { quiz } }}
                // to={{ pathname: `/quiz/${quiz.id}`, state: {quiz} }}
                className="moregame-play-btn"
              >
                <FaPlay />
              </Link> */}
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

// import React, { useEffect, useRef, useState } from "react";
// import Header from "../Header/Header";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
// import { data } from "./../comman/Data/data";
// import { FaPlay } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const QuizWin = () => {
//   const swiperRef = useRef(null);
//   const [showLeftButton, setShowLeftButton] = useState(false);
//   const [showRightButton, setShowRightButton] = useState(true);
//   const [filterdata, setFilterdata] = useState(data); // Initialize with all data
//   const [activeCategory, setActiveCategory] = useState("all"); // Track active category

//   const handleScroll = () => {
//     const swiper = swiperRef.current;
//     if (swiper) {
//       const maxScrollLeft = swiper.scrollWidth - swiper.clientWidth;
//       setShowLeftButton(swiper.scrollLeft > 0);
//       setShowRightButton(swiper.scrollLeft < maxScrollLeft);
//     }
//   };

//   const scrollRight = () => {
//     if (swiperRef.current) {
//       swiperRef.current.scrollLeft += 100;
//     }
//   };

//   const scrollLeft = () => {
//     if (swiperRef.current) {
//       swiperRef.current.scrollLeft -= 100;
//     }
//   };

//   useEffect(() => {
//     handleScroll();
//   }, []);

//   const handlegame = (game) => {
//     setActiveCategory(game); // Set the active category
//     if (game === "all") {
//       setFilterdata(data);
//     } else {
//       const result = data.filter((item) => item.cate === game);
//       setFilterdata(result);
//     }
//   };

//   return (
//     <div className="succes-page">
//       <Header />
//       <div className="adds">
//         <h2>AD</h2>
//       </div>
//       <div className="swiper-container">
//         {showLeftButton && (
//           <button className="scroll-left" onClick={scrollLeft}>
//             <FaChevronLeft />
//           </button>
//         )}
//         <div className="swiper" ref={swiperRef} onScroll={handleScroll}>
//           <ul className="quiz-all-btn">
//             <li
//               onClick={() => handlegame("all")}
//               className={activeCategory === "all" ? "active" : ""}
//             >
//               All
//             </li>
//             <li
//               onClick={() => handlegame("sport")}
//               className={activeCategory === "sport" ? "active" : ""}
//             >
//               Sports
//             </li>
//             <li
//               onClick={() => handlegame("world")}
//               className={activeCategory === "world" ? "active" : ""}
//             >
//               World
//             </li>
//             <li
//               onClick={() => handlegame("entertainment")}
//               className={activeCategory === "entertainment" ? "active" : ""}
//             >
//               Entertainment
//             </li>
//             <li
//               onClick={() => handlegame("travel")}
//               className={activeCategory === "travel" ? "active" : ""}
//             >
//               Travel
//             </li>
//           </ul>
//         </div>
//         {showRightButton && (
//           <button className="scroll-right" onClick={scrollRight}>
//             <FaChevronRight />
//           </button>
//         )}
//       </div>
//       <ul>
//         {filterdata.map((item, index) => (
//           <li key={index} className="quiz-card">
//             <div className="quizimage">
//               <img src={item.img} />
//               <div className="text">
//                 <p className="title">{item.name}</p>
//                 <div className="desc-iamge">
//                   <p className="desc">{item.coin}</p>
//                   <img src="/images/Group.png" />
//                 </div>
//                 <span className="rulas">{item.rule}</span>
//               </div>
//               <Link className="moregame-play-btn">
//                 <FaPlay />
//               </Link>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default QuizWin;
