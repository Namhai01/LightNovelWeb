import React, { useEffect, useState } from "react";
import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoon,
  faSun,
  faBookOpen,
  faHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "antd";
import { Link } from "react-router-dom";
import { toggleDarkMode } from "../Redux/slice";
import { useSelector, useDispatch } from "react-redux";
import { postBody } from "../API/axiosClient";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    event.preventDefault();
    const inputText = event.target.value;
    setSearchTerm(inputText);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
  };
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setSearchTimeout(
        setTimeout(() => {
          // Gọi API ở đây với giá trị searchTerm
          postBody("/truyen/find", { key: searchTerm }).then((res) =>
            console.log(res)
          );
        }, 500)
      );
    }
  }, [searchTerm]);

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const items = [
    {
      key: "1",
      label: (
        <Link to="http://localhost:3000/truyen/theo-doi">
          Theo dõi{" "}
          <FontAwesomeIcon icon={faHeart} style={{ color: "#c20000" }} />
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="http://localhost:3000/user/dang-nhap">
          Đăng nhập{" "}
          <FontAwesomeIcon icon={faUser} style={{ color: "#787878" }} />
        </Link>
      ),
    },
  ];

  return (
    <header className="header">
      <div className="logo">
        <FontAwesomeIcon icon={faBookOpen} style={{ color: "#ffffff" }} />
        <Link to="/" className="link">
          {" "}
          Light Novel Web
        </Link>
      </div>
      <div className="header-side">
        <button
          className={`toggle-button ${darkMode ? "dark" : "light"}`}
          onClick={handleToggleDarkMode}
        >
          <span className="toggle-button__text">
            {darkMode ? (
              <FontAwesomeIcon icon={faSun} style={{ color: "#ffffff" }} />
            ) : (
              <FontAwesomeIcon icon={faMoon} style={{ color: "#080808" }} />
            )}
          </span>
        </button>
        <input
          type="text"
          className="search-bar"
          placeholder="Nhập tên truyện ..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className="dropdown">
          <Dropdown menu={{ items }} placement="bottomLeft" arrow>
            <button className="dropdown-button">
              <div className="hamburger-menu">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </button>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default Header;
