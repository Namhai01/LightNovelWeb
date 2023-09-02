import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../styles/Book.css";
import Hot from "../Components/Hot";
import NewBooks from "../Components/NewBooks";
import { Link } from "react-router-dom";
// import {get} from '../API/axiosClient'
function Book() {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const data = [
    {
      _id: 1,
      title:
        "Đau khổ vì tình, tôi làm Vtuber và trở nên nổi tiếng với các chị gái",
      img: "https://i.docln.net/lightnovel/covers/s15839-f8ad620a-9461-42d0-b0d8-7b27a0b0d8ab-m.jpg",
    },
    {
      _id: 2,
      title:
        "Netoge no Yome ga Ninki Idol datta ken ~Cool-kei no kanojo wa genjitsu demo yome no tsumori de iru~",
      img: "https://i.docln.net/lightnovel/covers/s9005-b2f2238b-692c-4123-b45a-0d71a785a73e-m.jpg",
    },
    {
      _id: 3,
      title: "Geneki JK Idol-san wa Himajin no Ore ni Kyomi ga Arurashii",
      img: "https://i.docln.net/lightnovel/covers/s15014-77ea0f31-98f6-4cf2-8f18-9784d7c490ac-m.jpg",
    },
    {
      _id: 4,
      title: "Tái ngộ",
      img: "https://i.docln.net/lightnovel/covers/s14884-96ecefd8-8ca6-4a3e-b450-4a3866b713dd-m.jpg",
    },
    {
      _id: 5,
      title: "Tensei Shitara Kendeshita",
      img: "https://i.docln.net/lightnovel/covers/s787-8ae84f4f-4cc8-4acd-914d-72682df9e28e-m.jpg      ",
    },
  ];

  return (
    <div className="books-container">
      <Hot data={data} />
      <NewBooks data={data} />
      {showButton && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faChevronUp} style={{ color: "#000000" }} />
        </button>
      )}
      <Link to="/truyen" className="Link">
        <button className="view-more-button">
          {" "}
          Xem thêm <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </Link>
    </div>
  );
}

export default Book;
