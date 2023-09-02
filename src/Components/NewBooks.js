import React, { useEffect, useState } from "react";
import JustRead from "./JustRead";
import { Link } from "react-router-dom";

function NewBooks({ data }) {
  const [selectedBooks, setSelectedBooks] = useState(null);

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
    <>
      <h2 style={{ color: "black" }}>Mới cập nhật</h2>
      <div className="container">
        <div className="new">
          {data?.map((book) => (
            <div
              className="new-item"
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
                <h2 className="title-new-item">{book.title}</h2>
              </Link>
            </div>
          ))}
        </div>
        <JustRead selectedBooks={selectedBooks} />
      </div>
    </>
  );
}

export default NewBooks;
