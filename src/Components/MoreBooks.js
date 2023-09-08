import React, { useEffect, useState } from "react";
import "../styles/MoreBooks.css";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { postBody } from "../API/axiosClient";

function MoreBooks() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [total, setTotal] = useState(0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("selectedBook")) || [];
    setSelectedBooks(storedBooks);
  }, []);

  useEffect(() => {
    postBody("/truyen", { page: currentPage }).then((res) => {
      setData(res.data.truyen);
      setTotal(res.data.count);
    });
  }, [currentPage]);

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
    <div className="MoreBooks_container">
      <h2 style={{ color: "black" }}>Mới cập nhật</h2>
      <div className="more_container">
        <div className="morebooks">
          {data?.map((book) => (
            <div
              className="morebook"
              key={book._id}
              onClick={() => handleBookClick(book)}
            >
              <Link
                to={`/Truyen/${book.title.replace(/\s+/g, "-")}/${book._id}`}
              >
                <img className="img" src={book.image} alt={book.title} />
                <h2 className="title-new-item">{book.title}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="Pagination">
        <Pagination
          defaultCurrent={2}
          pageSize={12}
          total={total}
          onChange={handlePageChange}
          current={currentPage}
        />
      </div>
    </div>
  );
}

export default MoreBooks;
