import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/Hot.css";
import { Link } from "react-router-dom";
function Hot({ data }) {
  const [selectedBooks, setSelectedBooks] = useState([]);

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

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1219 },
      items: 5,
    },
    bigtablet: {
      breakpoint: { max: 1219, min: 769 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 769, min: 538 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 538, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <h2 style={{ color: "black" }}>Nổi bật</h2>
      <Carousel
        responsive={responsive}
        showDots={true}
        arrows={false}
        draggable={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        itemClass="carousel-item"
      >
        {data.map((book) => (
          <div key={book._id} onClick={() => handleBookClick(book)}>
            <Link to={`/Truyen/${book.title.replace(/\s+/g, "-")}/${book._id}`}>
              <div className="item">
                <img
                  className="img"
                  src={book.img}
                  alt={book.title}
                  // style={{ maxWidth: "500" }}
                />
                <h2 className="title">{book.title}</h2>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default Hot;
