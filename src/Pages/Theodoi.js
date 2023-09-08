import React, { useEffect, useState } from "react";
import "../styles/theodoi.css";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
function Theodoi() {
  const [selectedBooks, setSelectedBooks] = useState([]);
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

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("selectedBook")) || [];
    setSelectedBooks(storedBooks);
  }, []);

  const handleBookClick = (book) => {
    const isBookAlreadySelected = selectedBooks.some(
      (selectedBook) => selectedBook._id === book._id
    );
    let updatedBooks;
    if (isBookAlreadySelected) {
      updatedBooks = [
        book,
        ...selectedBooks.filter(
          (selectedBook) => selectedBook._id !== book._id
        ),
      ];
    } else {
      updatedBooks = [book, ...selectedBooks];
    }
    if (updatedBooks.length > 3) {
      updatedBooks.pop();
    }
    setSelectedBooks(updatedBooks);
    localStorage.setItem("selectedBook", JSON.stringify(updatedBooks));
  };
  return (
    <div>
      <div className="theodoi">
        <h2 style={{ color: "black" }} className="title-theodoi">
          Truyện theo dõi
        </h2>
        <div className="container_theodoi">
          <div className="theodoi_items">
            {data?.map((book) => (
              <div
                className="theodoi_item"
                key={book._id}
                onClick={() => handleBookClick(book)}
              >
                <Link
                  to={`/Truyen/${book.title.replace(/\s+/g, "-")}/${book._id}`}
                >
                  <img
                    className="img"
                    src={book.img}
                    alt={book.title}
                    // style={{ maxWidth: "500" }}
                  />
                  <h2 className="theodoi_title">{book.title}</h2>
                </Link>
              </div>
            ))}
            {data?.map((book) => (
              <div
                className="theodoi_item"
                key={book._id}
                onClick={() => handleBookClick(book)}
              >
                <Link
                  to={`/Truyen/${book.title.replace(/\s+/g, "-")}/${book._id}`}
                >
                  <img
                    className="img"
                    src={book.img}
                    alt={book.title}
                    // style={{ maxWidth: "500" }}
                  />
                  <h2 className="theodoi_title">{book.title}</h2>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination-container">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  );
}

export default Theodoi;
