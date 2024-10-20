import React from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import "./header.css";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Header = ({ showBackButton = false }) => {
  const coins = localStorage.getItem("coins");
  const [showMenu, setShowMenu] = React.useState(false);
  const navigate = useNavigate();

  const hadleopenmenu = () => {
    setShowMenu(!showMenu);
  };
  const handleclose = () => {
    setShowMenu(false);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="hedaer">
      <div className="header-menu">
        {showBackButton ? (
          <IoMdArrowBack className="icons" onClick={handleBack} />
        ) : (
          <BiMenuAltLeft className="icons" onClick={hadleopenmenu} />
        )}

        {showMenu && (
          <div className="menuitem">
            <div className="close">
              <IoMdClose className="close-icon" onClick={handleclose} />
            </div>
            <ul>
              <li>
                <img src="/images/home.png" />
                Home
              </li>
              <li>
                <img src="/images/rule.png" />
                Contest Rules
              </li>
              <li>
                <img src="/images/history.png" />
                Coin History
              </li>
              <li>
                <img src="/images/blog.png" />
                Blogs
              </li>
              <li>
                <img src="/images/about.png" />
                About Us
              </li>
              <li>
                <img src="/images/user.png" />
                Contact Us
              </li>
            </ul>
          </div>
        )}
        <h1>QuizWin</h1>
      </div>
      <div className="coins">
        <img src="/images/coins.png" />
        <h1>{coins}</h1>
      </div>
    </div>
  );
};

export default Header;
